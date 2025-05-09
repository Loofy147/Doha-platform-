
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
  LucideProps,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  Clock,
  Info,
  AlertCircle,
  Store as StoreIcon,
  DollarSign,
  CalendarDays,
  Handshake,
  Plus,
  Minus,
  Paperclip,
  CheckCircle,
  Sparkles,
  Eye,
  MapPin,
  Loader2,
  Percent,
  TagIcon,
  MessageCircle as ReviewIcon,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from '@/lib/utils';
import { getProductById, getServiceById, getStoreDataById, type Product, type Service, type StoreData, type ItemType as PublicItemType, type StoreType, type Review as StoreReview } from '@/lib/data/mock-store-data';
import StoreSection from '@/components/store/store-section';
import StoreProductCard from '@/components/store/store-product-card';
import StoreServiceCard from '@/components/store/store-service-card';
import { motion, type MotionProps } from 'framer-motion';
import { NotFound } from '@/components/layout/not-found';

type Item = Product | Service;

// Animation Variants
const pageEntryVariants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainerVariants: MotionProps = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const itemVariants: MotionProps = { 
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};


// Separate Loading component
const ProductDetailLoadingSkeleton = () => (
  <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <Skeleton className="h-8 w-32 mb-6 rounded-md" />
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div className="space-y-4">
          <Skeleton className="aspect-square md:h-[500px] rounded-xl" />
          <div className="grid grid-cols-5 gap-2">
            {Array.from({length: 5}).map((_, i) => <Skeleton key={i} className="aspect-square rounded-md"/>)}
          </div>
      </div>
      <div className="space-y-6">
        <Skeleton className="h-6 w-1/3 rounded" />
        <Skeleton className="h-12 w-4/5 rounded" />
        <Skeleton className="h-6 w-1/2 rounded" />
        <Skeleton className="h-5 w-1/4 rounded" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
        <Skeleton className="h-24 w-full rounded-lg" />
        <Skeleton className="h-12 w-1/3 rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-10 w-1/2 rounded-md" />
        <Skeleton className="h-10 w-1/2 rounded-md" />
      </div>
    </div>
     <StoreLoadingSkeleton />
     {/* Skeleton for Reviews */}
      <div className="mt-12">
        <Skeleton className="h-10 w-1/4 mb-4"/>
        <div className="space-y-4">
            <Skeleton className="h-24 w-full rounded-lg"/>
            <Skeleton className="h-20 w-full rounded-lg"/>
        </div>
      </div>
  </div>
);

const StoreLoadingSkeleton = () => (
    <div className="mt-16">
        <Skeleton className="h-10 w-1/3 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => (
            <Card key={`skel-related-${i}`} className="shadow-lg rounded-lg overflow-hidden">
              <Skeleton className="aspect-square w-full" />
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-6 w-1/3 mt-2" />
              </CardContent>
              <CardFooter className="p-3 border-t">
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
    </div>
);

const RatingStarsDisplay = ({ rating, size = 16 }: { rating: number, size?: number }) => (
  <div className="flex">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={size}
        className={cn(
          "transition-colors",
          i < Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        )}
      />
    ))}
  </div>
);

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId as string;

  const [item, setItem] = useState<Item | null>(null);
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { toast } = useToast();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Mock reviews for the current item
  const mockItemReviews: StoreReview[] = useMemo(() => {
    if (!item || !storeData) return [];
    return storeData.reviews?.filter(review => review.itemId === item.id).slice(0,3) || [
      { id: 'rev-mock1', authorName: 'عائشة م.', rating: 5, comment: 'منتج رائع وجودة عالية جداً! أنصح به بشدة.', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), itemId: item.id, storeId: storeData.id, authorAvatar: 'https://picsum.photos/seed/aisha-m/40/40', dataAiHintAvatar: 'woman happy avatar' },
      { id: 'rev-mock2', authorName: 'سارة خ.', rating: 4, comment: 'تجربة جيدة بشكل عام، المنتج وصل في الوقت المحدد وكان كما في الوصف.', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), itemId: item.id, storeId: storeData.id, authorAvatar: 'https://picsum.photos/seed/sara-kh/40/40', dataAiHintAvatar: 'woman avatar thoughtful'  },
    ];
  }, [item, storeData]);


  useEffect(() => {
    let isMounted = true;
    if (productId) {
      setIsLoading(true);
      setError(null);
      const timer = setTimeout(async () => {
        try {
          const fetchedItemData = getProductById(productId) || getServiceById(productId);
          
          // Correctly derive relatedStoreId
          // If item is from commonProducts, its sellerId might be a placeholder.
          // The storeId from the URL should be preferred if the item is part of that store.
          // For this mock setup, we assume the item's sellerId IS the storeId.
          const relatedStoreId = fetchedItemData?.sellerId;
          const fetchedStoreData = relatedStoreId ? getStoreDataById(relatedStoreId) : null;

          if (!isMounted) return;

          if (fetchedItemData) {
            setItem(fetchedItemData);
            if (fetchedStoreData) {
              setStoreData(fetchedStoreData);
            } else {
              setError(`تعذر العثور على المتجر المرتبط (ID: ${relatedStoreId}).`);
              setStoreData(null);
              console.warn(`Store data not found for ID: ${relatedStoreId}`);
            }
          } else {
            setError(`تعذر العثور على العنصر المطلوب (ID: ${productId}).`);
            setItem(null);
            setStoreData(null);
          }
        } catch (err) {
           if (!isMounted) return;
           console.error("Error fetching product details:", err);
           setError("حدث خطأ أثناء جلب تفاصيل العنصر. يرجى المحاولة مرة أخرى.");
           setItem(null);
           setStoreData(null);
        } finally {
          if (isMounted) setIsLoading(false);
        }
      }, 700);

      return () => {
        isMounted = false;
        clearTimeout(timer);
      };
    } else {
      setError("معرف العنصر غير متوفر.");
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    if (!api) return;
    setCurrentSlide(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
    });
    return () => {
      api.off("select", () => setCurrentSlide(api.selectedScrollSnap()));
    };
  }, [api]);

  const effectiveAccentColor = useMemo(() => storeData?.accentColor || 'hsl(var(--primary))', [storeData]);

  const handlePrimaryAction = async (selectedItem: Item) => {
    setIsAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsAddingToCart(false);

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
    api?.scrollTo(index);
  };


  if (isLoading) {
    return <ProductDetailLoadingSkeleton />;
  }

  if (error) {
     return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold text-destructive mb-2">خطأ في تحميل العنصر</h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-md">
          {error}
        </p>
        <Button variant="outline" onClick={() => router.push('/products')} className="text-lg px-6 py-3 border-primary text-primary hover:bg-primary/10">
          <ChevronLeft className="w-5 h-5 ml-2" /> العودة لصفحة المنتجات
        </Button>
      </div>
    );
  }

  if (!item) {
    return <NotFound title="العنصر غير موجود" message="عذرًا، العنصر الذي تبحثين عنه غير متوفر حاليًا." />;
  }

  if (!storeData) {
      return <NotFound title="المتجر غير موجود" message="عذرًا، المتجر المرتبط بهذا العنصر غير متوفر حاليًا." />;
  }


  const itemImages = (item as Product).images || [(item as Product).imageSrc || (item as Service).imageSrc || 'https://picsum.photos/800/600?grayscale'];

  const displayPrice = item.discountPercentage && parseInt(item.discountPercentage) > 0 && item.rawPrice
    ? (item.rawPrice * (1 - parseInt(item.discountPercentage) / 100)).toLocaleString() + ' دج'
    : item.price;

  const originalPriceDisplay = item.discountPercentage && parseInt(item.discountPercentage) > 0 && item.rawPrice
    ? item.rawPrice.toLocaleString() + ' دج'
    : null;


  return (
    <motion.div
        className="container mx-auto px-4 py-12 sm:px-6 lg:px-8"
        variants={pageEntryVariants}
        initial="initial"
        animate="animate"
    >
        <motion.div variants={itemVariants}>
            <Button variant="outline" size="sm" className="mb-8 group border-border hover:bg-muted/50" onClick={() => router.back()}>
                <ChevronLeft size={16} className="ml-1 transition-transform group-hover:-translate-x-1"/>
                العودة
            </Button>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start" variants={staggerContainerVariants}>
            <motion.div className="space-y-4" variants={itemVariants}>
                 <Carousel
                    setApi={setApi}
                    className="relative shadow-xl rounded-xl overflow-hidden group border border-border/50"
                    opts={{ loop: itemImages.length > 1 }}
                 >
                    <CarouselContent>
                        {itemImages.map((imgSrc, index) => (
                            <CarouselItem key={index}>
                                <div className="aspect-square md:min-h-[450px] relative">
                                    <Image
                                        src={imgSrc}
                                        alt={`${item.name} - صورة ${index + 1}`}
                                        fill
                                        className="object-contain rounded-lg p-2"
                                        data-ai-hint={item.dataAiHint || 'product image'}
                                        priority={index === 0}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                     {itemImages.length > 1 && (
                        <>
                            <CarouselPrevious
                                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-card/70 hover:bg-card w-8 h-8"
                                style={{color: effectiveAccentColor}}
                                aria-label="الصورة السابقة"
                            />
                            <CarouselNext
                                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-card/70 hover:bg-card w-8 h-8"
                                style={{color: effectiveAccentColor}}
                                aria-label="الصورة التالية"
                             />
                        </>
                     )}
                </Carousel>
                {itemImages.length > 1 && (
                    <div className="grid grid-cols-5 gap-2">
                        {itemImages.map((imgSrc, index) => (
                            <motion.button
                                key={`thumb-${index}`}
                                onClick={() => handleThumbnailClick(index)}
                                className={cn(
                                    "aspect-square rounded-md overflow-hidden border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
                                    currentSlide === index ? 'ring-2 ring-offset-2' : 'border-border/50 hover:border-muted-foreground/50'
                                )}
                                style={ currentSlide === index ? {borderColor: effectiveAccentColor, ringColor: `${effectiveAccentColor}80`} : {}}
                                aria-label={`عرض الصورة ${index + 1}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Image
                                    src={imgSrc}
                                    alt={`صورة مصغرة ${index + 1}`}
                                    width={80}
                                    height={80}
                                    className="object-cover w-full h-full"
                                />
                            </motion.button>
                        ))}
                    </div>
                )}
            </motion.div>

            <motion.div className="space-y-6" variants={staggerContainerVariants}>
                <motion.div variants={itemVariants}>
                    <Card className="shadow-xl border-primary/10 overflow-hidden">
                        <CardHeader className="bg-gradient-to-br from-card via-secondary/10 to-card pb-4">
                           <div className="flex justify-between items-start gap-2">
                                <div>
                                    <Badge variant="outline" className="mb-2 capitalize text-xs px-2 py-0.5" style={{borderColor: effectiveAccentColor, color: effectiveAccentColor}}>
                                        {item.type} / {item.category}
                                    </Badge>
                                    <CardTitle className="text-3xl lg:text-4xl font-bold" style={{color: effectiveAccentColor}}>
                                        {item.name}
                                    </CardTitle>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <Button variant="ghost" size="icon" className="text-destructive/70 hover:text-destructive h-8 w-8" title="أضف إلى المفضلة" aria-label="إضافة إلى المفضلة">
                                        <Heart className="w-5 h-5"/>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary h-8 w-8" title="مشاركة" aria-label="مشاركة المنتج">
                                        <Share2 className="w-5 h-5"/>
                                    </Button>
                                </div>
                           </div>
                           <Link href={`/store/${storeData.id}`} className="flex items-center gap-2 pt-3 group">
                                <Avatar className="h-10 w-10 border-2" style={{borderColor: effectiveAccentColor}}>
                                    <AvatarImage src={storeData.sellerAvatar} alt={storeData.sellerName} data-ai-hint={storeData.dataAiHintSellerAvatar}/>
                                    <AvatarFallback>{storeData.sellerName.substring(0,1)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <span className="text-sm font-medium text-primary group-hover:underline" style={{color: effectiveAccentColor}}>{storeData.sellerName}</span>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Star size={12} className="fill-current text-accent-yellow"/> {storeData.rating.toFixed(1)} ({storeData.reviewsCount} تقييم للمتجر)
                                    </div>
                                </div>
                            </Link>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-5">
                            <motion.p variants={itemVariants} className="text-base text-foreground/85 leading-relaxed whitespace-pre-line">
                                {item.longDescription || item.description}
                            </motion.p>

                            {item.type === 'بيع' && (item as Product).preparationTime && (
                                <motion.div variants={itemVariants}>
                                    <Badge variant="secondary"><Clock size={14} className="ml-1"/> وقت التجهيز: {(item as Product).preparationTime}</Badge>
                                </motion.div>
                            )}
                            {item.type === 'إيجار' && (item as Product).rentalTerms && (
                                <motion.div variants={itemVariants} className="text-sm text-muted-foreground space-y-1 border-l-2 pl-3 py-1" style={{borderColor: effectiveAccentColor}}>
                                    <p className="font-medium text-foreground" style={{color: effectiveAccentColor}}>شروط الإيجار:</p>
                                    {(item as Product).rentalTerms?.minDuration && <p><CalendarDays size={14} className="inline ml-1"/> أقل مدة: {(item as Product).rentalTerms?.minDuration}</p>}
                                    {(item as Product).rentalTerms?.deposit && <p><DollarSign size={14} className="inline ml-1"/> التأمين: {(item as Product).rentalTerms?.deposit}</p>}
                                </motion.div>
                            )}
                            {item.type === 'خدمة' && (
                                <motion.div variants={itemVariants} className="text-sm text-muted-foreground space-y-1 border-l-2 pl-3 py-1" style={{borderColor: effectiveAccentColor}}>
                                    <p className="font-medium text-foreground" style={{color: effectiveAccentColor}}>تفاصيل الخدمة:</p>
                                    {(item as Service).duration && <p><Clock size={14} className="inline ml-1"/> المدة: {(item as Service).duration}</p>}
                                    {(item as Service).location && <p><MapPin size={14} className="inline ml-1"/> المكان: {(item as Service).location}</p>}
                                </motion.div>
                            )}

                            {(item as Product | Service).tags && (item as Product | Service).tags!.length > 0 && (
                                <motion.div variants={itemVariants} className="mt-3">
                                    <p className="text-sm font-medium mb-1.5" style={{color: effectiveAccentColor}}>كلمات مفتاحية:</p>
                                    <div className="flex flex-wrap gap-1.5">
                                    {(item as Product | Service).tags!.map(tag =>
                                        <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0.5 flex items-center gap-1" style={{borderColor: `${effectiveAccentColor}80`, color: effectiveAccentColor}}>
                                             <TagIcon size={12} />
                                            {tag}
                                        </Badge>
                                    )}
                                    </div>
                                </motion.div>
                            )}

                            <Separator className="my-5"/>

                            <motion.div variants={itemVariants} className="space-y-4">
                               <div className="flex items-baseline justify-center md:justify-start gap-2">
                                <p className="text-4xl font-extrabold" style={{color: effectiveAccentColor}}>
                                    {displayPrice}
                                </p>
                                {originalPriceDisplay && (
                                    <p className="text-xl text-muted-foreground line-through">{originalPriceDisplay}</p>
                                )}
                               </div>
                                {item.type === 'بيع' && (
                                    <div className="flex items-center justify-center md:justify-start gap-3">
                                        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} aria-label="تقليل الكمية">
                                            <Minus className="h-4 w-4"/>
                                        </Button>
                                        <span className="text-lg font-semibold w-10 text-center tabular-nums" aria-live="polite">{quantity}</span>
                                        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)} aria-label="زيادة الكمية">
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
                                    className="w-full text-lg py-6 px-8 shadow-lg text-white hover:opacity-90 transition-opacity flex items-center justify-center"
                                    style={{backgroundColor: effectiveAccentColor}}
                                    onClick={() => handlePrimaryAction(item)}
                                    disabled={isAddingToCart || (item as Product).availability === 'نفذ المخزون'}
                                    aria-label={isAddingToCart ? 'جاري الإضافة...' : (item as Product).availability === 'نفذ المخزون' ? 'غير متوفر حاليًا' : item.type === 'بيع' ? 'أضيفي إلى السلة' : item.type === 'إيجار' ? 'احجزي الآن' : 'احجزي/استفسري عن الخدمة'}
                                >
                                    {isAddingToCart ? (
                                        <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <>
                                        {item.type === 'بيع' && <ShoppingBasket size={22} className="ml-2" />}
                                        {item.type === 'إيجار' && <CalendarDays size={22} className="ml-2" />}
                                        {item.type === 'خدمة' && <Handshake size={22} className="ml-2" />}
                                        </>
                                    )}
                                    {isAddingToCart ? 'جاري الإضافة...' :
                                     (item as Product).availability === 'نفذ المخزون' ? 'غير متوفر حاليًا' :
                                     item.type === 'بيع' ? 'أضيفي إلى السلة' :
                                     item.type === 'إيجار' ? 'احجزي الآن' :
                                     'احجزي/استفسري عن الخدمة'
                                    }
                                </Button>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>

                 <motion.div variants={itemVariants}>
                    <Card className="shadow-md border-secondary/50">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2" style={{color: effectiveAccentColor}}>
                            <StoreIcon size={20}/> معلومات المتجر والشحن
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-foreground/80">
                            <Button variant="outline" size="sm" className="w-full mb-2 hover:bg-primary/10" style={{borderColor: effectiveAccentColor, color: effectiveAccentColor}} asChild>
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
                 </motion.div>
            </motion.div>
        </motion.div>

        {/* Customer Reviews Section */}
        {mockItemReviews.length > 0 && (
             <motion.div variants={itemVariants} className="mt-12">
                <StoreSection title="آراء عميلاتنا" icon={ReviewIcon} accentColor={effectiveAccentColor} className="mb-10">
                <div className="space-y-6">
                    {mockItemReviews.map(review => (
                    <Card key={review.id} className="shadow-lg border-border/30">
                        <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border">
                                <AvatarImage src={review.authorAvatar} alt={review.authorName} data-ai-hint={review.dataAiHintAvatar || "avatar customer"}/>
                                <AvatarFallback>{review.authorName.substring(0,1)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-foreground">{review.authorName}</p>
                                <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            </div>
                            <RatingStarsDisplay rating={review.rating} />
                        </div>
                        </CardHeader>
                        <CardContent>
                        <p className="text-sm text-foreground/80 leading-relaxed">{review.comment}</p>
                        </CardContent>
                    </Card>
                    ))}
                    <div className="text-center">
                    <Button variant="link" style={{color: effectiveAccentColor}} className="hover:underline">
                        عرض كل التقييمات ({item.reviewCount || mockItemReviews.length})
                    </Button>
                    </div>
                </div>
                </StoreSection>
            </motion.div>
        )}


        <motion.div variants={itemVariants}>
            <StoreSection id="related-items" title="قد يعجبك أيضاً من نفس المتجر" icon={Sparkles} accentColor={effectiveAccentColor} className="mt-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {storeData.products.filter(p => p.id !== item.id && p.category === item.category).slice(0, 4).map(relatedItem => (
                    <StoreProductCard key={relatedItem.id} product={relatedItem as Product} accentColor={effectiveAccentColor} onViewDetails={() => router.push(`/products/${relatedItem.id}`)} />
                ))}
                {storeData.services && storeData.services.filter(s => s.id !== item.id && s.category === item.category).slice(0, 4).map(relatedItem => (
                    <StoreServiceCard key={relatedItem.id} service={relatedItem as Service} accentColor={effectiveAccentColor} onViewDetails={() => router.push(`/products/${relatedItem.id}`)} />
                ))}
                </div>
                {(storeData.products.filter(p => p.id !== item.id && p.category === item.category).length === 0 && (!storeData.services || storeData.services.filter(s => s.id !== item.id && s.category === item.category).length === 0)) && (
                    <p className="text-muted-foreground text-center py-4">لا توجد عناصر مشابهة من هذا المتجر حالياً.</p>
                )}
            </StoreSection>
        </motion.div>
    </motion.div>
  );
}

