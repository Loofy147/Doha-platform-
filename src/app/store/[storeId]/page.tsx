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
import { ShoppingBag, Star, MessageSquare, Info, MapPin, Phone, Heart, Share2, Mail, Sparkles, Tag, ThumbsUp, Eye, ChevronLeft, ChevronRight, ShoppingBasket, Rocket, Palette } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  description: string;
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
  slogan?: string;
  story?: string;
  highlights?: string[]; // Short bullet points for store highlights
  logoSrc: string;
  dataAiHintLogo: string;
  bannerSrc: string;
  dataAiHintBanner: string;
  category: string; // Main store category
  storeCategories: string[]; // Categories of products within this store
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
  themeStyle?: 'light' | 'elegant' | 'playful'; // Conceptual for future theming
}

const mockStoreDetails: Record<string, StoreData> = {
  'my-mock-store': {
    id: 'store123',
    name: 'متجر لمسات ضحى الإبداعية',
    slug: 'my-mock-store',
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
      { id: 'p1', name: 'أقراط فضية مرصعة بالفيروز', description: 'أقراط أنيقة مصنوعة يدوياً.', price: '3,500 دج', imageSrc: 'https://picsum.photos/seed/earrings/300/300', dataAiHint: 'silver earrings', category: 'مجوهرات', isNew: true, averageRating: 4.5, reviewCount: 12 },
      { id: 'p2', name: 'لوحة زيتية "ألوان الربيع"', description: 'لوحة تجريدية تضفي الحياة على أي جدار.', price: '12,000 دج', imageSrc: 'https://picsum.photos/seed/painting/300/300', dataAiHint: 'oil painting', category: 'فن وديكور', isBestseller: true, averageRating: 5, reviewCount: 8 },
      { id: 'p3', name: 'مجموعة شموع عطرية يدوية', description: 'شموع طبيعية بروائح آسرة.', price: '2,200 دج', imageSrc: 'https://picsum.photos/seed/candles/300/300', dataAiHint: 'scented candles', category: 'ديكور منزلي', averageRating: 4.2, reviewCount: 20 },
      { id: 'p4', name: 'كوب سيراميك مزخرف', description: 'كوب فريد بتصميم يدوي.', price: '1,800 دج', imageSrc: 'https://picsum.photos/seed/mug/300/300', dataAiHint: 'ceramic mug', category: 'أدوات منزلية', isNew: true, averageRating: 4.8, reviewCount: 5 },
      { id: 'p5', name: 'قلادة الأحجار الكريمة', description: 'قلادة أنيقة بأحجار كريمة متنوعة.', price: '4,800 دج', imageSrc: 'https://picsum.photos/seed/necklace/300/300', dataAiHint: 'gemstone necklace', category: 'مجوهرات', isBestseller: true },
      { id: 'p6', name: 'إناء زهور خزفي', description: 'إناء بتصميم فريد يضفي لمسة جمالية.', price: '2,500 دج', imageSrc: 'https://picsum.photos/seed/vase/300/300', dataAiHint: 'ceramic vase', category: 'ديكور منزلي' },
    ],
    contactEmail: 'contact@lamsatdoha.com',
    contactPhone: '+213 555 123 456',
    address: '123 شارع الإبداع، الجزائر العاصمة',
    socialMedia: { instagram: 'lamsat_doha', facebook: 'LamsaDohaCreations', twitter: 'LamsaDoha' },
    accentColor: 'hsl(var(--accent-pink))',
    themeStyle: 'elegant',
  },
   // Add other store details here, similar to my-mock-store but with different products and details.
  'lamsa-ibdaa': { 
    id: 'store-lamsa-ibdaa',
    name: 'لمسة إبداع',
    slug: 'lamsa-ibdaa',
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
      { id: 'li_p1', name: 'حقيبة جلد مطرزة باليد', description: 'حقيبة جلدية فاخرة بتطريز يدوي دقيق، مثالية لإطلالة متميزة.', price: '7,200 دج', imageSrc: 'https://picsum.photos/seed/leatherbagstitch/300/300', dataAiHint: 'stitched leather bag', category: 'إكسسوارات فاخرة', isBestseller: true, averageRating: 4.9, reviewCount: 15 },
      { id: 'li_p2', name: 'مجموعة فخاريات مزخرفة يدويًا', description: 'أواني فخارية فريدة مرسومة بألوان زاهية لتزيين منزلك.', price: '4,800 دج', imageSrc: 'https://picsum.photos/seed/decoratedpottery/300/300', dataAiHint: 'decorated pottery set', category: 'ديكور منزلي فني', isNew: true },
      { id: 'li_p3', name: 'وشاح حرير مصبوغ طبيعيًا', description: 'وشاح حريري ناعم مصبوغ بألوان طبيعية مستخلصة من النباتات.', price: '3,500 دج', imageSrc: 'https://picsum.photos/seed/silkscarfnatural/300/300', dataAiHint: 'natural silk scarf', category: 'أزياء مستدامة', averageRating: 4.7, reviewCount: 9  },
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
    slogan: 'أشهى الحلويات المنزلية الأصيلة',
    story: 'في "مذاق البيت"، نصنع حلوياتنا بكل حب وشغف، مستخدمين مكونات طازجة ووصفات عائلية توارثناها عبر الأجيال، لتستمتعوا بمذاق لا يُنسى يذكركم بدفء المنزل.',
    highlights: ["حلويات طازجة يومياً", "وصفات تقليدية أصيلة", "مكونات طبيعية 100%"],
    logoSrc: 'https://picsum.photos/seed/mathaqlogo/100/100',
    dataAiHintLogo: 'bakery brand logo',
    bannerSrc: 'https://picsum.photos/seed/mathaqbanner/1200/400',
    dataAiHintBanner: 'homemade sweets display',
    category: 'حلويات ومأكولات منزلية',
    storeCategories: ['كيك عالمي', 'حلويات شرقية تقليدية', 'حلويات شرقية فاخرة'],
    products: [
      { id: 'ma_p1', name: 'كيكة العسل الروسية التقليدية', description: 'طبقات هشة من عجين العسل مع كريمة الزبدة الغنية، تجربة لا تقاوم.', price: '3,000 دج', imageSrc: 'https://picsum.photos/seed/russianhoneycake/300/300', dataAiHint: 'russian honey cake', category: 'كيك عالمي', isNew: true, averageRating: 4.6, reviewCount: 22  },
      { id: 'ma_p2', name: 'معمول التمر الفاخر المحشو بالجوز', description: 'معمول هش يذوب في الفم، بحشوة التمر الغنية وقطع الجوز المقرمشة.', price: '1,500 دج / للعلبة (12 قطعة)', imageSrc: 'https://picsum.photos/seed/maamouldateswalnuts/300/300', dataAiHint: 'maamoul dates walnuts', category: 'حلويات شرقية تقليدية', isBestseller: true },
      { id: 'ma_p3', name: 'بقلاوة بالفستق الحلبي والعسل', description: 'طبقات رقيقة من العجين الذهبي محشوة بالفستق الحلبي الفاخر ومسقاة بالعسل الطبيعي.', price: '2,800 دج / للكيلو', imageSrc: 'https://picsum.photos/seed/pistachiobaklava/300/300', dataAiHint: 'pistachio baklava honey', category: 'حلويات شرقية فاخرة' },
    ],
    contactEmail: 'mathaq.albayt@lamsadoha.com',
    contactPhone: '+213 555 654 321',
    address: 'مطبخ مذاق البيت، شارع الحلويات، قسنطينة',
    socialMedia: { instagram: 'MathaqAlbaytSweets', facebook: 'MathaqAlbaytBakery' },
    accentColor: 'hsl(var(--accent-yellow))',
    themeStyle: 'playful',
  },
  'anaqa-lilijar': { 
    id: 'store-anaqa-lilijar',
    name: 'أناقة للإيجار',
    slug: 'anaqa-lilijar',
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
      { id: 'an_p1', name: 'فستان سهرة ذهبي مطرز بالكريستال', description: 'فستان طويل بقصة حورية البحر، مطرز بالكامل بكريستالات سواروفسكي، مثالي للمناسبات الكبرى.', price: '10,000 دج / لليلة', imageSrc: 'https://picsum.photos/seed/goldcrystaldress/300/300', dataAiHint: 'gold crystal dress', category: 'فساتين سهرة فاخرة', isBestseller: true, averageRating: 5, reviewCount: 7 },
      { id: 'an_p2', name: 'فستان كوكتيل أحمر قصير من الدانتيل', description: 'فستان أنيق ومميز من الدانتيل الأحمر، مثالي للمناسبات النهارية والمسائية وحفلات الكوكتيل.', price: '5,000 دج / لليلة', imageSrc: 'https://picsum.photos/seed/redlacedress/300/300', dataAiHint: 'red lace cocktail dress', category: 'فساتين قصيرة للمناسبات', isNew: true },
      { id: 'an_p3', name: 'فستان أميرات منفوش باللون الأزرق السماوي', description: 'فستان ساحر بقصة الأميرات وتنورة منفوشة، يجعلكِ تشعرين وكأنكِ في حكاية خيالية.', price: '8,500 دج / لليلة', imageSrc: 'https://picsum.photos/seed/blueprincessdress/300/300', dataAiHint: 'blue princess dress', category: 'فساتين حفلات زفاف' },
    ],
    contactEmail: 'anaqa.lilijar@lamsadoha.com',
    contactPhone: '+213 555 111 222',
    address: 'بوتيك أناقة، شارع الموضة، سطيف',
    socialMedia: { instagram: 'AnaqaLilijar', facebook: 'AnaqaDressRental' },
    accentColor: 'hsl(330 65% 60%)', // A vibrant pink
    themeStyle: 'light',
  }
};

const StoreProductCard: React.FC<{ product: Product, accentColor?: string }> = ({ product, accentColor }) => {
  const { toast } = useToast();
  const handleViewDetails = () => {
    // In a real app, this would likely open a product detail page or a more detailed modal
    toast({
      title: `تفاصيل المنتج: ${product.name}`,
      description: "سيتم عرض صفحة المنتج الكاملة هنا (قيد التطوير).",
      action: <Button variant="outline" size="sm" onClick={() => {/* navigate to product page */}}>اكتشفي المزيد</Button>,
    });
  };

  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group h-full border rounded-lg hover:border-primary/50">
      <CardHeader className="p-0 relative aspect-square">
        <Image 
          src={product.imageSrc} 
          alt={product.name} 
          fill 
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105" 
          data-ai-hint={product.dataAiHint} 
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
            {product.isNew && <Badge variant="destructive" className="shadow-md animate-pulse">جديد!</Badge>}
            {product.isBestseller && <Badge style={{ backgroundColor: accentColor || 'hsl(var(--accent-yellow))', color: 'hsl(var(--accent-yellow-foreground))' }} className="shadow-md">الأكثر مبيعًا</Badge>}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <CardTitle className="text-lg font-semibold text-primary mb-1 group-hover:text-pink-500 transition-colors" style={{ color: accentColor || 'hsl(var(--primary))' }}>
          {product.name}
        </CardTitle>
        <CardDescription className="text-xs text-foreground/70 flex-grow mb-2">{product.description}</CardDescription>
        {product.averageRating && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                <Star className="w-3.5 h-3.5" style={{fill: accentColor || 'hsl(var(--accent-yellow))', color: accentColor || 'hsl(var(--accent-yellow))'}}/>
                <span>{product.averageRating.toFixed(1)}</span>
                <span>({product.reviewCount} تقييمات)</span>
            </div>
        )}
        <p className="text-xl font-bold mt-auto" style={{ color: accentColor || 'hsl(var(--accent-pink))' }}>{product.price}</p>
      </CardContent>
      <CardFooter className="p-3 border-t">
        <Button 
          variant="outline" 
          className="w-full hover:text-white transition-all duration-300"
          style={{
            borderColor: accentColor || 'hsl(var(--primary))',
            color: accentColor || 'hsl(var(--primary))',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = accentColor || 'hsl(var(--primary))'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          onClick={handleViewDetails}
        >
          <ShoppingBasket size={16} className="ml-2"/> عرض التفاصيل
        </Button>
      </CardFooter>
    </Card>
  );
};

const StoreSection: React.FC<{title: string, icon?: React.ElementType, children: React.ReactNode, accentColor?: string, className?: string}> = ({ title, icon: Icon, children, accentColor, className }) => {
    return (
        <section className={cn("py-8 md:py-12", className)}>
            <div className="flex items-center gap-3 mb-6">
                {Icon && <Icon size={28} style={{color: accentColor || 'hsl(var(--primary))'}} />}
                <h2 className="text-2xl md:text-3xl font-bold" style={{color: accentColor || 'hsl(var(--primary))'}}>{title}</h2>
            </div>
            {children}
        </section>
    )
}

export default function StorePage() {
  const params = useParams();
  const router = useRouter();
  const storeId = params.storeId as string;
  const { toast } = useToast();
  const autoplayPlugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStoreCategory, setSelectedStoreCategory] = useState<string>('الكل');

  useEffect(() => {
    if (storeId) {
      setIsLoading(true);
      setTimeout(() => {
        const data = mockStoreDetails[storeId];
        if (data) {
          setStoreData(data);
        } else {
          toast({ title: "خطأ", description: `لم يتم العثور على المتجر المطلوب.`, variant: "destructive" });
          router.push('/products'); // Redirect if store not found
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
  
  const filteredProducts = selectedStoreCategory === 'الكل' 
    ? storeData?.products 
    : storeData?.products.filter(p => p.category === selectedStoreCategory);


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
    // This case should ideally be handled by the redirect in useEffect, but as a fallback:
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
  
  const storeThemeStyle = storeData.themeStyle || 'light'; // Default theme

  return (
    <div className={cn(
        "min-h-screen",
        storeThemeStyle === 'light' && "bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50",
        storeThemeStyle === 'elegant' && "bg-slate-50",
        storeThemeStyle === 'playful' && "bg-amber-50",
    )}>
      {/* Store Banner */}
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
            {/* Can add text or overlay elements on banner here */}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Store Header and Logo */}
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
                <Palette size={14} className="ml-1" /> {storeData.category}
                </Badge>
                {/* Mock rating */}
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
        
        {/* Store Highlights Section */}
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
          {/* Sidebar/Store Info */}
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

          {/* Products Sections */}
          <main className="lg:col-span-2 space-y-12">
            {/* New Arrivals Section */}
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
                                <StoreProductCard product={product} accentColor={storeData.accentColor} />
                            </CarouselItem>
                        ))}
                        </CarouselContent>
                        {newArrivals.length > 3 && <> <CarouselPrevious className="right-0 -translate-x-1/2 left-auto text-white" style={{backgroundColor: storeData.accentColor || 'hsl(var(--primary))'}} /> <CarouselNext className="left-0 translate-x-1/2 right-auto text-white" style={{backgroundColor: storeData.accentColor || 'hsl(var(--primary))'}} /> </>}
                    </Carousel>
                </StoreSection>
            )}

            {/* Best Sellers Section */}
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
                                <StoreProductCard product={product} accentColor={storeData.accentColor} />
                            </CarouselItem>
                        ))}
                        </CarouselContent>
                         {bestSellers.length > 3 && <> <CarouselPrevious className="right-0 -translate-x-1/2 left-auto text-white" style={{backgroundColor: storeData.accentColor || 'hsl(var(--primary))'}} /> <CarouselNext className="left-0 translate-x-1/2 right-auto text-white" style={{backgroundColor: storeData.accentColor || 'hsl(var(--primary))'}} /> </>}
                    </Carousel>
                </StoreSection>
            )}
            
            {/* Shop by Category Section */}
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

            {/* All Products Section */}
            <StoreSection title={selectedStoreCategory === 'الكل' ? "جميع إبداعات المتجر" : `إبداعات من فئة: ${selectedStoreCategory}`} icon={ShoppingBag} accentColor={storeData.accentColor}>
                {filteredProducts && filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                        <StoreProductCard key={product.id} product={product} accentColor={storeData.accentColor} />
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
    </div>
  );
}
