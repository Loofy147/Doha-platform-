// src/app/store/[storeId]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Star, MessageSquare, Info, MapPin, Phone, Heart, Share2, Mail } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageSrc: string;
  dataAiHint: string;
  category: string;
}

interface StoreData {
  id: string;
  name: string;
  slug: string;
  slogan?: string;
  story?: string;
  logoSrc: string;
  dataAiHintLogo: string;
  bannerSrc: string;
  dataAiHintBanner: string;
  category: string;
  products: Product[];
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
  };
  accentColor?: string; // e.g., 'hsl(var(--accent-pink))'
}

const mockStoreDetails: Record<string, StoreData> = {
  'my-mock-store': {
    id: 'store123',
    name: 'متجر لمسات ضحى الإبداعية',
    slug: 'my-mock-store',
    slogan: 'حيث يلتقي الإبداع بالأصالة',
    story: 'بدأت رحلتي بشغف صغير في تحويل المواد البسيطة إلى قطع فنية فريدة. كل قطعة في متجري تحمل جزءًا من قلبي وقصتي. أهدف إلى إدخال البهجة والجمال إلى منازلكم من خلال إبداعاتي.',
    logoSrc: 'https://picsum.photos/seed/lamsalogo/100/100',
    dataAiHintLogo: 'creative logo',
    bannerSrc: 'https://picsum.photos/seed/lamsabanner/1200/400',
    dataAiHintBanner: 'crafts workspace',
    category: 'حرف يدوية إبداعية',
    products: [
      { id: 'p1', name: 'أقراط فضية مرصعة بالفيروز', description: 'أقراط أنيقة مصنوعة يدوياً.', price: '3,500 دج', imageSrc: 'https://picsum.photos/seed/earrings/300/300', dataAiHint: 'silver earrings', category: 'مجوهرات' },
      { id: 'p2', name: 'لوحة زيتية "ألوان الربيع"', description: 'لوحة تجريدية تضفي الحياة على أي جدار.', price: '12,000 دج', imageSrc: 'https://picsum.photos/seed/painting/300/300', dataAiHint: 'oil painting', category: 'فن وديكور' },
      { id: 'p3', name: 'مجموعة شموع عطرية يدوية', description: 'شموع طبيعية بروائح آسرة.', price: '2,200 دج', imageSrc: 'https://picsum.photos/seed/candles/300/300', dataAiHint: 'scented candles', category: 'ديكور منزلي' },
      { id: 'p4', name: 'كوب سيراميك مزخرف', description: 'كوب فريد بتصميم يدوي.', price: '1,800 دج', imageSrc: 'https://picsum.photos/seed/mug/300/300', dataAiHint: 'ceramic mug', category: 'أدوات منزلية' },
    ],
    contactEmail: 'contact@lamsatdoha.com',
    contactPhone: '+213 555 123 456',
    address: '123 شارع الإبداع، الجزائر العاصمة',
    socialMedia: { instagram: 'lamsat_doha', facebook: 'LamsaDohaCreations' },
    accentColor: 'hsl(var(--accent-pink))'
  },
  'lamsa-ibdaa': { 
    id: 'store-lamsa-ibdaa',
    name: 'لمسة إبداع',
    slug: 'lamsa-ibdaa',
    slogan: 'فن يروي حكايات',
    story: 'كل قطعة هي بصمة من شغفي بالفن اليدوي. أقدم لكم إبداعات مصنوعة بحب وإتقان لتزين حياتكم بلمسات فنية راقية.',
    logoSrc: 'https://picsum.photos/seed/lamsaibdaa_logo/100/100',
    dataAiHintLogo: 'artistic brand logo',
    bannerSrc: 'https://picsum.photos/seed/lamsaibdaa_banner/1200/400',
    dataAiHintBanner: 'handmade art crafts',
    category: 'مشغولات يدوية فنية',
    products: [
      { id: 'li_p1', name: 'حقيبة جلد مطرزة باليد', description: 'حقيبة جلدية فاخرة بتطريز يدوي دقيق، مثالية لإطلالة متميزة.', price: '7,200 دج', imageSrc: 'https://picsum.photos/seed/leatherbagstitch/300/300', dataAiHint: 'stitched leather bag', category: 'إكسسوارات فاخرة' },
      { id: 'li_p2', name: 'مجموعة فخاريات مزخرفة يدويًا', description: 'أواني فخارية فريدة مرسومة بألوان زاهية لتزيين منزلك.', price: '4,800 دج', imageSrc: 'https://picsum.photos/seed/decoratedpottery/300/300', dataAiHint: 'decorated pottery set', category: 'ديكور منزلي فني' },
      { id: 'li_p3', name: 'وشاح حرير مصبوغ طبيعيًا', description: 'وشاح حريري ناعم مصبوغ بألوان طبيعية مستخلصة من النباتات.', price: '3,500 دج', imageSrc: 'https://picsum.photos/seed/silkscarfnatural/300/300', dataAiHint: 'natural silk scarf', category: 'أزياء مستدامة' },
    ],
    contactEmail: 'lamsa.ibdaa@lamsadoha.com',
    contactPhone: '+213 555 987 654',
    address: 'ورشة الإبداع، حي الفنانين، وهران',
    socialMedia: { instagram: 'LamsaIbdaaOfficial', facebook: 'LamsaIbdaaPage' },
    accentColor: 'hsl(var(--accent-purple))'
  },
  'mathaq-albayt': { 
    id: 'store-mathaq-albayt',
    name: 'مذاق البيت',
    slug: 'mathaq-albayt',
    slogan: 'أشهى الحلويات المنزلية الأصيلة',
    story: 'في "مذاق البيت"، نصنع حلوياتنا بكل حب وشغف، مستخدمين مكونات طازجة ووصفات عائلية توارثناها عبر الأجيال، لتستمتعوا بمذاق لا يُنسى يذكركم بدفء المنزل.',
    logoSrc: 'https://picsum.photos/seed/mathaqlogo/100/100',
    dataAiHintLogo: 'bakery brand logo',
    bannerSrc: 'https://picsum.photos/seed/mathaqbanner/1200/400',
    dataAiHintBanner: 'homemade sweets display',
    category: 'حلويات ومأكولات منزلية',
    products: [
      { id: 'ma_p1', name: 'كيكة العسل الروسية التقليدية', description: 'طبقات هشة من عجين العسل مع كريمة الزبدة الغنية، تجربة لا تقاوم.', price: '3,000 دج', imageSrc: 'https://picsum.photos/seed/russianhoneycake/300/300', dataAiHint: 'russian honey cake', category: 'كيك عالمي' },
      { id: 'ma_p2', name: 'معمول التمر الفاخر المحشو بالجوز', description: 'معمول هش يذوب في الفم، بحشوة التمر الغنية وقطع الجوز المقرمشة.', price: '1,500 دج / للعلبة (12 قطعة)', imageSrc: 'https://picsum.photos/seed/maamouldateswalnuts/300/300', dataAiHint: 'maamoul dates walnuts', category: 'حلويات شرقية تقليدية' },
      { id: 'ma_p3', name: 'بقلاوة بالفستق الحلبي والعسل', description: 'طبقات رقيقة من العجين الذهبي محشوة بالفستق الحلبي الفاخر ومسقاة بالعسل الطبيعي.', price: '2,800 دج / للكيلو', imageSrc: 'https://picsum.photos/seed/pistachiobaklava/300/300', dataAiHint: 'pistachio baklava honey', category: 'حلويات شرقية فاخرة' },
    ],
    contactEmail: 'mathaq.albayt@lamsadoha.com',
    contactPhone: '+213 555 654 321',
    address: 'مطبخ مذاق البيت، شارع الحلويات، قسنطينة',
    socialMedia: { instagram: 'MathaqAlbaytSweets', facebook: 'MathaqAlbaytBakery' },
    accentColor: 'hsl(var(--accent-yellow))'
  },
  'anaqa-lilijar': { 
    id: 'store-anaqa-lilijar',
    name: 'أناقة للإيجار',
    slug: 'anaqa-lilijar',
    slogan: 'تألقي في كل مناسبة بأجمل الفساتين',
    story: 'في "أناقة للإيجار"، نؤمن بأن كل امرأة تستحق أن تشعر بالجمال والثقة في مناسباتها الخاصة. نوفر لكِ تشكيلة واسعة من فساتين السهرة الراقية بتصاميم عصرية وجودة عالية، لتكوني نجمة كل حفل دون الحاجة لشراء فستان جديد في كل مرة.',
    logoSrc: 'https://picsum.photos/seed/anaqalogo/100/100',
    dataAiHintLogo: 'fashion rental brand',
    bannerSrc: 'https://picsum.photos/seed/anaqabanner/1200/400',
    dataAiHintBanner: 'evening dresses rack',
    category: 'تأجير فساتين سهرة',
    products: [
      { id: 'an_p1', name: 'فستان سهرة ذهبي مطرز بالكريستال', description: 'فستان طويل بقصة حورية البحر، مطرز بالكامل بكريستالات سواروفسكي، مثالي للمناسبات الكبرى.', price: '10,000 دج / لليلة', imageSrc: 'https://picsum.photos/seed/goldcrystaldress/300/300', dataAiHint: 'gold crystal dress', category: 'فساتين سهرة فاخرة' },
      { id: 'an_p2', name: 'فستان كوكتيل أحمر قصير من الدانتيل', description: 'فستان أنيق ومميز من الدانتيل الأحمر، مثالي للمناسبات النهارية والمسائية وحفلات الكوكتيل.', price: '5,000 دج / لليلة', imageSrc: 'https://picsum.photos/seed/redlacedress/300/300', dataAiHint: 'red lace cocktail dress', category: 'فساتين قصيرة للمناسبات' },
      { id: 'an_p3', name: 'فستان أميرات منفوش باللون الأزرق السماوي', description: 'فستان ساحر بقصة الأميرات وتنورة منفوشة، يجعلكِ تشعرين وكأنكِ في حكاية خيالية.', price: '8,500 دج / لليلة', imageSrc: 'https://picsum.photos/seed/blueprincessdress/300/300', dataAiHint: 'blue princess dress', category: 'فساتين حفلات زفاف' },
    ],
    contactEmail: 'anaqa.lilijar@lamsadoha.com',
    contactPhone: '+213 555 111 222',
    address: 'بوتيك أناقة، شارع الموضة، سطيف',
    socialMedia: { instagram: 'AnaqaLilijar', facebook: 'AnaqaDressRental' },
    accentColor: 'hsl(330 65% 60%)' // A vibrant pink, can be adjusted
  }
};


export default function StorePage() {
  const params = useParams();
  const storeId = params.storeId as string;
  const { toast } = useToast();

  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (storeId) {
      setIsLoading(true);
      // Simulate fetching store data
      setTimeout(() => {
        const data = mockStoreDetails[storeId];
        if (data) {
          setStoreData(data);
        } else {
          // Handle store not found, perhaps redirect or show a message
          toast({ title: "خطأ", description: `لم يتم العثور على المتجر ${storeId}`, variant: "destructive" });
        }
        setIsLoading(false);
      }, 1000);
    }
  }, [storeId, toast]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Skeleton className="h-48 w-full rounded-lg mb-8" /> {/* Banner Skeleton */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3 space-y-6">
                <Skeleton className="h-32 w-32 rounded-full mx-auto md:mx-0" /> {/* Logo Skeleton */}
                <Skeleton className="h-8 w-3/4 mx-auto md:mx-0" /> {/* Name Skeleton */}
                <Skeleton className="h-6 w-1/2 mx-auto md:mx-0" /> {/* Slogan Skeleton */}
                <Skeleton className="h-20 w-full" /> {/* About Skeleton */}
            </div>
            <div className="w-full md:w-2/3">
                <Skeleton className="h-10 w-1/3 mb-6" /> {/* Products Title Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1,2,3,4].map(i => <Skeleton key={i} className="h-64 w-full rounded-lg"/>)}
                </div>
            </div>
        </div>
      </div>
    );
  }

  if (!storeData) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <ShoppingBag size={64} className="mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-semibold text-destructive">المتجر غير موجود</h1>
        <p className="text-muted-foreground mt-2">عذرًا، لا يمكننا العثور على المتجر الذي تبحثين عنه.</p>
        <Button asChild className="mt-6">
          <Link href="/products">العودة إلى تصفح المنتجات</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 min-h-screen">
      {/* Store Banner */}
      <div className="relative h-48 md:h-64 w-full group overflow-hidden">
        <Image 
          src={storeData.bannerSrc} 
          alt={`${storeData.name} Banner`} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          data-ai-hint={storeData.dataAiHintBanner} 
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Store Header and Logo */}
        <div className="relative -mt-16 md:-mt-20 z-10 flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 p-4 bg-card shadow-xl rounded-lg border border-primary/20 mb-10">
          <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-white shadow-lg" style={{borderColor: storeData.accentColor || 'hsl(var(--primary))'}}>
            <AvatarImage src={storeData.logoSrc} alt={`${storeData.name} Logo`} data-ai-hint={storeData.dataAiHintLogo} />
            <AvatarFallback>{storeData.name.substring(0,2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-right pt-2 md:pt-0">
            <h1 className="text-3xl md:text-4xl font-bold text-primary" style={{color: storeData.accentColor || 'hsl(var(--primary))'}}>{storeData.name}</h1>
            {storeData.slogan && <p className="text-md text-muted-foreground mt-1">{storeData.slogan}</p>}
            <Badge variant="outline" className="mt-2 capitalize border-primary/50 text-primary/80" style={{borderColor: storeData.accentColor ? `${storeData.accentColor}80` : 'hsl(var(--primary)/0.5)', color: storeData.accentColor ? `${storeData.accentColor}CC` : 'hsl(var(--primary)/0.8)'}}>
              {storeData.category}
            </Badge>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="icon" title="إضافة للمفضلة (قيد التطوير)">
              <Heart className="h-5 w-5 text-accent-pink" />
            </Button>
            <Button variant="outline" size="icon" title="مشاركة المتجر (قيد التطوير)">
              <Share2 className="h-5 w-5 text-accent-purple" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar/Store Info */}
          <aside className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center"><Info size={20} className="ml-2 text-accent-pink"/> عن المتجر</CardTitle>
              </CardHeader>
              <CardContent>
                {storeData.story ? (
                  <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">{storeData.story}</p>
                ) : (
                  <p className="text-muted-foreground">لم تقدم المبدعة وصفًا لمتجرها بعد.</p>
                )}
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center"><MessageSquare size={20} className="ml-2 text-accent-purple"/> تواصلي مع المبدعة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    {storeData.contactEmail && <p className="flex items-center gap-2"><Mail size={16} className="text-muted-foreground"/> <a href={`mailto:${storeData.contactEmail}`} className="hover:text-primary transition-colors">{storeData.contactEmail}</a></p>}
                    {storeData.contactPhone && <p className="flex items-center gap-2"><Phone size={16} className="text-muted-foreground"/> <a href={`tel:${storeData.contactPhone}`} className="hover:text-primary transition-colors">{storeData.contactPhone}</a></p>}
                    {storeData.address && <p className="flex items-center gap-2"><MapPin size={16} className="text-muted-foreground"/> {storeData.address}</p>}
                    {storeData.socialMedia?.instagram && <p className="flex items-center gap-2"><Info size={16} className="text-muted-foreground"/> إنستغرام: <a href={`https://instagram.com/${storeData.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">@{storeData.socialMedia.instagram}</a></p>}
                     <Button className="w-full mt-4 bg-primary hover:bg-primary/90">إرسال رسالة عبر المنصة (قيد التطوير)</Button>
                </CardContent>
            </Card>
            
            {/* Placeholder for store policies, ratings, etc. */}
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center"><Star size={20} className="ml-2 text-accent-yellow"/> تقييمات المتجر</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center py-4">لا توجد تقييمات بعد (قيد التطوير).</p>
                </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-primary mb-6">منتجات وخدمات المتجر</h2>
            {storeData.products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {storeData.products.map(product => (
                  <Card key={product.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col group">
                    <CardHeader className="p-0 relative aspect-square">
                        <Image src={product.imageSrc} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" data-ai-hint={product.dataAiHint} />
                        <Badge className="absolute top-2 right-2 bg-accent-pink text-accent-pink-foreground shadow-md">{product.category}</Badge>
                    </CardHeader>
                    <CardContent className="p-4 flex-grow flex flex-col">
                      <CardTitle className="text-lg font-semibold text-primary mb-1 group-hover:text-accent-pink transition-colors">{product.name}</CardTitle>
                      <CardDescription className="text-xs text-muted-foreground flex-grow mb-2">{product.description}</CardDescription>
                      <p className="text-xl font-bold mt-auto" style={{color: storeData.accentColor || 'hsl(var(--accent-pink))'}}>{product.price}</p>
                    </CardContent>
                    <CardFooter className="p-3 border-t">
                      <Button variant="outline" className="w-full hover:bg-accent-yellow/10 hover:border-accent-yellow hover:text-accent-yellow transition-colors">
                        <ShoppingBag size={16} className="ml-2"/> عرض التفاصيل (قيد التطوير)
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-lg shadow">
                <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-primary">لا توجد منتجات أو خدمات لعرضها حاليًا</h3>
                <p className="text-foreground/70 mt-2">هذه المبدعة لم تقم بإضافة أي عناصر لمتجرها بعد. عاودي التحقق قريبًا!</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

