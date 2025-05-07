// src/app/store/[storeId]/page.tsx
'use client';

import React, {useEffect, useState, useMemo} from 'react';
import {useParams, useRouter} from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Separator} from '@/components/ui/separator';
import {Badge} from '@/components/ui/badge';
import {
  ShoppingBag,
  Star,
  MessageSquare,
  Info,
  MapPin,
  Phone,
  Heart,
  Share2,
  Mail,
  Sparkles,
  Tag,
  ThumbsUp,
  Eye,
  ChevronLeft,
  ChevronRight,
  ShoppingBasket,
  Rocket,
  Palette,
  CalendarDays,
  Handshake,
  Edit3,
  CookingPot,
  Scissors,
  Shirt,
  AlertCircle,
  Store as StoreIcon, // Renamed to avoid conflict with StorePage component
} from 'lucide-react';
import {Skeleton} from '@/components/ui/skeleton';
import {useToast} from '@/hooks/use-toast';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import {cn} from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import StoreProductCard from '@/components/store/store-product-card';
import StoreSection from '@/components/store/store-section';
import BakerySpecialsSection from '@/components/store/sections/bakery-specials-section';
import SalonServicesSection from '@/components/store/sections/salon-services-section';
import FashionLookbookSection from '@/components/store/sections/fashion-lookbook-section';
import {
  mockStoreDetails,
  type StoreData,
  type Product,
  type ProductType,
  type StoreType,
} from '../../../lib/data/mock-store-data';


interface FeaturedCollection {
  name: string;
  products: Product[];
}

const StorePage = () => {
  const router = useRouter();
  const params = useParams();
  const storeId = params.storeId as string;
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const {toast} = useToast();

  useEffect(() => {
    setIsMounted(true);
    // Simulate fetching store data based on storeId
    if (storeId) {
      const fetchedStoreData = mockStoreDetails.find(store => store.id === storeId) || null;
      setStoreData(fetchedStoreData);
    }
  }, [storeId]);

  const storeThemeStyle = useMemo(() => storeData?.themeStyle || 'light', [storeData]);
  const storeAccentColor = useMemo(() => storeData?.accentColor || 'hsl(var(--primary))', [storeData]);


  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailsOpen(true);
  };

  const handleCloseProductDetails = () => {
    setIsProductDetailsOpen(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product: Product) => {
    toast({
      title: `💖 ${product.name}`,
      description: "تمت إضافة المنتج إلى سلة أمنياتك (محاكاة)!",
      action: <Button variant="outline" size="sm" onClick={() => { /* navigate to cart or wishlist */ }}>عرض السلة/الأمنيات</Button>,
    });
  };

  const featuredCollections: FeaturedCollection[] = useMemo(() => {
    if (!storeData) return [];
    return storeData.productTypes.map((productTypeCollection) => ({
      name: productTypeCollection.name,
      products: storeData.products.filter((product) => product.type === productTypeCollection.id),
    }));
  }, [storeData]);

  const handleShowAllFromCollection = (collectionName: string) => {
    toast({
      title: 'جاري التوجيه...',
      description: `سيتم عرض كل المنتجات من مجموعة "${collectionName}". (قيد التطوير)`,
    });
    // router.push(`/store/${storeId}/collection/${collectionName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const getStoreTypeSpecificIcon = (type?: StoreType) => {
    switch (type) {
        case 'bakery': return CookingPot;
        case 'fashion': return Shirt;
        case 'salon': return Scissors;
        case 'crafts': return Palette;
        // case 'rental': return CalendarDays; // Assuming rental is a specific store type
        // case 'service': return Handshake; // Assuming service is a specific store type
        default: return StoreIcon;
    }
  };
  const StoreTypeSpecificIcon = getStoreTypeSpecificIcon(storeData?.storeType);


  if (!isMounted) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="mb-6">
            <Skeleton className="h-6 w-1/4 mb-2" />
            <Skeleton className="h-10 w-1/2" />
          </div>

          <Skeleton className="h-64 w-full rounded-lg mb-8" />

          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <Skeleton className="h-32 w-32 rounded-full" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-2/3" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, i) => (
              <Card key={i} className="shadow-lg rounded-lg overflow-hidden">
                <Skeleton className="aspect-square w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-5/6 mb-3" />
                  <Skeleton className="h-6 w-1/3" />
                </CardContent>
                <CardFooter className="p-3 border-t">
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!storeData) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center min-h-screen flex flex-col justify-center items-center">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-3xl font-bold text-destructive mb-2">خطأ: المتجر غير موجود</h1>
        <p className="text-lg text-muted-foreground mb-6">
          عذرًا، لم نتمكن من العثور على المتجر الذي تبحثين عنه. قد يكون الرابط غير صحيح أو تم حذف المتجر.
        </p>
        <Button variant="outline" onClick={() => router.back()} className="text-lg px-6 py-3">
          <ChevronRight className="w-5 h-5 ml-2" /> العودة للخلف
        </Button>
      </div>
    );
  }


  return (
    <div className={cn(
        "min-h-screen",
        storeThemeStyle === 'light' && "bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50",
        storeThemeStyle === 'elegant' && "bg-slate-800 text-slate-50", // Darker theme
        storeThemeStyle === 'playful' && "bg-yellow-50",
        storeThemeStyle === 'modern-minimal' && "bg-gray-50",
        storeThemeStyle === 'dark' && "bg-gray-900 text-gray-100"
    )}>
      {/* Store Header: Banner, Logo, Name, Slogan */}
      <header className="relative">
        <div className="h-48 md:h-64 lg:h-80 w-full overflow-hidden">
          <Carousel 
            plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]} 
            opts={{ loop: true }} 
            className="h-full w-full"
          >
            <CarouselContent className="h-full">
              {storeData.bannerImages.map((src, index) => (
                <CarouselItem key={index} className="h-full">
                  <Image 
                    src={src} 
                    alt={`${storeData.name} بانر ${index + 1}`} 
                    fill 
                    className="object-cover" 
                    data-ai-hint={storeData.dataAiHintBanner[index % storeData.dataAiHintBanner.length]}
                    priority={index === 0} 
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20 relative z-10">
          <div className={cn(
            "p-6 rounded-xl shadow-2xl flex flex-col md:flex-row items-center gap-6",
            storeThemeStyle === 'elegant' && "bg-slate-700/90 backdrop-blur-md border border-slate-600",
            storeThemeStyle === 'dark' && "bg-gray-800/90 backdrop-blur-md border border-gray-700",
            (storeThemeStyle === 'light' || storeThemeStyle === 'playful' || storeThemeStyle === 'modern-minimal') && "bg-card/90 backdrop-blur-md border border-border"
           )}>
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 shadow-lg" style={{ borderColor: storeAccentColor }}>
              <AvatarImage src={storeData.logo} alt={`${storeData.name} شعار`} data-ai-hint={storeData.dataAiHintLogo} />
              <AvatarFallback className="text-3xl" style={{ backgroundColor: `${storeAccentColor}33`, color: storeAccentColor}}>
                {storeData.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-right">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: storeThemeStyle === 'elegant' || storeThemeStyle === 'dark' ? 'hsl(var(--card-foreground))' : storeAccentColor }}>
                {storeData.name}
              </h1>
              {storeData.slogan && <p className="mt-1 text-md md:text-lg" style={{ color: storeThemeStyle === 'elegant' || storeThemeStyle === 'dark' ? 'hsl(var(--muted-foreground))' : 'hsl(var(--muted-foreground))'}}>{storeData.slogan}</p>}
              <div className="mt-2 flex items-center justify-center md:justify-start gap-2">
                <Badge variant="outline" className="gap-1.5 text-sm py-1 px-2.5 border-current" style={{ color: storeAccentColor, borderColor: storeAccentColor }}>
                  <StoreTypeSpecificIcon className="w-4 h-4" />
                  {storeData.storeType === 'general' ? 'متجر متنوع' : 
                   storeData.storeType === 'bakery' ? 'مخبوزات وحلويات' :
                   storeData.storeType === 'fashion' ? 'أزياء وموضة' :
                   storeData.storeType === 'salon' ? 'صالون وخدمات تجميل' :
                   storeData.storeType === 'crafts' ? 'حرف يدوية وفنون' :
                   'متجر'}
                </Badge>
                <Badge variant="outline" className="gap-1.5 text-sm py-1 px-2.5 border-current" style={{ color: storeAccentColor, borderColor: storeAccentColor }}>
                  <Star className="w-4 h-4 fill-current" />
                  {storeData.rating.toFixed(1)} ({storeData.reviewsCount} تقييم)
                </Badge>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col items-center gap-2 mt-4 md:mt-0 self-center md:self-start">
              <Button variant="outline" size="sm" className="w-full md:w-auto" style={{borderColor: storeAccentColor, color: storeAccentColor}} 
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${storeAccentColor}1A`}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Heart className="w-4 h-4 ml-2" /> أضيفي للمفضلة
              </Button>
              <Button variant="outline" size="sm" className="w-full md:w-auto" style={{borderColor: storeAccentColor, color: storeAccentColor}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${storeAccentColor}1A`}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Share2 className="w-4 h-4 ml-2" /> شاركي المتجر
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Store Story/About Section */}
        {storeData.story && (
          <StoreSection title="قصة متجرنا" icon={Rocket} accentColor={storeAccentColor} className="mb-10" description="تعرفي على الإلهام والشغف وراء كل قطعة نقدمها.">
            <Card className={cn("shadow-lg", storeThemeStyle === 'elegant' && "bg-slate-700 border-slate-600", storeThemeStyle === 'dark' && "bg-gray-800 border-gray-700")}>
              <CardContent className="p-6 text-md text-foreground/80 leading-relaxed">
                {storeData.story}
              </CardContent>
            </Card>
          </StoreSection>
        )}

        {/* Special Announcements */}
        {storeData.specialAnnouncements && storeData.specialAnnouncements.length > 0 && (
          <StoreSection title="إعلانات خاصة" icon={Sparkles} accentColor={storeAccentColor} className="mb-10">
            <Card className={cn("bg-accent-yellow/10 border-accent-yellow shadow-lg", storeThemeStyle === 'elegant' && "bg-yellow-500/20 border-yellow-500", storeThemeStyle === 'dark' && "bg-yellow-400/20 border-yellow-400")}>
              <CardContent className="p-6">
                <ul className="space-y-2">
                  {storeData.specialAnnouncements.map((ann, index) => (
                    <li key={index} className="flex items-center gap-2 text-yellow-700 font-medium">
                      <Sparkles size={18} className="text-yellow-600" />
                      {ann}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </StoreSection>
        )}


        {/* Store Type Specific Sections */}
        {storeData.storeType === 'bakery' && (
          <BakerySpecialsSection
            products={storeData.products.filter(p => p.category.includes("خاص"))} // Example filter
            storeData={storeData}
            onViewProductDetails={handleViewProductDetails}
          />
        )}
        {storeData.storeType === 'salon' && storeData.services && (
          <SalonServicesSection
            services={storeData.services}
            storeData={storeData}
            onBookService={(serviceName) => toast({title: `حجز خدمة: ${serviceName}`, description: "سيتم توجيهك لصفحة الحجز (قيد التطوير).", variant: "default"})}
          />
        )}
        {storeData.storeType === 'fashion' && (
          <FashionLookbookSection
            products={storeData.products} // Could be curated looks
            storeData={storeData}
            onViewProductDetails={handleViewProductDetails}
          />
        )}

        {/* Featured Collections / Product Types Section */}
        <StoreSection title="تصفحي إبداعاتنا" icon={ShoppingBag} accentColor={storeAccentColor} className="my-10" description="مجموعات متنوعة تلبي كل أذواقك واحتياجاتك.">
          <div className="space-y-10">
            {featuredCollections.map((collection) => (
              collection.products.length > 0 && (
              <div key={collection.name}>
                <h3 className="text-2xl font-semibold mb-6 pb-2" style={{ borderBottom: `3px solid ${storeAccentColor}`}}>
                  {collection.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {collection.products.slice(0, 4).map((product) => ( // Show up to 4 products initially
                    <StoreProductCard
                      key={product.id}
                      product={product}
                      accentColor={storeAccentColor}
                      onViewDetails={handleViewProductDetails}
                    />
                  ))}
                </div>
                {collection.products.length > 4 && (
                  <div className="text-center mt-8">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => handleShowAllFromCollection(collection.name)}
                      style={{borderColor: storeAccentColor, color: storeAccentColor}}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${storeAccentColor}1A`}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      عرض كل منتجات "{collection.name}" <ChevronLeft className="mr-2 h-5 w-5"/>
                    </Button>
                  </div>
                )}
              </div>
              )
            ))}
          </div>
        </StoreSection>

        {/* Store Contact & Info */}
        <StoreSection title="تواصلي معنا" icon={MessageSquare} accentColor={storeAccentColor} className="my-10" description="نحن هنا للإجابة على جميع استفساراتك ومساعدتك.">
          <Card className={cn("shadow-lg", storeThemeStyle === 'elegant' && "bg-slate-700 border-slate-600", storeThemeStyle === 'dark' && "bg-gray-800 border-gray-700")}>
            <CardContent className="p-6 grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-2" style={{color: storeAccentColor}}>معلومات التواصل:</h4>
                {storeData.contact.email && <p className="flex items-center gap-2 mb-1"><Mail size={16} /> {storeData.contact.email}</p>}
                {storeData.contact.phone && <p className="flex items-center gap-2 mb-1"><Phone size={16} /> {storeData.contact.phone}</p>}
                {storeData.contact.address && <p className="flex items-center gap-2"><MapPin size={16} /> {storeData.contact.address}</p>}
              </div>
              {storeData.socialMedia && (
                <div>
                  <h4 className="font-semibold text-lg mb-2" style={{color: storeAccentColor}}>تابعينا على:</h4>
                  {storeData.socialMedia.instagram && <p><Link href={`https://instagram.com/${storeData.socialMedia.instagram}`} target="_blank" className="hover:underline flex items-center gap-2"><StoreIcon size={16}/> انستغرام</Link></p>}
                  {storeData.socialMedia.facebook && <p><Link href={`https://facebook.com/${storeData.socialMedia.facebook}`} target="_blank" className="hover:underline flex items-center gap-2"><ThumbsUp size={16}/> فيسبوك</Link></p>}
                </div>
              )}
              {storeData.openingHours && storeData.openingHours.length > 0 && (
                 <div>
                    <h4 className="font-semibold text-lg mb-2" style={{color: storeAccentColor}}>أوقات العمل:</h4>
                    <ul className="text-sm">
                    {storeData.openingHours.map((line, idx) => <li key={idx}>{line}</li>)}
                    </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </StoreSection>

         {/* Store Policies */}
        {storeData.policies && (
            <StoreSection title="سياسات المتجر" icon={Info} accentColor={storeAccentColor} className="my-10" description="تعرفي على شروطنا لضمان تجربة تسوق مريحة وآمنة.">
            <Card className={cn("shadow-lg", storeThemeStyle === 'elegant' && "bg-slate-700 border-slate-600", storeThemeStyle === 'dark' && "bg-gray-800 border-gray-700")}>
                <CardContent className="p-6 space-y-4 text-sm text-foreground/80">
                {storeData.policies.returnPolicy && <div><h4 className="font-semibold mb-1" style={{color:storeAccentColor}}>سياسة الإرجاع والاستبدال:</h4><p className="whitespace-pre-line">{storeData.policies.returnPolicy}</p></div>}
                {storeData.policies.shippingPolicy && <div><h4 className="font-semibold mb-1" style={{color:storeAccentColor}}>سياسة الشحن والتوصيل:</h4><p className="whitespace-pre-line">{storeData.policies.shippingPolicy}</p></div>}
                {storeData.policies.customPolicy && <div><h4 className="font-semibold mb-1" style={{color:storeAccentColor}}>{storeData.policies.customPolicy.title}:</h4><p className="whitespace-pre-line">{storeData.policies.customPolicy.content}</p></div>}
                </CardContent>
            </Card>
            </StoreSection>
        )}


      </main>

      {/* Product Details Modal */}
      {selectedProduct && (
        <Dialog open={isProductDetailsOpen} onOpenChange={setIsProductDetailsOpen}>
          <DialogContent className={cn(
            "sm:max-w-3xl max-h-[90vh] flex flex-col",
             storeThemeStyle === 'elegant' && "bg-slate-700 text-slate-50 border-slate-600",
             storeThemeStyle === 'dark' && "bg-gray-800 text-gray-100 border-gray-700"
            )}>
            <DialogHeader className="pr-10"> {/* Add padding for close button */}
              <DialogTitle className="text-2xl md:text-3xl" style={{color: storeAccentColor}}>{selectedProduct.name}</DialogTitle>
              <p className="text-sm text-muted-foreground">
                مقدم من {storeData?.name} • الفئة: {selectedProduct.category} • النوع: <span className="capitalize">{selectedProduct.type}</span>
              </p>
            </DialogHeader>
            
            <div className="grid md:grid-cols-2 gap-6 flex-1 overflow-y-auto py-4 px-1">
                <div className="aspect-square md:aspect-auto md:h-[400px] rounded-lg overflow-hidden relative shadow-lg">
                    <Carousel 
                        opts={{ loop: selectedProduct.images.length > 1 }} 
                        className="h-full w-full group"
                    >
                        <CarouselContent className="h-full">
                        {selectedProduct.images.map((imgSrc, index) => (
                            <CarouselItem key={index} className="h-full">
                            <Image
                                src={imgSrc}
                                alt={`${selectedProduct.name} - صورة ${index + 1}`}
                                fill
                                className="object-cover"
                                data-ai-hint={selectedProduct.dataAiHint}
                            />
                            </CarouselItem>
                        ))}
                        </CarouselContent>
                        {selectedProduct.images.length > 1 && (
                            <>
                            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </>
                        )}
                    </Carousel>
                </div>

                <div className="flex flex-col">
                    <DialogDescription className="text-base text-foreground/90 leading-relaxed mb-4 whitespace-pre-line">
                        {selectedProduct.description}
                    </DialogDescription>

                    {selectedProduct.averageRating && (
                        <div className="flex items-center gap-2 mb-4">
                            {Array.from({length: 5}).map((_, i) => (
                                <Star key={i} size={20} className={i < Math.round(selectedProduct.averageRating || 0) ? 'fill-current' : ''} style={{color: storeAccentColor}}/>
                            ))}
                            <span className="text-sm text-muted-foreground">({selectedProduct.reviewCount} تقييمات)</span>
                        </div>
                    )}
                    
                    <p className="text-3xl font-bold my-4" style={{color: storeAccentColor}}>{selectedProduct.price}</p>
                    
                    {/* TODO: Add quantity selector, size/color options if applicable */}
                </div>
            </div>

            <DialogFooter className="mt-auto pt-4 border-t sm:justify-between items-center gap-2">
              <Button type="button" variant="ghost" onClick={handleCloseProductDetails} className={cn(storeThemeStyle === 'elegant' && "text-slate-300 hover:bg-slate-600", storeThemeStyle === 'dark' && "text-gray-300 hover:bg-gray-700")}>
                إغلاق
              </Button>
              <Button 
                type="button" 
                className="text-white flex-1 sm:flex-none"
                style={{backgroundColor: storeAccentColor}}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                onClick={() => handleAddToCart(selectedProduct)}
                size="lg"
              >
                <ShoppingBasket size={20} className="ml-2" /> أضيفي إلى السلة (محاكاة)
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default StorePage;
