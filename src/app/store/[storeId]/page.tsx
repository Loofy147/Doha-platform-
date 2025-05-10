// src/app/store/[storeId]/page.tsx
'use client';

import React, {useEffect, useState, useMemo, Suspense} from 'react';
import {useParams, useRouter } from 'next/navigation'; 
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
import {Badge} from '@/components/ui/badge';
import {
  ShoppingBag,
  Star,
  MessageSquare,
  Info,
  MapPin,
  Phone,
  Sparkles,
  TagIcon as LucideTagIcon, // Renamed to avoid conflict with potential Tag component
  Eye,
  ChevronLeft,
  ShoppingBasket,
  Rocket,
  Clock,
  AlertCircle,
  Store as StoreIconLucide, 
  Loader2,
  PackageSearch,
  type LucideProps,
  CalendarDays,
  Handshake,
} from 'lucide-react';
import {Skeleton} from '@/components/ui/skeleton';
import {useToast} from '@/hooks/use-toast';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
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
import StoreServiceCard from '@/components/store/store-service-card';
import StoreSection from '@/components/store/store-section';
import { SellerContactModal } from '@/components/store/seller-contact-modal'; 
import { StoreHeader } from '@/components/store/store-header'; // Import the new StoreHeader component

// Import specific section components using React.lazy for code splitting
const BakerySpecialsSection = React.lazy(() => import('@/components/store/sections/bakery-specials-section'));
const SalonServicesSection = React.lazy(() => import('@/components/store/sections/salon-services-section'));
const FashionLookbookSection = React.lazy(() => import('@/components/store/sections/fashion-lookbook-section'));
const CraftsShowcaseSection = React.lazy(() => import('@/components/store/sections/crafts-showcase-section'));
const RentalShowcaseSection = React.lazy(() => import('@/components/store/sections/rental-showcase-section'));
const ServiceProviderShowcaseSection = React.lazy(() => import('@/components/store/sections/service-provider-showcase-section'));
import { NotFound } from '@/components/layout/not-found';

import {
  getStoreDataById,
  type StoreData,
  type Product,
  type Service,
  type ItemType as PublicItemType,
  type StoreType,
  type Review
} from '@/lib/data/mock-store-data'; 
import { motion, type MotionProps } from 'framer-motion';


interface FeaturedCollection {
  name: string;
  items: (Product | Service)[];
  type: PublicItemType;
}

const pageEntryVariants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainerVariants: MotionProps = {
  initial: {},
  animate: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }, 
};

const itemVariants: MotionProps['variants'] = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};


const StoreLoadingSkeleton = () => (
  <motion.div 
    className="container mx-auto px-4 py-12 sm:px-6 lg:px-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="animate-pulse">
      {/* StoreHeader Skeleton */}
      <Skeleton className="h-48 md:h-64 lg:h-80 w-full rounded-lg mb-8" /> {/* Banner */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-12 p-6 bg-card rounded-xl shadow-lg -mt-16 md:-mt-20 relative z-10">
        <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-muted" /> {/* Avatar */}
        <div className="flex-1 space-y-3 text-center md:text-right">
          <Skeleton className="h-8 w-3/4 md:w-1/2" /> {/* Store Name */}
          <Skeleton className="h-5 w-full md:w-3/4" /> {/* Slogan */}
          <div className="flex justify-center md:justify-start gap-2">
            <Skeleton className="h-7 w-20 rounded-full" /> {/* Badge 1 */}
            <Skeleton className="h-7 w-28 rounded-full" /> {/* Badge 2 */}
          </div>
        </div>
        <div className="flex gap-2 self-center md:self-start mt-4 md:mt-0">
            <Skeleton className="h-9 w-24 rounded-md" /> {/* Button 1 */}
            <Skeleton className="h-9 w-24 rounded-md" /> {/* Button 2 */}
        </div>
      </div>
      {/* Story/Announcements Skeleton */}
      <Card className="shadow-lg rounded-lg mb-10">
        <CardHeader><Skeleton className="h-7 w-1/3" /></CardHeader>
        <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
      {/* Products/Services Section Skeleton */}
      <div className="mb-10">
        <Skeleton className="h-9 w-1/3 mb-6" /> {/* Section Title */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array(4).fill(0).map((_, i) => ( // Product Cards
            <Card key={`skel-prod-${i}`} className="shadow-lg rounded-lg overflow-hidden">
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
       {/* Contact/Policies Skeleton */}
       <Skeleton className="h-52 w-full rounded-lg mb-10" />
    </div>
  </motion.div>
);

const SectionSuspenseFallback = ({ accentColor }: { accentColor?: string }) => (
  <motion.div className="py-10 text-center" variants={itemVariants}>
      <Loader2 
        className="h-12 w-12 animate-spin mx-auto" 
        style={{color: accentColor || 'hsl(var(--primary))'}}
      />
      <p className="mt-4 text-muted-foreground">جاري تحميل محتوى المتجر...</p>
  </motion.div>
);


const StorePage = () => {
  const router = useRouter(); 
  const params = useParams();
  const storeId = params.storeId as string;
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Product | Service | null>(null);
  const {toast} = useToast();
  const [itemDetailsCarouselApi, setItemDetailsCarouselApi] = useState<CarouselApi>();


  useEffect(() => {
    setIsMounted(true);
    if (storeId) {
      setIsLoading(true);
      setTimeout(() => {
        const fetchedStoreData = getStoreDataById(storeId);
        if (fetchedStoreData) {
          setStoreData(fetchedStoreData);
        } else {
          setStoreData(null); 
        }
        setIsLoading(false);
      }, 700);
    } else {
      setIsLoading(false);
      setStoreData(null);
    }
  }, [storeId]);

  const storeThemeStyle = useMemo(() => storeData?.themeStyle || 'light', [storeData]);
  const storeAccentColor = useMemo(() => storeData?.accentColor || 'hsl(var(--primary))', [storeData]);

  const handleViewItemDetails = (item: Product | Service) => {
    setSelectedItem(item);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedItem(null);
  };

  const handlePrimaryAction = (item: Product | Service) => {
    const actionText = item.type === 'بيع' ? 'أضيف للسلة' : item.type === 'إيجار' ? 'احجزي الآن' : 'استفسري/احجزي الخدمة';
    toast({
      title: `🛍️ ${item.name}`,
      description: `تم ${actionText.toLowerCase()} بنجاح (محاكاة)!`,
      action: <Button variant="outline" size="sm" onClick={() => { router.push(item.type === 'بيع' ? '/cart' : '/dashboard/orders'); }}>متابعة</Button>,
    });
     handleCloseDetailsModal();
  };

 const featuredCollections: FeaturedCollection[] = useMemo(() => {
    if (!storeData) return [];
    const collections: FeaturedCollection[] = [];

    storeData.productTypes.forEach(pt => {
      if (pt.id === 'بيع') {
        const products = storeData.products.filter(p => (storeData.featuredProductIds?.includes(p.id) || p.isBestseller || p.isNew) && p.type === 'بيع');
        if (products.length > 0) {
          collections.push({ name: pt.name, items: products, type: 'بيع' });
        }
      } else if (pt.id === 'إيجار') {
        const rentalItems = storeData.products.filter(p => (storeData.featuredProductIds?.includes(p.id) || p.isBestseller) && p.type === 'إيجار');
        if (rentalItems.length > 0) {
          collections.push({ name: pt.name, items: rentalItems, type: 'إيجار' });
        }
      } else if (pt.id === 'خدمة' && storeData.services) {
        const services = storeData.services.filter(s => storeData.featuredServiceIds?.includes(s.id));
        if (services.length > 0) {
          collections.push({ name: pt.name, items: services, type: 'خدمة' });
        }
      }
    });
    return collections;
  }, [storeData]);


  const handleShowAllFromCollection = (collection: FeaturedCollection) => {
    toast({
      title: 'جاري التوجيه...',
      description: `سيتم عرض كل "${collection.name}" من متجر ${storeData?.name}. (قيد التطوير)`,
    });
  };

  if (!isMounted || isLoading) {
    return <StoreLoadingSkeleton />;
  }

  if (!storeData) {
    return <NotFound title="خطأ: المتجر غير موجود" message="عذرًا، لم نتمكن من العثور على المتجر الذي تبحثين عنه. قد يكون الرابط غير صحيح أو تم حذف المتجر." />;
  }

  return (
    <motion.div
      className={cn(
        "min-h-screen transition-colors duration-500",
        storeThemeStyle === 'light' && "bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 text-foreground",
        storeThemeStyle === 'elegant' && "bg-slate-800 text-slate-100", 
        storeThemeStyle === 'playful' && "bg-yellow-50 text-yellow-900",
        storeThemeStyle === 'modern-minimal' && "bg-gray-100 text-gray-800",
        storeThemeStyle === 'dark' && "bg-gray-900 text-gray-200"
      )}
      variants={pageEntryVariants}
      initial="initial"
      animate="animate"
    >
      <StoreHeader 
        storeData={storeData} 
        storeAccentColor={storeAccentColor} 
        setIsContactModalOpen={setIsContactModalOpen}
        itemVariants={itemVariants}
      />

      <motion.main
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
        variants={staggerContainerVariants}
      >
      {storeData.story && (
        <motion.div variants={itemVariants}>
            <StoreSection id="about-store" title="قصة متجرنا" icon={Rocket} accentColor={storeAccentColor} className="mb-10" description="تعرفي على الإلهام والشغف وراء كل قطعة نقدمها.">
                <Card className={cn("shadow-lg", storeThemeStyle === 'elegant' && "bg-slate-700 border-slate-600 text-slate-100", storeThemeStyle === 'dark' && "bg-gray-800 border-gray-700 text-gray-200")}>
                <CardContent className="p-6 text-md leading-relaxed">
                    {storeData.story}
                </CardContent>
            </Card>
            </StoreSection>
        </motion.div>
      )}

        {storeData.specialAnnouncements && storeData.specialAnnouncements.length > 0 && (
          <motion.div variants={itemVariants}>
              <StoreSection id="announcements" title="إعلانات خاصة" icon={Sparkles} accentColor={storeAccentColor} className="mb-10">
                <Card className={cn("bg-accent-yellow/10 border-accent-yellow shadow-lg",
                    storeThemeStyle === 'elegant' && "bg-yellow-500/20 border-yellow-500 text-yellow-50",
                    storeThemeStyle === 'dark' && "bg-yellow-400/20 border-yellow-400 text-yellow-100",
                    (storeThemeStyle === 'light' || storeThemeStyle === 'playful' || storeThemeStyle === 'modern-minimal') && "text-yellow-700"
                )}>
                  <CardContent className="p-6">
                    <ul className="space-y-2">
                      {storeData.specialAnnouncements.map((ann, index) => (
                        <li key={index} className="flex items-center gap-2 font-medium">
                          <Sparkles size={18} />
                          {ann}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </StoreSection>
          </motion.div>
        )}

        <Suspense fallback={<SectionSuspenseFallback accentColor={storeAccentColor} />}>
          <motion.div variants={itemVariants}>
            {storeData.storeType === 'bakery' && storeData.products && (
            <BakerySpecialsSection
                products={storeData.products.filter(p => storeData.featuredProductIds?.includes(p.id) || p.isBestseller)}
                storeData={storeData}
                onViewProductDetails={handleViewItemDetails}
            />
            )}
          </motion.div>
          <motion.div variants={itemVariants}>
            {storeData.storeType === 'salon' && storeData.services && (
            <SalonServicesSection
                services={storeData.services.filter(s => storeData.featuredServiceIds?.includes(s.id))}
                storeData={storeData}
                onBookService={handleViewItemDetails} // Assuming same modal for services
            />
            )}
          </motion.div>
           <motion.div variants={itemVariants}>
            {storeData.storeType === 'fashion' && storeData.products && (
            <FashionLookbookSection
                products={storeData.products.filter(p => storeData.featuredProductIds?.includes(p.id) || p.isNew)}
                storeData={storeData}
                onViewProductDetails={handleViewItemDetails}
            />
            )}
          </motion.div>
          <motion.div variants={itemVariants}>
             {storeData.storeType === 'crafts' && (storeData.products || storeData.services) && (
              <CraftsShowcaseSection
                products={storeData.products || []}
                services={storeData.services || []}
                storeData={storeData}
                onViewItemDetails={handleViewItemDetails}
              />
            )}
          </motion.div>
          <motion.div variants={itemVariants}>
            {storeData.storeType === 'rental' && storeData.products && (
              <RentalShowcaseSection
                products={storeData.products}
                storeData={storeData}
                onViewProductDetails={handleViewItemDetails}
              />
            )}
          </motion.div>
          <motion.div variants={itemVariants}>
            {storeData.storeType === 'service_provider' && storeData.services && (
              <ServiceProviderShowcaseSection
                services={storeData.services}
                storeData={storeData}
                onViewServiceDetails={handleViewItemDetails}
              />
            )}
          </motion.div>
          <motion.div variants={itemVariants}>
            {storeData.storeType === 'general' && (storeData.products || storeData.services) && (
              <StoreSection id="general-showcase" title="منتجات وخدمات مميزة" icon={ShoppingBag} accentColor={storeAccentColor} className="my-10">
                 <div className="space-y-10">
                    {storeData.products.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-semibold mb-6 pb-2" style={{ borderBottom: `3px solid ${storeAccentColor}`}}>أبرز المنتجات</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {storeData.products.slice(0,4).map(product =>
                            <StoreProductCard key={product.id} product={product} accentColor={storeAccentColor} onViewDetails={handleViewItemDetails} />
                          )}
                        </div>
                      </div>
                    )}
                    {storeData.services && storeData.services.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-semibold mb-6 pb-2" style={{ borderBottom: `3px solid ${storeAccentColor}`}}>خدماتنا</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                           {storeData.services.slice(0,3).map(service =>
                            <StoreServiceCard key={service.id} service={service} accentColor={storeAccentColor} onViewDetails={handleViewItemDetails} />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
              </StoreSection>
            )}
            </motion.div>
        </Suspense>


        <motion.div variants={itemVariants}>
            <StoreSection id="collections" title="تصفحي إبداعاتنا" icon={PackageSearch} accentColor={storeAccentColor} className="my-10" description="مجموعات متنوعة تلبي كل أذواقك واحتياجاتك.">
            <div className="space-y-10">
                {featuredCollections.map((collection) => (
                collection.items.length > 0 && (
                <div key={collection.name}>
                    <h3 className="text-2xl font-semibold mb-6 pb-2" style={{ borderBottom: `3px solid ${storeAccentColor}`}}>
                    {collection.name}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {collection.items.slice(0, 4).map((item) => (
                        item.type === 'خدمة' ?
                        <StoreServiceCard
                        key={item.id}
                        service={item as Service}
                        accentColor={storeAccentColor}
                        onViewDetails={handleViewItemDetails}
                        className={cn(storeThemeStyle === 'dark' || storeThemeStyle === 'elegant' ? 'bg-gray-800/50 border-gray-700' : '')}
                        />
                        :
                        <StoreProductCard
                        key={item.id}
                        product={item as Product}
                        accentColor={storeAccentColor}
                        onViewDetails={handleViewItemDetails}
                        className={cn(storeThemeStyle === 'dark' || storeThemeStyle === 'elegant' ? 'bg-gray-800/50 border-gray-700' : '')}
                        />
                    ))}
                    </div>
                    {collection.items.length > 4 && (
                    <div className="text-center mt-8">
                        <Button
                        variant="outline"
                        size="lg"
                        onClick={() => handleShowAllFromCollection(collection)}
                        style={{borderColor: storeAccentColor, color: storeAccentColor}}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${storeAccentColor}1A`}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        className="group"
                        aria-label={`عرض كل ${collection.name}`}
                        >
                        عرض كل "{collection.name}" <ChevronLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                        </Button>
                    </div>
                    )}
                </div>
                )
                ))}
                {featuredCollections.length === 0 && (
                    <p className="text-muted-foreground text-center py-8">لا توجد مجموعات مميزة لعرضها حاليًا في هذا المتجر.</p>
                )}
            </div>
            </StoreSection>
        </motion.div>

        <motion.div variants={itemVariants}>
            <StoreSection id="contact-store" title="تواصلي معنا" icon={MessageSquare} accentColor={storeAccentColor} className="my-10" description="نحن هنا للإجابة على جميع استفساراتك ومساعدتك.">
            <Card className={cn("shadow-lg", storeThemeStyle === 'elegant' && "bg-slate-700 border-slate-600 text-slate-100", storeThemeStyle === 'dark' && "bg-gray-800 border-gray-700 text-gray-200")}>
                <CardContent className="p-6 grid md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                    <h4 className="font-semibold text-lg mb-2" style={{color: storeAccentColor}}>معلومات التواصل:</h4>
                    {storeData.contact.email && <p className="flex items-center gap-2 mb-1"><Mail size={16} className="text-muted-foreground" /> {storeData.contact.email}</p>}
                    {storeData.contact.phone && <p className="flex items-center gap-2 mb-1"><Phone size={16} className="text-muted-foreground" /> {storeData.contact.phone}</p>}
                    {storeData.contact.address && <p className="flex items-center gap-2"><MapPin size={16} className="text-muted-foreground" /> {storeData.contact.address}</p>}
                    <Button 
                        variant="outline" 
                        className="mt-4 w-full md:w-auto" 
                        style={{borderColor: storeAccentColor, color: storeAccentColor}}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${storeAccentColor}1A`}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        onClick={() => setIsContactModalOpen(true)}
                        >
                        <MessageSquare size={16} className="ml-2"/> أرسلي رسالة إلى {storeData.name}
                    </Button>
                </div>
                {storeData.socialMedia && (
                    <div>
                    <h4 className="font-semibold text-lg mb-2" style={{color: storeAccentColor}}>تابعينا على:</h4>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {storeData.socialMedia.instagram && <Link href={`https://instagram.com/${storeData.socialMedia.instagram}`} target="_blank" className="hover:underline flex items-center gap-1 text-sm"><LucideTagIcon size={14}/> انستغرام</Link>}
                        {storeData.socialMedia.facebook && <Link href={`https://facebook.com/${storeData.socialMedia.facebook}`} target="_blank" className="hover:underline flex items-center gap-1 text-sm"><LucideTagIcon size={14}/> فيسبوك</Link>}
                        {storeData.socialMedia.tiktok && <Link href={`https://tiktok.com/@${storeData.socialMedia.tiktok}`} target="_blank" className="hover:underline flex items-center gap-1 text-sm"><LucideTagIcon size={14}/> تيك توك</Link>}
                        {storeData.socialMedia.snapchat && <Link href={`https://snapchat.com/add/${storeData.socialMedia.snapchat}`} target="_blank" className="hover:underline flex items-center gap-1 text-sm"><LucideTagIcon size={14}/> سناب شات</Link>}
                    </div>
                    </div>
                )}
                {storeData.openingHours && storeData.openingHours.length > 0 && (
                    <div>
                        <h4 className="font-semibold text-lg mb-2" style={{color: storeAccentColor}}>أوقات العمل:</h4>
                        <ul className="text-sm space-y-1">
                        {storeData.openingHours.map((line, idx) => <li key={idx} className="flex items-center gap-2"><Clock size={14} className="text-muted-foreground"/>{line}</li>)}
                        </ul>
                    </div>
                )}
                </CardContent>
            </Card>
            </StoreSection>
        </motion.div>

        {storeData.policies && (
            <motion.div variants={itemVariants}>
                <StoreSection id="policies-store" title="سياسات المتجر" icon={Info} accentColor={storeAccentColor} className="my-10" description="تعرفي على شروطنا لضمان تجربة تسوق مريحة وآمنة.">
                <Card className={cn("shadow-lg", storeThemeStyle === 'elegant' && "bg-slate-700 border-slate-600 text-slate-100", storeThemeStyle === 'dark' && "bg-gray-800 border-gray-700 text-gray-200")}>
                    <CardContent className="p-6 space-y-4 text-sm">
                    {storeData.policies.returnPolicy && <div><h4 className="font-semibold mb-1" style={{color:storeAccentColor}}>سياسة الإرجاع والاستبدال:</h4><p className="whitespace-pre-line">{storeData.policies.returnPolicy}</p></div>}
                    {storeData.policies.shippingPolicy && <div><h4 className="font-semibold mb-1" style={{color:storeAccentColor}}>سياسة الشحن والتوصيل:</h4><p className="whitespace-pre-line">{storeData.policies.shippingPolicy}</p></div>}
                    {storeData.policies.customPolicy && <div><h4 className="font-semibold mb-1" style={{color:storeAccentColor}}>{storeData.policies.customPolicy.title}:</h4><p className="whitespace-pre-line">{storeData.policies.customPolicy.content}</p></div>}
                    </CardContent>
                </Card>
                </StoreSection>
            </motion.div>
        )}
      </motion.main>

       <SellerContactModal 
        storeName={storeData.name} 
        storeAccentColor={storeAccentColor}
        isOpen={isContactModalOpen} 
        onOpenChange={setIsContactModalOpen} 
      />

      {selectedItem && (
        <Dialog open={isDetailsModalOpen} onOpenChange={handleCloseDetailsModal}>
          <DialogContent className={cn(
            "sm:max-w-3xl max-h-[90vh] flex flex-col",
             storeThemeStyle === 'elegant' && "bg-slate-700 text-slate-50 border-slate-600",
             storeThemeStyle === 'dark' && "bg-gray-800 text-gray-100 border-gray-700"
            )}>
            <DialogHeader className="pr-10 border-b pb-4" style={{ borderBottomColor: `${storeAccentColor}4D`}}>
              <DialogTitle className="text-2xl md:text-3xl" style={{color: storeAccentColor}}>{selectedItem.name}</DialogTitle>
              <p className="text-sm text-muted-foreground">
                  مقدم من {storeData?.name} • الفئة: {selectedItem.category} • النوع: <span className="capitalize">{selectedItem.type}</span>
              </p>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-6 flex-1 overflow-y-auto py-4 px-1 scrollbar-thin scrollbar-thumb-muted-foreground/50 scrollbar-track-transparent">
                <div className="aspect-square md:aspect-auto md:min-h-[300px] md:max-h-[500px] rounded-lg overflow-hidden relative shadow-lg group">
                    <Carousel
                        opts={{ loop: (selectedItem as Product).images ? (selectedItem as Product).images!.length > 1 : false }}
                        className="h-full w-full"
                        setApi={setItemDetailsCarouselApi}
                    >
                        <CarouselContent className="h-full">
                        {((selectedItem as Product).images || [(selectedItem as Product).imageSrc || (selectedItem as Service).imageSrc || 'https://picsum.photos/800/600?grayscale']).map((imgSrc, index) => (
                            <CarouselItem key={index} className="h-full">
                            <Image
                                src={imgSrc || 'https://picsum.photos/800/600?grayscale'}
                                alt={`${selectedItem.name} - صورة ${index + 1}`}
                                fill
                                className="object-contain"
                                data-ai-hint={selectedItem.dataAiHint || "product detail image"}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            </CarouselItem>
                        ))}
                        </CarouselContent>
                        {((selectedItem as Product).images ? (selectedItem as Product).images!.length > 1 : false) && (
                            <>
                            <CarouselPrevious aria-label="الصورة السابقة للمنتج" className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-card/70 hover:bg-card" style={{color: storeAccentColor}}/>
                            <CarouselNext aria-label="الصورة التالية للمنتج" className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-card/70 hover:bg-card" style={{color: storeAccentColor}}/>
                            </>
                        )}
                    </Carousel>
                </div>

                <div className="flex flex-col">
                    <DialogDescription className="text-base text-foreground/90 leading-relaxed mb-4 whitespace-pre-line">
                        {selectedItem.longDescription || selectedItem.description}
                    </DialogDescription>

                    {(selectedItem as Product).averageRating && (
                        <div className="flex items-center gap-2 mb-4">
                           <RatingStarsDisplay rating={(selectedItem as Product).averageRating || 0} size={20} />
                            <span className="text-sm text-muted-foreground">({(selectedItem as Product).reviewCount} تقييمات)</span>
                        </div>
                    )}

                    {selectedItem.type === 'خدمة' && (selectedItem as Service).duration && (
                        <p className="text-sm text-muted-foreground mb-1"><Clock size={14} className="inline ml-1" /> المدة: {(selectedItem as Service).duration}</p>
                    )}
                    {selectedItem.type === 'خدمة' && (selectedItem as Service).location && (
                        <p className="text-sm text-muted-foreground mb-1"><MapPin size={14} className="inline ml-1" /> المكان: {(selectedItem as Service).location}</p>
                    )}
                    {(selectedItem as Product | Service).tags && (selectedItem as Product | Service).tags!.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-1" style={{color: storeAccentColor}}>كلمات مفتاحية:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {(selectedItem as Product | Service).tags!.map(tag => <Badge key={tag} variant="outline" style={{borderColor: `${storeAccentColor}80`, color: storeAccentColor}}>{tag}</Badge>)}
                        </div>
                      </div>
                    )}

                    <p className="text-3xl font-bold my-4" style={{color: storeAccentColor}}>{selectedItem.price}</p>
                </div>
            </div>

            <DialogFooter className="mt-auto pt-4 border-t sm:justify-between items-center gap-2" style={{ borderTopColor: `${storeAccentColor}4D` }}>
             <Button
                variant="outline"
                size="sm"
                asChild
                style={{borderColor: storeAccentColor, color: storeAccentColor}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${storeAccentColor}1A`}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                className="order-last sm:order-first"
                aria-label={`عرض التفاصيل الكاملة لـ ${selectedItem.name}`}
              >
                <Link href={`/products/${selectedItem.id}`}>
                  <Eye size={16} className="ml-2" /> عرض التفاصيل الكاملة
                </Link>
              </Button>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Button type="button" variant="ghost" onClick={handleCloseDetailsModal} className={cn(storeThemeStyle === 'elegant' && "text-slate-300 hover:bg-slate-600", storeThemeStyle === 'dark' && "text-gray-300 hover:bg-gray-700", "w-full sm:w-auto")} aria-label="إغلاق النافذة المنبثقة">
                    إغلاق
                  </Button>
                  <Button
                    type="button"
                    className="text-white flex-1 sm:flex-none shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
                    style={{backgroundColor: storeAccentColor}}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    onClick={() => handlePrimaryAction(selectedItem)}
                    size="lg"
                    aria-label={selectedItem.type === 'بيع' ? `إضافة ${selectedItem.name} للسلة` : `حجز ${selectedItem.name}`}
                  >
                    {selectedItem.type === 'بيع' && <ShoppingBasket size={20} className="ml-2" />}
                    {selectedItem.type === 'إيجار' && <CalendarDays size={20} className="ml-2" />}
                    {selectedItem.type === 'خدمة' && <Handshake size={20} className="ml-2" />}
                    {selectedItem.type === 'بيع' ? 'أضيفي إلى السلة' : selectedItem.type === 'إيجار' ? 'احجزي الآن' : 'احجزي/استفسري عن الخدمة'}
                  </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
};

export default StorePage;

// Shadcn Card components are typically not re-exported this way unless building a custom library.
// Assuming Card, CardContent, etc. are already available globally via components/ui.
// If not, this export might be needed or adjusted depending on project structure.
// export { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'; 
