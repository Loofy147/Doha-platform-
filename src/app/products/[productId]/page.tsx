// src/app/products/[productId]/page.tsx
'use client';

import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  AlertCircle,
  ChevronLeft,
  Loader2,
  PackageSearch,
  Sparkles,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { CarouselApi } from "@/components/ui/carousel"; // Keep type import
import { cn } from '@/lib/utils';
import { getProductById, getServiceById, getStoreDataById, type Product, type Service, type StoreData, type Review as StoreReview } from '@/lib/data/mock-store-data';
import StoreSection from '@/components/store/store-section';
import StoreProductCard from '@/components/store/store-product-card';
import StoreServiceCard from '@/components/store/store-service-card';
import { motion, type MotionProps } from 'framer-motion';
import { NotFound } from '@/components/layout/not-found';

// Import newly created sub-components
import { ProductImageCarousel } from '@/components/product-detail/product-image-carousel';
import { ProductPrimaryDetails } from '@/components/product-detail/product-primary-details';
import { ProductStoreInfo } from '@/components/product-detail/product-store-info';
import { ProductReviewsSection } from '@/components/product-detail/product-reviews-section';

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

const itemVariants: MotionProps['variants'] = { 
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


export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId as string;

  const [item, setItem] = useState<Item | null>(null);
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { toast } = useToast();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

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
            }
          } else {
            setError(`تعذر العثور على العنصر المطلوب (ID: ${productId}).`);
            setItem(null);
            setStoreData(null);
          }
        } catch (err) {
           if (!isMounted) return;
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
    if (!carouselApi) return;
    setCurrentSlide(carouselApi.selectedScrollSnap());
    const onSelect = () => setCurrentSlide(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

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
    carouselApi?.scrollTo(index);
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
            <ProductImageCarousel
                images={itemImages}
                itemName={item.name}
                effectiveAccentColor={effectiveAccentColor}
                currentSlide={currentSlide}
                carouselApi={carouselApi}
                setCarouselApi={setCarouselApi}
                onThumbnailClick={handleThumbnailClick}
                dataAiHint={item.dataAiHint}
            />
            
            <div className="space-y-6">
                <ProductPrimaryDetails
                    item={item}
                    storeData={storeData}
                    quantity={quantity}
                    handleQuantityChange={handleQuantityChange}
                    handlePrimaryAction={handlePrimaryAction}
                    isAddingToCart={isAddingToCart}
                    effectiveAccentColor={effectiveAccentColor}
                    itemVariants={itemVariants}
                />
                <ProductStoreInfo
                    storeData={storeData}
                    effectiveAccentColor={effectiveAccentColor}
                    itemVariants={itemVariants}
                />
            </div>
        </motion.div>

        <ProductReviewsSection
            reviews={mockItemReviews}
            effectiveAccentColor={effectiveAccentColor}
            totalReviewCount={item.reviewCount}
            itemVariants={itemVariants}
        />

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

// Add Card, CardContent, CardFooter, CardHeader to exports if not already done in their respective files
// (assuming they are shadcn components and already export themselves)
export { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
