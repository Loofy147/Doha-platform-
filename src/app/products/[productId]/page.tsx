// src/app/products/[productId]/page.tsx
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ShoppingBasket,
  Star,
  MessageSquare,
  ChevronLeft,
  TagIcon,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  Clock,
  Info,
  AlertCircle,
  Store,
  DollarSign,
  CalendarDays,
  Handshake
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from '@/lib/utils';
import { getProductById, getServiceById, getStoreDataById, type Product, type Service, type StoreData } from '@/lib/data/mock-store-data';

type Item = Product | Service;

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId as string; // Can be product or service ID

  const [item, setItem] = useState<Item | null>(null);
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      // Simulate fetching item details. In a real app, this would be an API call.
      // We need to determine if it's a product or service to fetch correctly.
      // For now, we'll try fetching as product, then as service if not found.
      setTimeout(() => {
        let foundItem: Item | undefined = getProductById(productId);
        if (!foundItem) {
          foundItem = getServiceById(productId);
        }
        
        if (foundItem) {
          setItem(foundItem);
          const relatedStore = getStoreDataById(foundItem.sellerId);
          setStoreData(relatedStore || null);
        } else {
          setItem(null);
          setStoreData(null);
        }
        setIsLoading(false);
      }, 700);
    }
  }, [productId]);

  const storeAccentColor = useMemo(() => storeData?.accentColor || 'hsl(var(--primary))', [storeData]);

  const handlePrimaryAction = (selectedItem: Item) => {
    const actionText = selectedItem.type === 'بيع' ? 'أضيف للسلة' : selectedItem.type === 'إيجار' ? 'احجزي الآن' : 'استفسري/احجزي الخدمة';
    toast({
      title: `🛍️ ${selectedItem.name}`,
      description: `تم ${actionText.toLowerCase()} بنجاح (محاكاة)!`,
      action: <Button variant="outline" size="sm" onClick={() => { /* navigate to cart/booking */ }}>متابعة</Button>,
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <Skeleton className="aspect-square md:aspect-auto md:h-[500px] rounded-lg" />
          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-5 w-1/4" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold text-destructive mb-2">لم يتم العثور على المنتج أو الخدمة</h1>
        <p className="text-lg text-muted-foreground mb-6">
          عذرًا، العنصر الذي تبحثين عنه غير متوفر حاليًا أو قد يكون الرابط غير صحيح.
        </p>
        <Button variant="outline" onClick={() => router.push('/products')} className="text-lg px-6 py-3">
          <ChevronLeft className="w-5 h-5 ml-2" /> العودة لصفحة المنتجات
        </Button>
      </div>
    );
  }
  
  const itemImages = (item as Product).images || [(item as Product).imageSrc || (item as Service).imageSrc || 'https://picsum.photos/800/600'];

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Button variant="outline" size="sm" className="mb-8 group" onClick={() => router.back()}>
            <ChevronLeft size={16} className="ml-1 transition-transform group-hover:-translate-x-1"/>
            العودة
        </Button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Image Gallery */}
            <div className="relative shadow-xl rounded-xl overflow-hidden group">
                <Carousel 
                    opts={{ loop: itemImages.length > 1 }} 
                    className="w-full aspect-square md:aspect-auto md:min-h-[500px]"
                >
                    <CarouselContent>
                    {itemImages.map((imgSrc, index) => (
                        <CarouselItem key={index}>
                        <div className="relative aspect-square md:h-[500px]">
                            <Image
                                src={imgSrc}
                                alt={`${item.name} - صورة ${index + 1}`}
                                fill
                                className="object-cover rounded-lg"
                                data-ai-hint={item.dataAiHint}
                                priority={index === 0}
                            />
                        </div>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                    {itemImages.length > 1 && (
                    <>
                        <CarouselPrevious className="absolute left-3 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-card/70 hover:bg-card" />
                        <CarouselNext className="absolute right-3 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-card/70 hover:bg-card" />
                    </>
                    )}
                </Carousel>
            </div>

            {/* Product/Service Details */}
            <div className="space-y-6">
                <Card className="shadow-xl border-primary/20">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <Badge variant="outline" className="mb-2" style={{borderColor: storeAccentColor, color: storeAccentColor}}>
                                    {item.category}
                                </Badge>
                                <CardTitle className="text-3xl lg:text-4xl font-bold" style={{color: storeAccentColor}}>
                                    {item.name}
                                </CardTitle>
                            </div>
                             <Button variant="ghost" size="icon" className="text-destructive/70 hover:text-destructive" title="أضف إلى المفضلة">
                                <Heart className="w-6 h-6"/>
                            </Button>
                        </div>
                        {storeData && (
                            <Link href={`/store/${storeData.id}`} className="flex items-center gap-2 mt-2 group">
                                <Avatar className="h-8 w-8 border-2" style={{borderColor: storeAccentColor}}>
                                    <AvatarImage src={storeData.sellerAvatar} alt={storeData.sellerName} data-ai-hint={storeData.dataAiHintSellerAvatar}/>
                                    <AvatarFallback>{storeData.sellerName.substring(0,1)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">مقدم من: {storeData.sellerName}</span>
                            </Link>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                            {item.longDescription || item.description}
                        </p>
                        
                        {item.type === 'بيع' && (item as Product).averageRating && (
                            <div className="flex items-center gap-2">
                                {Array.from({length: 5}).map((_, i) => (
                                    <Star key={i} size={20} className={i < Math.round((item as Product).averageRating || 0) ? 'fill-current' : ''} style={{color: storeAccentColor}}/>
                                ))}
                                <span className="text-sm text-muted-foreground">({(item as Product).reviewCount} تقييمات)</span>
                            </div>
                        )}

                        {item.type === 'خدمة' && (item as Service).duration && (
                            <p className="text-sm text-muted-foreground flex items-center"><Clock size={16} className="ml-2 text-primary"/>المدة: {(item as Service).duration}</p>
                        )}
                        {item.type === 'خدمة' && (item as Service).location && (
                            <p className="text-sm text-muted-foreground flex items-center"><MapPin size={16} className="ml-2 text-primary"/>المكان: {(item as Service).location}</p>
                        )}
                         {item.type === 'بيع' && (item as Product).preparationTime && (
                            <p className="text-sm text-muted-foreground flex items-center"><Clock size={16} className="ml-2 text-primary"/>وقت التجهيز: {(item as Product).preparationTime}</p>
                        )}
                        {item.type === 'إيجار' && (item as Product).rentalTerms && (
                            <div className="text-sm text-muted-foreground space-y-1">
                                {(item as Product).rentalTerms?.minDuration && <p>أقل مدة للإيجار: {(item as Product).rentalTerms?.minDuration}</p>}
                                {(item as Product).rentalTerms?.deposit && <p>مبلغ التأمين: {(item as Product).rentalTerms?.deposit}</p>}
                            </div>
                        )}

                        {(item as Product | Service).tags && (item as Product | Service).tags!.length > 0 && (
                        <div className="mt-4">
                            <p className="text-sm font-medium mb-1.5" style={{color: storeAccentColor}}>كلمات مفتاحية:</p>
                            <div className="flex flex-wrap gap-2">
                            {(item as Product | Service).tags!.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                            </div>
                        </div>
                        )}
                        
                        <Separator className="my-6"/>

                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                             <p className="text-4xl font-extrabold" style={{color: storeAccentColor}}>
                                {item.price}
                            </p>
                            <Button 
                                size="lg" 
                                className="w-full sm:w-auto text-lg py-6 px-8 shadow-lg text-white"
                                style={{backgroundColor: storeAccentColor}}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                                onClick={() => handlePrimaryAction(item)}
                            >
                                {item.type === 'بيع' && <ShoppingBasket size={22} className="ml-2" />}
                                {item.type === 'إيجار' && <CalendarDays size={22} className="ml-2" />}
                                {item.type === 'خدمة' && <Handshake size={22} className="ml-2" />}
                                {item.type === 'بيع' ? 'أضيفي إلى السلة' : item.type === 'إيجار' ? 'احجزي الآن' : 'احجزي/استفسري عن الخدمة'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Info Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg text-sm">
                        <ShieldCheck size={20} className="text-green-500"/> <span>جودة مضمونة</span>
                    </div>
                     <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg text-sm">
                        <Truck size={20} className="text-blue-500"/> <span>توصيل سريع وآمن</span>
                    </div>
                     <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg text-sm">
                        <MessageSquare size={20} className="text-purple-500"/> <span>دعم فني متاح</span>
                    </div>
                </div>

            </div>
        </div>
        
        {/* Related Products/Services Section (Placeholder) */}
        <StoreSection id="related-items" title="قد يعجبك أيضاً" icon={Sparkles} accentColor={storeAccentColor} className="mt-16">
            <p className="text-muted-foreground text-center">سيتم عرض المنتجات والخدمات ذات الصلة هنا (قيد التطوير).</p>
            {/* Placeholder for related items grid */}
        </StoreSection>
    </div>
  );
}
