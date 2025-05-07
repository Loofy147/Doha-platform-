// src/app/store/[storeId]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Star, MessageSquare, Info, MapPin, Phone, Heart, Share2, Mail, Sparkles, Tag, ThumbsUp, Eye, ChevronLeft, ChevronRight, ShoppingBasket, Rocket, Palette, CalendarDays, Handshake, Edit3, CookingPot, Scissors, Shirt } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import StoreProductCard from '@/components/store/store-product-card';
import StoreSection from '@/components/store/store-section';
import BakerySpecialsSection from '@/components/store/sections/bakery-specials-section';
import SalonServicesSection from '@/components/store/sections/salon-services-section';
import FashionLookbookSection from '@/components/store/sections/fashion-lookbook-section';


export type ProductType = 'بيع' | 'إيجار' | 'خدمة';
export type StoreType = 'bakery' | 'fashion' | 'salon' | 'crafts' | 'rental' | 'service' | 'general';


export interface Product { 
  id: string;
  name: string;
  type: ProductType;
  description: string;
  longDescription?: string;
  price: string; 
  imageSrc: string;
  dataAiHint: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
  averageRating?: number;
  reviewCount?: number;
}

interface StoreData {
  id: string;
  name: string;
  slug: string;
  storeType: StoreType;
  slogan?: string;
  story?: string;
  highlights?: string[];
  logoSrc: string;
  dataAiHintLogo: string;
  bannerSrc: string;
  dataAiHintBanner: string;
  category: string; // Main platform category
  storeCategories: string[]; // Categories within the store
  products: Product[];
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  accentColor?: string; 
  themeStyle?: 'light' | 'elegant' | 'playful' | 'modern-minimal';
  // Template specific data
  openingHours?: string; // For salons, bakeries
  services?: Array<{ name: string; price: string; duration?: string }>; // For salons
}

const mockStoreDetails: Record<string, StoreData> = {
  'my-mock-store': {
    id: 'store123',
    name: 'متجر لمسات ضحى الإبداعية',
    slug: 'my-mock-store',
    storeType: 'crafts',
    slogan: 'حيث يلتقي الإبداع بالأصالة',
    story: 'بدأت رحلتي بشغف صغير في تحويل المواد البسيطة إلى قطع فنية فريدة. كل قطعة في متجري تحمل جزءًا من قلبي وقصتي. أهدف إلى إدخال البهجة والجمال إلى منازلكم من خلال إبداعاتي.',
    highlights: ["منتجات مصنوعة يدوياً بحب", "تصاميم فريدة ومبتكرة", "جودة عالية واهتمام بالتفاصيل"],
    logoSrc: 'https://picsum.photos/seed/lamsalogo/100/100',
    dataAiHintLogo: 'creative logo',
    bannerSrc: 'https://picsum.photos/seed/lamsabanner/1200/400',
    dataAiHintBanner: 'crafts workspace',
    category: 'حرف يدوية إبداعية',
    storeCategories: ['مجوهرات', 'فن وديكور', 'ديكور منزلي', 'أدوات منزلية'],
    products: [
      { id: 'p1', name: 'أقراط فضية مرصعة بالفيروز', type: 'بيع', description: 'أقراط أنيقة مصنوعة يدوياً.', longDescription: 'أقراط فضية استرليني عيار 925، مصنوعة يدوياً ومرصعة بحجر الفيروز الطبيعي الأزرق السماوي. تصميم عصري وأنيق يناسب الإطلالات اليومية والمناسبات الخاصة. الوزن: 5 جرام. تأتي في علبة هدايا فاخرة.', price: '3,500 دج', imageSrc: 'https://picsum.photos/seed/earrings/300/300', dataAiHint: 'silver earrings', category: 'مجوهرات', isNew: true, averageRating: 4.5, reviewCount: 12 },
      { id: 'p2', name: 'لوحة زيتية "ألوان الربيع"', type: 'بيع', description: 'لوحة تجريدية تضفي الحياة على أي جدار.', longDescription: 'لوحة زيتية أصلية بألوان أكريليك على قماش كانفاس مشدود. مقاس 50x70 سم. تجسد اللوحة انطباعات تجريدية لألوان الربيع المبهجة. مثالية لإضافة لمسة فنية عصرية لغرفة المعيشة أو المكتب.', price: '12,000 دج', imageSrc: 'https://picsum.photos/seed/painting/300/300', dataAiHint: 'oil painting', category: 'فن وديكور', isBestseller: true, averageRating: 5, reviewCount: 8 },
      { id: 'p3', name: 'مجموعة شموع عطرية يدوية', type: 'بيع', description: 'شموع طبيعية بروائح آسرة.', longDescription: 'مجموعة من 3 شموع عطرية مصنوعة يدوياً من شمع الصويا الطبيعي وفتائل قطنية. الروائح: لافندر للاسترخاء، فانيليا دافئة، وخشب الصندل الهادئ. مدة احتراق كل شمعة: حوالي 25 ساعة.', price: '2,200 دج', imageSrc: 'https://picsum.photos/seed/candles/300/300', dataAiHint: 'scented candles', category: 'ديكور منزلي', averageRating: 4.2, reviewCount: 20 },
      { id: 'p4', name: 'كوب سيراميك مزخرف', type: 'بيع', description: 'كوب فريد بتصميم يدوي.', longDescription: 'كوب سيراميك مصنوع ومزخرف يدوياً بنقوش فريدة. مثالي للمشروبات الساخنة. السعة: 300 مل. آمن للاستخدام في الميكروويف وغسالة الصحون (ينصح بالغسيل اليدوي للحفاظ على الزخارف).', price: '1,800 دج', imageSrc: 'https://picsum.photos/seed/mug/300/300', dataAiHint: 'ceramic mug', category: 'أدوات منزلية', isNew: true, averageRating: 4.8, reviewCount: 5 },
      { id: 'p5', name: 'قلادة الأحجار الكريمة', type: 'بيع', description: 'قلادة أنيقة بأحجار كريمة متنوعة.', longDescription: 'قلادة فضية أنيقة مرصعة بمزيج من الأحجار الكريمة الطبيعية (جمشت، روز كوارتز، أفينتورين). طول السلسلة: 45 سم. قطعة فريدة تضيف لمسة من الألوان والحيوية.', price: '4,800 دج', imageSrc: 'https://picsum.photos/seed/necklace/300/300', dataAiHint: 'gemstone necklace', category: 'مجوهرات', isBestseller: true },
      { id: 'p6', name: 'إناء زهور خزفي', type: 'إيجار', description: 'إناء بتصميم فريد يضفي لمسة جمالية.', longDescription: 'إناء زهور خزفي مصنوع يدويًا بتصميم عصري. مثالي لتنسيقات الزهور المتوسطة الحجم. الارتفاع: 25 سم. خدمة الإيجار للمناسبات والفعاليات.', price: '800 دج / لليوم', imageSrc: 'https://picsum.photos/seed/vase/300/300', dataAiHint: 'ceramic vase', category: 'ديكور منزلي' },
    ],
    contactEmail: 'contact@lamsatdoha.com',
    contactPhone: '+213 555 123 456',
    address: '123 شارع الإبداع، الجزائر العاصمة',
    socialMedia: { instagram: 'lamsat_doha', facebook: 'LamsaDohaCreations', twitter: 'LamsaDoha' },
    accentColor: 'hsl(var(--accent-pink))',
    themeStyle: 'elegant',
    openingHours: 'الاثنين - الجمعة: 9ص - 6م',
  },
  'lamsa-ibdaa': { 
    id: 'store-lamsa-ibdaa',
    name: 'لمسة إبداع',
    slug: 'lamsa-ibdaa',
    storeType: 'crafts',
    slogan: 'فن يروي حكايات',
    story: 'كل قطعة هي بصمة من شغفي بالفن اليدوي. أقدم لكم إبداعات مصنوعة بحب وإتقان لتزين حياتكم بلمسات فنية راقية.',
    highlights: ["قطع فنية فريدة من نوعها", "مواد عالية الجودة", "تصاميم مستوحاة من التراث"],
    logoSrc: 'https://picsum.photos/seed/lamsaibdaa_logo/100/100',
    dataAiHintLogo: 'artistic brand logo',
    bannerSrc: 'https://picsum.photos/seed/lamsaibdaa_banner/1200/400',
    dataAiHintBanner: 'handmade art crafts',
    category: 'مشغولات يدوية فنية',
    storeCategories: ['إكسسوارات فاخرة', 'ديكور منزلي فني', 'أزياء مستدامة'],
    products: [
      { id: 'li_p1', name: 'حقيبة جلد مطرزة باليد', type: 'بيع', description: 'حقيبة جلدية فاخرة بتطريز يدوي دقيق، مثالية لإطلالة متميزة.', longDescription: 'حقيبة كتف مصنوعة من الجلد الطبيعي الفاخر، مطرزة يدويًا بخيوط حريرية ملونة بتصميم تقليدي مستوحى من التراث. أبعاد الحقيبة: 25 سم × 20 سم × 8 سم. تحتوي على جيب داخلي بسحاب.', price: '7,200 دج', imageSrc: 'https://picsum.photos/seed/leatherbagstitch/300/300', dataAiHint: 'stitched leather bag', category: 'إكسسوارات فاخرة', isBestseller: true, averageRating: 4.9, reviewCount: 15 },
      { id: 'li_p2', name: 'مجموعة فخاريات مزخرفة يدويًا', type: 'بيع', description: 'أواني فخارية فريدة مرسومة بألوان زاهية لتزيين منزلك.', longDescription: 'مجموعة مكونة من ثلاث قطع فخارية (إناء، طبق، كوب) مزخرفة يدويًا بألوان أكريليك ثابتة. تصميم فريد يجمع بين الأصالة والعصرية. مثالية كقطعة ديكور أو للاستخدام اليومي.', price: '4,800 دج', imageSrc: 'https://picsum.photos/seed/decoratedpottery/300/300', dataAiHint: 'decorated pottery set', category: 'ديكور منزلي فني', isNew: true },
      { id: 'li_p3', name: 'وشاح حرير مصبوغ طبيعيًا', type: 'بيع', description: 'وشاح حريري ناعم مصبوغ بألوان طبيعية مستخلصة من النباتات.', longDescription: 'وشاح مصنوع من الحرير الطبيعي 100%، مصبوغ يدويًا باستخدام أصباغ طبيعية مستخلصة من النباتات والأزهار. كل قطعة فريدة بنقشها اللوني. مقاس: 180 سم × 50 سم.', price: '3,500 دج', imageSrc: 'https://picsum.photos/seed/silkscarfnatural/300/300', dataAiHint: 'natural silk scarf', category: 'أزياء مستدامة', averageRating: 4.7, reviewCount: 9  },
    ],
    contactEmail: 'lamsa.ibdaa@lamsadoha.com',
    contactPhone: '+213 555 987 654',
    address: 'ورشة الإبداع، حي الفنانين، وهران',
    socialMedia: { instagram: 'LamsaIbdaaOfficial', facebook: 'LamsaIbdaaPage' },
    accentColor: 'hsl(var(--accent-purple))',
    themeStyle: 'elegant',
  },
  'mathaq-albayt': { 
    id: 'store-mathaq-albayt',
    name: 'مذاق البيت',
    slug: 'mathaq-albayt',
    storeType: 'bakery',
    slogan: 'أشهى الحلويات المنزلية الأصيلة',
    story: 'في "مذاق البيت"، نصنع حلوياتنا بكل حب وشغف، مستخدمين مكونات طازجة ووصفات عائلية توارثناها عبر الأجيال، لتستمتعوا بمذاق لا يُنسى يذكركم بدفء المنزل.',
    highlights: ["حلويات طازجة يومياً", "وصفات تقليدية أصيلة", "مكونات طبيعية 100%"],
    logoSrc: 'https://picsum.photos/seed/mathaqlogo/100/100',
    dataAiHintLogo: 'bakery brand logo',
    bannerSrc: 'https://picsum.photos/seed/mathaqbanner/1200/400',
    dataAiHintBanner: 'homemade sweets display',
    category: 'حلويات ومأكولات شهية',
    storeCategories: ['كيك عالمي', 'حلويات شرقية تقليدية', 'حلويات شرقية فاخرة'],
    products: [
      { id: 'ma_p1', name: 'كيكة العسل الروسية التقليدية', type: 'خدمة', description: 'طبقات هشة من عجين العسل مع كريمة الزبدة الغنية، تجربة لا تقاوم.', longDescription: 'كيكة العسل الروسية الشهيرة "Medovik"، مكونة من طبقات رقيقة من بسكويت العسل وكريمة القشطة الحامضة أو كريمة الزبدة. تحضر بالطلب. تكفي 8-10 أشخاص.', price: '3,000 دج', imageSrc: 'https://picsum.photos/seed/russianhoneycake/300/300', dataAiHint: 'russian honey cake', category: 'كيك عالمي', isNew: true, averageRating: 4.6, reviewCount: 22  },
      { id: 'ma_p2', name: 'معمول التمر الفاخر المحشو بالجوز', type: 'بيع', description: 'معمول هش يذوب في الفم، بحشوة التمر الغنية وقطع الجوز المقرمشة.', longDescription: 'معمول بيتي فاخر مصنوع من أجود أنواع السميد والتمر، محشو بالجوز ومزين بالسكر البودرة. مثالي للتقديم في المناسبات والأعياد. العلبة تحتوي على 12 قطعة.', price: '1,500 دج / للعلبة (12 قطعة)', imageSrc: 'https://picsum.photos/seed/maamouldateswalnuts/300/300', dataAiHint: 'maamoul dates walnuts', category: 'حلويات شرقية تقليدية', isBestseller: true },
      { id: 'ma_p3', name: 'بقلاوة بالفستق الحلبي والعسل', type: 'بيع', description: 'طبقات رقيقة من العجين الذهبي محشوة بالفستق الحلبي الفاخر ومسقاة بالعسل الطبيعي.', longDescription: 'بقلاوة شهية محضرة من طبقات رقيقة من عجينة الفيلو، محشوة بالفستق الحلبي الفاخر ومخبوزة حتى تكتسب لونًا ذهبيًا، ثم تُسقى بشيرة العسل الطبيعي. تباع بالكيلو.', price: '2,800 دج / للكيلو', imageSrc: 'https://picsum.photos/seed/pistachiobaklava/300/300', dataAiHint: 'pistachio baklava honey', category: 'حلويات شرقية فاخرة' },
    ],
    contactEmail: 'mathaq.albayt@lamsadoha.com',
    contactPhone: '+213 555 654 321',
    address: 'مطبخ مذاق البيت، شارع الحلويات، قسنطينة',
    socialMedia: { instagram: 'MathaqAlbaytSweets', facebook: 'MathaqAlbaytBakery' },
    accentColor: 'hsl(var(--accent-yellow))',
    themeStyle: 'playful',
    openingHours: 'السبت - الخميس: 8ص - 7م',
  },
  'anaqa-lilijar': { 
    id: 'store-anaqa-lilijar',
    name: 'أناقة للإيجار',
    slug: 'anaqa-lilijar',
    storeType: 'rental',
    slogan: 'تألقي في كل مناسبة بأجمل الفساتين',
    story: 'في "أناقة للإيجار"، نؤمن بأن كل امرأة تستحق أن تشعر بالجمال والثقة في مناسباتها الخاصة. نوفر لكِ تشكيلة واسعة من فساتين السهرة الراقية بتصاميم عصرية وجودة عالية، لتكوني نجمة كل حفل دون الحاجة لشراء فستان جديد في كل مرة.',
    highlights: ["أحدث موديلات فساتين السهرة", "خدمة تأجير مريحة وسلسة", "أسعار تنافسية"],
    logoSrc: 'https://picsum.photos/seed/anaqalogo/100/100',
    dataAiHintLogo: 'fashion rental brand',
    bannerSrc: 'https://picsum.photos/seed/anaqabanner/1200/400',
    dataAiHintBanner: 'evening dresses rack',
    category: 'تأجير فساتين سهرة',
    storeCategories: ['فساتين سهرة فاخرة', 'فساتين قصيرة للمناسبات', 'فساتين حفلات زفاف'],
    products: [
      { id: 'an_p1', name: 'فستان سهرة ذهبي مطرز بالكريستال', type: 'إيجار', description: 'فستان طويل بقصة حورية البحر، مطرز بالكامل بكريستالات سواروفسكي، مثالي للمناسبات الكبرى.', longDescription: 'فستان سهرة فاخر بلون ذهبي بقصة حورية البحر يبرز جمال القوام. مطرز يدويًا بكريستالات سواروفسكي لامعة. مثالي لحفلات الزفاف والمناسبات الرسمية. متوفر بمقاسات S, M, L. مدة الإيجار 3 أيام.', price: '10,000 دج / لليلة', imageSrc: 'https://picsum.photos/seed/goldcrystaldress/300/300', dataAiHint: 'gold crystal dress', category: 'فساتين سهرة فاخرة', isBestseller: true, averageRating: 5, reviewCount: 7 },
      { id: 'an_p2', name: 'فستان كوكتيل أحمر قصير من الدانتيل', type: 'إيجار', description: 'فستان أنيق ومميز من الدانتيل الأحمر، مثالي للمناسبات النهارية والمسائية وحفلات الكوكتيل.', longDescription: 'فستان كوكتيل قصير وجذاب من الدانتيل الأحمر الفاخر. تصميم أنيق يناسب حفلات الخطوبة والمناسبات الخاصة. متوفر بمقاسات متعددة. مدة الإيجار يوم واحد.', price: '5,000 دج / لليلة', imageSrc: 'https://picsum.photos/seed/redlacedress/300/300', dataAiHint: 'red lace cocktail dress', category: 'فساتين قصيرة للمناسبات', isNew: true },
      { id: 'an_p3', name: 'فستان أميرات منفوش باللون الأزرق السماوي', type: 'إيجار', description: 'فستان ساحر بقصة الأميرات وتنورة منفوشة، يجعلكِ تشعرين وكأنكِ في حكاية خيالية.', longDescription: 'فستان الأحلام بقصة الأميرات بلون أزرق سماوي فاتح. يتميز بتنورة منفوشة من عدة طبقات من التول وصدرية مطرزة باللؤلؤ. مثالي لحفلات التخرج أو كفستان وصيفة العروس. مدة الإيجار 3 أيام.', price: '8,500 دج / لليلة', imageSrc: 'https://picsum.photos/seed/blueprincessdress/300/300', dataAiHint: 'blue princess dress', category: 'فساتين حفلات زفاف' },
    ],
    contactEmail: 'anaqa.lilijar@lamsadoha.com',
    contactPhone: '+213 555 111 222',
    address: 'بوتيك أناقة، شارع الموضة، سطيف',
    socialMedia: { instagram: 'AnaqaLilijar', facebook: 'AnaqaDressRental' },
    accentColor: 'hsl(330 65% 60%)', // Pink
    themeStyle: 'light',
  },
  'salon-asma': {
    id: 'store-salon-asma',
    name: 'صالون أسماء للتجميل',
    slug: 'salon-asma',
    storeType: 'salon',
    slogan: 'جمالكِ يبدأ من هنا',
    story: 'في صالون أسماء، نؤمن بأن كل امرأة تستحق أن تشعر بالجمال والثقة. نقدم مجموعة متكاملة من خدمات التجميل والعناية بالشعر والبشرة باستخدام أحدث التقنيات وأجود المنتجات. فريقنا من الخبيرات مستعد لتقديم أفضل تجربة لكِ.',
    highlights: ["خبيرات تجميل محترفات", "أحدث صيحات الموضة والجمال", "أجواء مريحة وفاخرة"],
    logoSrc: 'https://picsum.photos/seed/salonlogo/100/100',
    dataAiHintLogo: 'beauty salon logo',
    bannerSrc: 'https://picsum.photos/seed/salonbanner/1200/400',
    dataAiHintBanner: 'modern beauty salon interior',
    category: 'خدمات احترافية',
    storeCategories: ['العناية بالشعر', 'مكياج وسهرات', 'عناية بالبشرة والأظافر'],
    products: [
      { id: 'sa_p1', name: 'قص وتصفيف شعر احترافي', type: 'خدمة', description: 'احصلي على قصة شعر عصرية تناسب شكل وجهكِ مع تصفيف احترافي.', price: '2,500 دج', imageSrc: 'https://picsum.photos/seed/haircutstyle/300/300', dataAiHint: 'haircut styling salon', category: 'العناية بالشعر', averageRating: 4.8, reviewCount: 35 },
      { id: 'sa_p2', name: 'مكياج سهرة متكامل', type: 'خدمة', description: 'مكياج سهرة فاخر يبرز جمالكِ في المناسبات الخاصة.', price: '4,000 دج', imageSrc: 'https://picsum.photos/seed/makeupevening/300/300', dataAiHint: 'evening makeup professional', category: 'مكياج وسهرات', isBestseller: true },
      { id: 'sa_p3', name: 'جلسة عناية بالبشرة (تنظيف عميق)', type: 'خدمة', description: 'تنظيف عميق للبشرة لإزالة الشوائب وتجديد النضارة.', price: '3,000 دج', imageSrc: 'https://picsum.photos/seed/facialtreatment/300/300', dataAiHint: 'facial treatment spa', category: 'عناية بالبشرة والأظافر' },
    ],
    contactEmail: 'salon.asma@lamsadoha.com',
    contactPhone: '+213 555 333 444',
    address: 'صالون أسماء، الطابق الأول، مول الجزائر',
    socialMedia: { instagram: 'SalonAsmaBeauty', facebook: 'SalonAsmaDZ' },
    accentColor: 'hsl(270 50% 70%)', // Purple
    themeStyle: 'modern-minimal',
    openingHours: 'يومياً: 10ص - 8م (ما عدا الجمعة)',
    services: [
        { name: 'قص شعر', price: '1500 دج', duration: '45 دقيقة' },
        { name: 'سشوار', price: '1000 دج', duration: '30 دقيقة' },
        { name: 'صبغة شعر (لون واحد)', price: 'ابتداءً من 4000 دج' },
        { name: 'مكياج نهاري', price: '2000 دج' },
    ]
  },
};


interface FeaturedCollection {
    name: string;
    products: Product[];
}

const FeaturedCollectionsSection: React.FC<{ collections: FeaturedCollection[], storeData: StoreData | null, onViewProductDetails: (product: Product) => void, onShowAllFromCollection: (categoryName: string) => void }> = ({ collections, storeData, onViewProductDetails, onShowAllFromCollection }) => {
    if (!collections.length) return null;

    return (
        <StoreSection title="اكتشفي مجموعاتنا" icon={Palette} accentColor={storeData?.accentColor} className="my-10">
            <div className="space-y-10">
                {collections.map(collection => (
                    <div key={collection.name}>
                        <h3 className="text-xl font-semibold mb-4 text-foreground/90" style={{borderBottom: `2px solid ${storeData?.accentColor || 'hsl(var(--primary))'}`, paddingBottom: '0.5rem'}}>
                            {collection.name}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {collection.products.slice(0,3).map(product => (
                                <StoreProductCard key={product.id} product={product} accentColor={storeData?.accentColor} onViewDetails={onViewProductDetails} />
                            ))}
                        </div>
                        {collection.products.length > 3 && (
                            <div className="text-center mt-6">
                                <Button variant="outline" onClick={() => onShowAllFromCollection(collection.name)}
                                style={{borderColor: storeData?.accentColor || 'hsl(var(--primary))', color: storeData?.accentColor || 'hsl(var(--primary))'}}
                                >
                                    عرض المزيد من {collection.name}
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </StoreSection>
    );
};

const SpecialOffersSection: React.FC<{ products: Product[], storeData: StoreData | null, onViewProductDetails: (product: Product) => void }> = ({ products, storeData, onViewProductDetails }) => {
    if (!products.length) return null;
    const autoplayPlugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

    return (
        <StoreSection title="عروضنا المميزة" icon={Sparkles} accentColor={storeData?.accentColor} className="bg-card/50 p-4 md:p-6 rounded-lg shadow-md">
            <Carousel
                opts={{ align: "start", loop: products.length > 2, direction: "rtl" }}
                plugins={[autoplayPlugin.current]}
                className="w-full"
                onMouseEnter={autoplayPlugin.current.stop}
                onMouseLeave={autoplayPlugin.current.reset}
            >
                <CarouselContent className="-ml-4">
                    {products.map(product => (
                        <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4">
                            <StoreProductCard product={product} accentColor={storeData?.accentColor} onViewDetails={onViewProductDetails} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {products.length > 3 && <> <CarouselPrevious className="right-0 -translate-x-1/2 left-auto text-white" style={{backgroundColor: storeData?.accentColor || 'hsl(var(--primary))'}} /> <CarouselNext className="left-0 translate-x-1/2 right-auto text-white" style={{backgroundColor: storeData?.accentColor || 'hsl(var(--primary))'}} /> </>}
            </Carousel>
        </StoreSection>
    );
};


export default function StorePage() {
  const params = useParams();
  const router = useRouter();
  const storeId = params.storeId as string;
  const { toast } = useToast();
  const autoplayPlugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStoreCategory, setSelectedStoreCategory] = useState<string>('الكل');
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (storeId) {
      setIsLoading(true);
      setTimeout(() => {
        const data = mockStoreDetails[storeId];
        if (data) {
          setStoreData(data);
        } else {
          toast({ title: "خطأ", description: `لم يتم العثور على المتجر المطلوب (${storeId}).`, variant: "destructive" });
          router.push('/products');
        }
        setIsLoading(false);
      }, 1000);
    } else {
        toast({ title: "خطأ", description: "معرّف المتجر غير موجود.", variant: "destructive" });
        router.push('/products');
        setIsLoading(false);
    }
  }, [storeId, toast, router]);

  const newArrivals = storeData?.products.filter(p => p.isNew).slice(0, 6) || [];
  const bestSellers = storeData?.products.filter(p => p.isBestseller).slice(0, 6) || [];
  const specialOffers = storeData?.products.filter(p => p.price.includes('خصم') || (p.averageRating || 0) > 4.5).slice(0,8) || []; 
  const featuredCollectionsData: FeaturedCollection[] = storeData?.storeCategories.map(category => ({
        name: category,
        products: storeData.products.filter(p => p.category === category)
    })).filter(collection => collection.products.length > 0) || [];
  
  const filteredProducts = selectedStoreCategory === 'الكل' 
    ? storeData?.products 
    : storeData?.products.filter(p => p.category === selectedStoreCategory);

  const handleViewProductDetails = (product: Product) => {
    setSelectedProductModal(product);
    setIsModalOpen(true);
  };
  
  const handleShowAllFromCollection = (categoryName: string) => {
    setSelectedStoreCategory(categoryName);
    const allProductsSection = document.getElementById('all-products-section');
    if (allProductsSection) {
        allProductsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getModalActionText = (type?: ProductType) => {
    switch (type) {
      case 'بيع': return <><ShoppingBag size={18} className="mr-2" /> أضيفي للسلة (قريباً)</>;
      case 'إيجار': return <><CalendarDays size={18} className="mr-2" /> احجزي الآن (قريباً)</>;
      case 'خدمة': return <><Handshake size={18} className="mr-2" /> استفسري/احجزي الخدمة (قريباً)</>;
      default: return 'عرض التفاصيل';
    }
  }

  const getStoreTypeSpecificIcon = (storeType: StoreType | undefined) => {
    switch (storeType) {
        case 'bakery': return CookingPot;
        case 'fashion': return Shirt;
        case 'salon': return Scissors;
        case 'crafts': return Edit3; // Or Palette
        case 'rental': return CalendarDays;
        case 'service': return Handshake;
        default: return Store;
    }
  };
  const StoreTypeSpecificIcon = getStoreTypeSpecificIcon(storeData?.storeType);


  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 min-h-screen">
        <Skeleton className="h-48 md:h-64 w-full rounded-lg mb-8" />
        <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
            <Skeleton className="h-32 w-32 md:h-40 md:w-40 rounded-full mx-auto md:mx-0 relative -mt-16 md:-mt-20 z-10" />
            <div className="flex-1 space-y-3 pt-4 md:pt-0">
                <Skeleton className="h-10 w-3/4" /> 
                <Skeleton className="h-6 w-1/2" /> 
                <Skeleton className="h-5 w-1/4" /> 
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <Skeleton className="h-40 w-full rounded-lg"/>
                <Skeleton className="h-40 w-full rounded-lg"/>
            </div>
            <div className="lg:col-span-2 space-y-8">
                <Skeleton className="h-10 w-1/3 mb-6" />
                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[1,2,3].map(i => <Skeleton key={`prod_skel_${i}`} className="h-80 w-full rounded-lg"/>)}
                </div>
            </div>
        </div>
      </div>
    );
  }

  if (!storeData) {
    return (
      <div className="container mx-auto px-4 py-12 text-center min-h-screen flex flex-col justify-center items-center">
        <ShoppingBag size={64} className="mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-semibold text-destructive">المتجر غير موجود</h1>
        <p className="text-muted-foreground mt-2">عذرًا، لا يمكننا العثور على المتجر الذي تبحثين عنه.</p>
        <Button asChild className="mt-6" onClick={() => router.push('/products')}>
          <Link href="/products">العودة إلى تصفح المنتجات</Link>
        </Button>
      </div>
    );
  }
  
  const storeThemeStyle = storeData.themeStyle || 'light';

  return (
    <div className={cn(
        "min-h-screen",
        storeThemeStyle === 'light' && "bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50",
        storeThemeStyle === 'elegant' && "bg-slate-50",
        storeThemeStyle === 'playful' && "bg-amber-50",
        storeThemeStyle === 'modern-minimal' && "bg-gray-50",
    )}>
      <div className="relative h-56 md:h-80 w-full group overflow-hidden shadow-inner">
        <Image 
          src={storeData.bannerSrc} 
          alt={`${storeData.name} Banner`} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          data-ai-hint={storeData.dataAiHintBanner} 
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative -mt-16 md:-mt-24 z-10 flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 p-4 md:p-6 bg-card shadow-xl rounded-lg border-2 mb-10" style={{borderColor: storeData.accentColor || 'hsl(var(--primary))'}}>
          <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 shadow-lg" style={{borderColor: storeData.accentColor || 'hsl(var(--primary))'}}>
            <AvatarImage src={storeData.logoSrc} alt={`${storeData.name} Logo`} data-ai-hint={storeData.dataAiHintLogo} />
            <AvatarFallback className="text-3xl" style={{backgroundColor: storeData.accentColor ? `${storeData.accentColor}33` : 'hsl(var(--muted))', color: storeData.accentColor || 'hsl(var(--primary))'}}>
                {storeData.name.substring(0,2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-right pt-2 md:pt-0">
            <h1 className="text-3xl md:text-5xl font-bold" style={{color: storeData.accentColor || 'hsl(var(--primary))'}}>{storeData.name}</h1>
            {storeData.slogan && <p className="text-md md:text-lg text-muted-foreground mt-1">{storeData.slogan}</p>}
            <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
                <Badge variant="outline" className="capitalize text-sm" style={{borderColor: storeData.accentColor ? `${storeData.accentColor}80` : 'hsl(var(--primary)/0.5)', color: storeData.accentColor || 'hsl(var(--primary))'}}>
                  <StoreTypeSpecificIcon size={14} className="ml-1" /> {storeData.category}
                </Badge>
                <Badge variant="secondary" className="text-sm"><Star size={14} className="ml-1 text-yellow-400 fill-yellow-400"/> 4.7 (150+ تقييم)</Badge>
            </div>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0 self-center md:self-auto">
            <Button variant="outline" size="icon" title="إضافة للمفضلة (قيد التطوير)" className="rounded-full hover:bg-pink-100" onClick={() => toast({title: "تمت الإضافة للمفضلة (محاكاة)!", description: `${storeData.name} الآن في قائمتك.`})}>
              <Heart className="h-5 w-5 text-pink-500" />
            </Button>
            <Button variant="outline" size="icon" title="مشاركة المتجر (قيد التطوير)" className="rounded-full hover:bg-purple-100" onClick={() => toast({title: "رابط المتجر جاهز للمشاركة (محاكاة)!", description: `شارك ${storeData.name} مع صديقاتك.`})}>
              <Share2 className="h-5 w-5 text-purple-500" />
            </Button>
          </div>
        </div>
        
        {storeData.highlights && storeData.highlights.length > 0 && (
            <StoreSection title="أبرز ما يميزنا" icon={Sparkles} accentColor={storeData.accentColor} className="bg-card p-6 rounded-lg shadow-md mb-10">
                <ul className="list-none space-y-2 pl-0">
                    {storeData.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center text-foreground/90">
                            <ThumbsUp size={18} className="ml-2 flex-shrink-0" style={{color: storeData.accentColor || 'hsl(var(--primary))'}}/>
                            {highlight}
                        </li>
                    ))}
                </ul>
            </StoreSection>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12">
          <aside className="lg:col-span-1 space-y-8">
            <Card className="shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2" style={{color: storeData.accentColor || 'hsl(var(--primary))'}}><Info size={20}/> عن مبدعتنا</CardTitle>
              </CardHeader>
              <CardContent>
                {storeData.story ? (
                  <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap text-sm">{storeData.story}</p>
                ) : (
                  <p className="text-muted-foreground">لم تقدم المبدعة وصفًا لمتجرها بعد.</p>
                )}
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2" style={{color: storeData.accentColor || 'hsl(var(--primary))'}}><MessageSquare size={20}/> معلومات التواصل</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    {storeData.openingHours && <p className="flex items-center gap-2"><CalendarDays size={16} className="text-muted-foreground"/> {storeData.openingHours}</p>}
                    {storeData.contactEmail && <p className="flex items-start gap-2"><Mail size={16} className="text-muted-foreground mt-0.5"/> <a href={`mailto:${storeData.contactEmail}`} className="hover:underline transition-colors break-all" style={{color: storeData.accentColor || 'hsl(var(--primary))'}}>{storeData.contactEmail}</a></p>}
                    {storeData.contactPhone && <p className="flex items-center gap-2"><Phone size={16} className="text-muted-foreground"/> <a href={`tel:${storeData.contactPhone}`} className="hover:underline transition-colors" style={{color: storeData.accentColor || 'hsl(var(--primary))'}}>{storeData.contactPhone}</a></p>}
                    {storeData.address && <p className="flex items-start gap-2"><MapPin size={16} className="text-muted-foreground mt-0.5"/> {storeData.address}</p>}
                    
                    {(storeData.socialMedia?.instagram || storeData.socialMedia?.facebook || storeData.socialMedia?.twitter) && <Separator className="my-3"/>}

                    {storeData.socialMedia?.instagram && <p className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> <a href={`https://instagram.com/${storeData.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors" style={{color: storeData.accentColor || 'hsl(var(--primary))'}}>@{storeData.socialMedia.instagram}</a></p>}
                    {storeData.socialMedia?.facebook && <p className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> <a href={`https://facebook.com/${storeData.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors" style={{color: storeData.accentColor || 'hsl(var(--primary))'}}>{storeData.socialMedia.facebook}</a></p>}
                    {storeData.socialMedia?.twitter && <p className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg> <a href={`https://twitter.com/${storeData.socialMedia.twitter}`} target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors" style={{color: storeData.accentColor || 'hsl(var(--primary))'}}>@{storeData.socialMedia.twitter}</a></p>}

                     <Button className="w-full mt-4" style={{backgroundColor: storeData.accentColor || 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))'}}>إرسال رسالة عبر المنصة (قيد التطوير)</Button>
                </CardContent>
            </Card>
            
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2" style={{color: storeData.accentColor || 'hsl(var(--primary))'}}><Star size={20}/> تقييمات المتجر</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center py-4">لا توجد تقييمات بعد (قيد التطوير).</p>
                </CardContent>
            </Card>
          </aside>

          <main className="lg:col-span-2 space-y-12">
            {/* Template specific sections */}
            {storeData.storeType === 'bakery' && <BakerySpecialsSection products={storeData.products.slice(0,4)} storeData={storeData} onViewProductDetails={handleViewProductDetails} />}
            {storeData.storeType === 'salon' && <SalonServicesSection services={storeData.services || []} storeData={storeData} onBookService={(serviceName) => toast({title: `حجز خدمة: ${serviceName}`, description: "سيتم توجيهك لصفحة الحجز (قيد التطوير)"})} />}
            {storeData.storeType === 'fashion' && <FashionLookbookSection products={storeData.products.slice(0,4)} storeData={storeData} onViewProductDetails={handleViewProductDetails} />}


            {newArrivals.length > 0 && (
                <StoreSection title="وصل حديثًا" icon={Rocket} accentColor={storeData.accentColor}>
                    <Carousel 
                        opts={{ align: "start", loop: newArrivals.length > 2, direction: "rtl" }} 
                        plugins={[autoplayPlugin.current]}
                        className="w-full"
                        onMouseEnter={autoplayPlugin.current.stop}
                        onMouseLeave={autoplayPlugin.current.reset}
                    >
                        <CarouselContent className="-ml-4">
                        {newArrivals.map(product => (
                            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                                <StoreProductCard product={product} accentColor={storeData.accentColor} onViewDetails={handleViewProductDetails} />
                            </CarouselItem>
                        ))}
                        </CarouselContent>
                        {newArrivals.length > 3 && <> <CarouselPrevious className="right-0 -translate-x-1/2 left-auto text-white" style={{backgroundColor: storeData?.accentColor || 'hsl(var(--primary))'}} /> <CarouselNext className="left-0 translate-x-1/2 right-auto text-white" style={{backgroundColor: storeData?.accentColor || 'hsl(var(--primary))'}} /> </>}
                    </Carousel>
                </StoreSection>
            )}

            {bestSellers.length > 0 && (
                <StoreSection title="الأكثر طلبًا" icon={ThumbsUp} accentColor={storeData.accentColor}>
                     <Carousel 
                        opts={{ align: "start", loop: bestSellers.length > 2, direction: "rtl" }} 
                        plugins={[autoplayPlugin.current]}
                        className="w-full"
                        onMouseEnter={autoplayPlugin.current.stop}
                        onMouseLeave={autoplayPlugin.current.reset}
                    >
                        <CarouselContent className="-ml-4">
                        {bestSellers.map(product => (
                            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                                <StoreProductCard product={product} accentColor={storeData.accentColor} onViewDetails={handleViewProductDetails} />
                            </CarouselItem>
                        ))}
                        </CarouselContent>
                         {bestSellers.length > 3 && <> <CarouselPrevious className="right-0 -translate-x-1/2 left-auto text-white" style={{backgroundColor: storeData?.accentColor || 'hsl(var(--primary))'}} /> <CarouselNext className="left-0 translate-x-1/2 right-auto text-white" style={{backgroundColor: storeData?.accentColor || 'hsl(var(--primary))'}} /> </>}
                    </Carousel>
                </StoreSection>
            )}
            
            <FeaturedCollectionsSection 
                collections={featuredCollectionsData} 
                storeData={storeData}
                onViewProductDetails={handleViewProductDetails}
                onShowAllFromCollection={handleShowAllFromCollection}
            />

            <SpecialOffersSection products={specialOffers} storeData={storeData} onViewProductDetails={handleViewProductDetails} />


            {storeData.storeCategories && storeData.storeCategories.length > 0 && (
                 <StoreSection title="تسوقي حسب الفئة" icon={Tag} accentColor={storeData.accentColor}>
                    <div className="flex flex-wrap gap-3">
                        <Button 
                            variant={selectedStoreCategory === 'الكل' ? 'default': 'outline'}
                            onClick={() => setSelectedStoreCategory('الكل')}
                            style={selectedStoreCategory === 'الكل' ? {backgroundColor: storeData.accentColor || 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))'} : {borderColor: storeData.accentColor ? `${storeData.accentColor}80` : 'hsl(var(--input))', color: storeData.accentColor || 'hsl(var(--foreground))'}}
                            className="transition-all"
                        >
                            كل المنتجات
                        </Button>
                        {storeData.storeCategories.map(category => (
                            <Button 
                                key={category} 
                                variant={selectedStoreCategory === category ? 'default' : 'outline'}
                                onClick={() => setSelectedStoreCategory(category)}
                                style={selectedStoreCategory === category ? {backgroundColor: storeData.accentColor || 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))'} : {borderColor: storeData.accentColor ? `${storeData.accentColor}80` : 'hsl(var(--input))', color: storeData.accentColor || 'hsl(var(--foreground))'}}
                                className="transition-all"
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </StoreSection>
            )}

            <StoreSection title={selectedStoreCategory === 'الكل' ? "جميع إبداعات المتجر" : `إبداعات من فئة: ${selectedStoreCategory}`} icon={ShoppingBasket} accentColor={storeData.accentColor} id="all-products-section">
                {filteredProducts && filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                        <StoreProductCard key={product.id} product={product} accentColor={storeData.accentColor} onViewDetails={handleViewProductDetails} />
                    ))}
                </div>
                ) : (
                <div className="text-center py-12 bg-card rounded-lg shadow">
                    <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold" style={{color: storeData.accentColor || 'hsl(var(--primary))'}}>لا توجد منتجات أو خدمات لعرضها حاليًا في هذه الفئة</h3>
                    <p className="text-foreground/70 mt-2">هذه المبدعة لم تقم بإضافة أي عناصر لهذه الفئة بعد. عاودي التحقق قريبًا!</p>
                </div>
                )}
            </StoreSection>
          </main>
        </div>
      </div>
      {selectedProductModal && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl max-h-[90vh] flex flex-col">
            <DialogHeader className="pt-6 pr-6 pl-6 pb-2">
                <DialogTitle className="text-3xl font-bold" style={{color: storeData?.accentColor || 'hsl(var(--primary))'}}>{selectedProductModal.name}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-6 overflow-y-auto flex-1">
                <div className="relative aspect-square md:aspect-auto md:min-h-[300px] rounded-lg overflow-hidden border">
                    <Image
                        src={selectedProductModal.imageSrc}
                        alt={selectedProductModal.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        data-ai-hint={selectedProductModal.dataAiHint}
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground mb-1">
                            الفئة: {selectedProductModal.category} • النوع: <span className="capitalize">{selectedProductModal.type}</span>
                        </p>
                        <DialogDescription className="text-md text-foreground/80 leading-relaxed mb-4 whitespace-pre-wrap">
                            {selectedProductModal.longDescription || selectedProductModal.description}
                        </DialogDescription>
                        
                        {selectedProductModal.averageRating && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                                <Star className="w-4 h-4" style={{fill: storeData?.accentColor || 'hsl(var(--accent-yellow))', color: storeData?.accentColor || 'hsl(var(--accent-yellow))'}}/>
                                <span>{selectedProductModal.averageRating.toFixed(1)}</span>
                                <span className="text-xs">({selectedProductModal.reviewCount} تقييمات)</span>
                                 <Button variant="link" size="sm" className="p-0 h-auto text-xs" style={{color: storeData?.accentColor || 'hsl(var(--primary))'}}>قراءة التقييمات</Button>
                            </div>
                        )}
                    </div>
                    <div>
                        <p className="text-3xl font-bold mt-2 mb-4" style={{color: storeData?.accentColor || 'hsl(var(--accent-pink))'}}>{selectedProductModal.price}</p>
                    </div>
                </div>
            </div>
             <DialogFooter className="p-6 border-t bg-muted/30 flex flex-col sm:flex-row justify-between items-center gap-3">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto">
                    متابعة التسوق
                </Button>
                <Button 
                    type="button" 
                    className="w-full sm:w-auto text-white text-lg py-3 px-6"
                    style={{backgroundColor: storeData?.accentColor || 'hsl(var(--primary))'}}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                    {getModalActionText(selectedProductModal.type)}
                </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
