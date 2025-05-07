// src/app/products/[productId]/page.tsx
'use client';

import React, { useEffect, useState, useMemo, Suspense } from 'react';
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
  TagIcon as LucideTagIcon, // Renamed to avoid conflict
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
  Handshake,
  Plus,
  Minus,
  Paperclip,
  CheckCircle,
  Sparkles,
  Eye,
  MapPin, // Added MapPin
  Loader2 // Added Loader2
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from '@/lib/utils';
import { getProductById, getServiceById, getStoreDataById, type Product, type Service, type StoreData, type ProductType as ItemType } from '@/lib/data/mock-store-data';
import StoreSection from '@/components/store/store-section';
import StoreProductCard from '@/components/store/store-product-card';
import StoreServiceCard from '@/components/store/store-service-card';


type Item = Product | Service;

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId as string;

  const [item, setItem] = useState<Item | null>(null);
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
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
      description: `تم ${actionText.toLowerCase()} بنجاح ${selectedItem.type === 'بيع' ? ` (الكمية: ${quantity})` : ''} (محاكاة)!`,
      action: <Button variant="outline" size="sm" onClick={() => router.push(selectedItem.type === 'بيع' ? '/cart' : '/dashboard/orders')}>متابعة</Button>,
    });
  };

   const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };
  
  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
             <Skeleton className="aspect-square md:h-[500px] rounded-lg" />
             <div className="grid grid-cols-5 gap-2">
                {Array.from({length: 5}).map((_, i) => <Skeleton key={i} className="aspect-square rounded"/>)}
             </div>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-12 w-4/5" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-5 w-1/4" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-1/3" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-10 w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!item || !storeData) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold text-destructive mb-2">خطأ في تحميل العنصر</h1>
        <p className="text-lg text-muted-foreground mb-6">
          عذرًا، العنصر الذي تبحثين عنه أو متجره غير متوفر حاليًا.
        </p>
        <Button variant="outline" onClick={() => router.push('/products')} className="text-lg px-6 py-3">
          <ChevronLeft className="w-5 h-5 ml-2" /> العودة لصفحة المنتجات
        </Button>
      </div>
    );
  }
  
  const itemImages = (item as Product).images || [(item as Product).imageSrc || (item as Service).imageSrc || 'https://picsum.photos/800/600?grayscale'];

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Button variant="outline" size="sm" className="mb-8 group" onClick={() => router.back()}>
            <ChevronLeft size={16} className="ml-1 transition-transform group-hover:-translate-x-1"/>
            العودة
        </Button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="space-y-4">
                 <div className="relative shadow-xl rounded-xl overflow-hidden group border border-border">
                    <Carousel 
                        opts={{ loop: itemImages.length > 1, startIndex: selectedImageIndex }} 
                        className="w-full aspect-square md:min-h-[450px]"
                    >
                        <CarouselContent>
                        {itemImages.map((imgSrc, index) => (
                            <CarouselItem key={index}>
                            <div className="relative aspect-square md:h-[450px]">
                                <Image
                                    src={imgSrc}
                                    alt={`${item.name} - صورة ${index + 1}`}
                                    fill
                                    className="object-contain rounded-lg"
                                    data-ai-hint={item.dataAiHint || 'product image'}
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
                {itemImages.length > 1 && (
                    <div className="grid grid-cols-5 gap-2">
                        {itemImages.map((imgSrc, index) => (
                            <button 
                                key={`thumb-${index}`} 
                                onClick={() => handleThumbnailClick(index)}
                                className={cn(
                                    "aspect-square rounded-md overflow-hidden border-2 transition-all", 
                                    selectedImageIndex === index ? 'border-primary ring-2 ring-primary/50 ring-offset-2' : 'border-transparent hover:border-muted-foreground/50'
                                )}
                                aria-label={`عرض الصورة ${index + 1}`}
                            >
                                <Image 
                                    src={imgSrc} 
                                    alt={`صورة مصغرة ${index + 1}`} 
                                    width={80} 
                                    height={80} 
                                    className="object-cover w-full h-full"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="space-y-6">
                <Card className="shadow-xl border-primary/20 overflow-hidden">
                    <CardHeader className="bg-gradient-to-br from-card via-secondary/10 to-card pb-4">
                        <div className="flex justify-between items-start gap-2">
                            <div>
                                <Badge variant="outline" className="mb-2 capitalize text-xs px-2 py-0.5" style={{borderColor: storeAccentColor, color: storeAccentColor}}>
                                    {item.type} / {item.category}
                                </Badge>
                                <CardTitle className="text-3xl lg:text-4xl font-bold" style={{color: storeAccentColor}}>
                                    {item.name}
                                </CardTitle>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <Button variant="ghost" size="icon" className="text-destructive/70 hover:text-destructive h-8 w-8" title="أضف إلى المفضلة">
                                    <Heart className="w-5 h-5"/>
                                </Button>
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary h-8 w-8" title="مشاركة">
                                    <Share2 className="w-5 h-5"/>
                                </Button>
                            </div>
                        </div>
                        <Link href={`/store/${storeData.id}`} className="flex items-center gap-2 pt-3 group">
                            <Avatar className="h-10 w-10 border-2" style={{borderColor: storeAccentColor}}>
                                <AvatarImage src={storeData.sellerAvatar} alt={storeData.sellerName} data-ai-hint={storeData.dataAiHintSellerAvatar}/>
                                <AvatarFallback>{storeData.sellerName.substring(0,1)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <span className="text-sm font-medium text-primary group-hover:underline">{storeData.sellerName}</span>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Star size={12} className="fill-current text-accent-yellow"/> {storeData.rating.toFixed(1)} ({storeData.reviewsCount} تقييم للمتجر)
                                </div>
                            </div>
                        </Link>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-5">
                        <p className="text-base text-foreground/85 leading-relaxed whitespace-pre-line">
                            {item.longDescription || item.description}
                        </p>
                        
                        {item.type === 'بيع' && (item as Product).preparationTime && (
                            <Badge variant="secondary"><Clock size={14} className="ml-1"/> وقت التجهيز: {(item as Product).preparationTime}</Badge>
                        )}
                        {item.type === 'إيجار' && (item as Product).rentalTerms && (
                            <div className="text-sm text-muted-foreground space-y-1 border-l-2 pl-3 py-1" style={{borderColor: storeAccentColor}}>
                                <p className="font-medium text-foreground" style={{color: storeAccentColor}}>شروط الإيجار:</p>
                                {(item as Product).rentalTerms?.minDuration && <p><CalendarDays size={14} className="inline ml-1"/> أقل مدة: {(item as Product).rentalTerms?.minDuration}</p>}
                                {(item as Product).rentalTerms?.deposit && <p><DollarSign size={14} className="inline ml-1"/> التأمين: {(item as Product).rentalTerms?.deposit}</p>}
                            </div>
                        )}
                         {item.type === 'خدمة' && (
                             <div className="text-sm text-muted-foreground space-y-1 border-l-2 pl-3 py-1" style={{borderColor: storeAccentColor}}>
                                <p className="font-medium text-foreground" style={{color: storeAccentColor}}>تفاصيل الخدمة:</p>
                                {(item as Service).duration && <p><Clock size={14} className="inline ml-1"/> المدة: {(item as Service).duration}</p>}
                                {(item as Service).location && <p><MapPin size={14} className="inline ml-1"/> المكان: {(item as Service).location}</p>}
                             </div>
                         )}
                        
                        {(item as Product | Service).tags && (item as Product | Service).tags!.length > 0 && (
                            <div className="mt-3">
                                <p className="text-sm font-medium mb-1.5" style={{color: storeAccentColor}}>كلمات مفتاحية:</p>
                                <div className="flex flex-wrap gap-1.5">
                                {(item as Product | Service).tags!.map(tag => <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0.5">{tag}</Badge>)}
                                </div>
                            </div>
                        )}
                        
                        <Separator className="my-5"/>

                        <div className="space-y-4">
                            <p className="text-4xl font-extrabold text-center md:text-right" style={{color: storeAccentColor}}>
                                {item.price}
                            </p>
                            {item.type === 'بيع' && (
                                <div className="flex items-center justify-center md:justify-start gap-3">
                                    <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                                        <Minus className="h-4 w-4"/>
                                    </Button>
                                    <span className="text-lg font-semibold w-10 text-center">{quantity}</span>
                                    <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)}>
                                        <Plus className="h-4 w-4"/>
                                    </Button>
                                    <span className="text-sm text-muted-foreground mr-auto">
                                        {(item as Product).availability === 'متوفر' ? 
                                            <span className="text-green-600 flex items-center"><CheckCircle size={16} className="ml-1"/>متوفر</span> : 
                                            <span className="text-red-600 flex items-center"><AlertCircle size={16} className="ml-1"/>{(item as Product).availability || 'غير متوفر'}</span>
                                        }
                                    </span>
                                </div>
                            )}
                            <Button 
                                size="lg" 
                                className="w-full text-lg py-6 px-8 shadow-lg text-white hover:opacity-90 transition-opacity"
                                style={{backgroundColor: storeAccentColor}}
                                onClick={() => handlePrimaryAction(item)}
                                disabled={(item as Product).availability === 'نفذ المخزون'}
                            >
                                {item.type === 'بيع' && <ShoppingBasket size={22} className="ml-2" />}
                                {item.type === 'إيجار' && <CalendarDays size={22} className="ml-2" />}
                                {item.type === 'خدمة' && <Handshake size={22} className="ml-2" />}
                                {(item as Product).availability === 'نفذ المخزون' ? 'غير متوفر حاليًا' :
                                 item.type === 'بيع' ? 'أضيفي إلى السلة' :
                                 item.type === 'إيجار' ? 'احجزي الآن' :
                                 'احجزي/استفسري عن الخدمة'
                                }
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                 <Card className="shadow-md border-secondary/50">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2" style={{color: storeAccentColor}}>
                           <Store size={20}/> معلومات المتجر والشحن
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-foreground/80">
                         <Button variant="outline" size="sm" className="w-full mb-2" asChild>
                             <Link href={`/store/${storeData.id}`}> <Eye size={16} className="ml-2"/> زيارة متجر {storeData.name} </Link>
                        </Button>
                        {storeData.policies?.shippingPolicy && (
                            <div className="flex items-start gap-2">
                                <Truck size={16} className="mt-0.5 text-blue-500 flex-shrink-0"/>
                                <p><span className="font-medium">سياسة الشحن:</span> {storeData.policies.shippingPolicy.substring(0, 100)}{storeData.policies.shippingPolicy.length > 100 ? '...' : ''}</p>
                            </div>
                        )}
                         {storeData.policies?.returnPolicy && (
                            <div className="flex items-start gap-2">
                                <ShieldCheck size={16} className="mt-0.5 text-green-500 flex-shrink-0"/>
                                <p><span className="font-medium">سياسة الإرجاع:</span> {storeData.policies.returnPolicy.substring(0, 100)}{storeData.policies.returnPolicy.length > 100 ? '...' : ''}</p>
                            </div>
                        )}
                        {storeData.contact.email && (
                             <div className="flex items-start gap-2">
                                <MessageSquare size={16} className="mt-0.5 text-purple-500 flex-shrink-0"/>
                                <p><span className="font-medium">للتواصل:</span> {storeData.contact.email}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
        
        <StoreSection id="related-items" title="قد يعجبك أيضاً من نفس المتجر" icon={Sparkles} accentColor={storeAccentColor} className="mt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {storeData.products.filter(p => p.id !== item.id && p.category === item.category).slice(0, 4).map(relatedItem => (
                 <StoreProductCard key={relatedItem.id} product={relatedItem as Product} accentColor={storeAccentColor} onViewDetails={() => router.push(`/products/${relatedItem.id}`)} />
              ))}
               {storeData.services && storeData.services.filter(s => s.id !== item.id && s.category === item.category).slice(0, 4).map(relatedItem => (
                 <StoreServiceCard key={relatedItem.id} service={relatedItem as Service} accentColor={storeAccentColor} onViewDetails={() => router.push(`/products/${relatedItem.id}`)} />
              ))}
            </div>
             {(storeData.products.filter(p => p.id !== item.id && p.category === item.category).length === 0 && (!storeData.services || storeData.services.filter(s => s.id !== item.id && s.category === item.category).length === 0)) && (
                 <p className="text-muted-foreground text-center py-4">لا توجد عناصر مشابهة من هذا المتجر حالياً.</p>
            )}
        </StoreSection>
    </div>
  );
}
