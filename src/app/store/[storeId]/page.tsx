'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Star, MessageSquare, Info, MapPin, Phone, Heart, Share2, Mail, Sparkles, Tag, ThumbsUp, Eye, ChevronLeft, ChevronRight, ShoppingBasket, Rocket, Palette, CalendarDays, Handshake, Edit3, CookingPot, Scissors, Shirt, Store } from 'lucide-react';
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
import { mockStoreDetails, type StoreData, type Product, type ProductType, type StoreType } from '@/lib/data/mock-store-data';


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


export type StoreType = 'general' | 'bakery' | 'fashion' | 'salon' | 'crafts' | 'rental' | 'service';

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
    
      
        
          
          
          
          
          
          

        
        
          
            {storeData.story && (
               
                  
                  {storeData.story}
                
            )}
        
      
    
  );
}
`