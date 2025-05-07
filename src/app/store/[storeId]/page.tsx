'use client';

import React, {useEffect, useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
  Store,
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
  StoreData,
  Product,
  ProductType,
  StoreType,
} from '@/lib/data/mock-store-data';

interface FeaturedCollection {
  name: string;
  products: Product[];
}

const FeaturedCollectionsSection: React.FC<
  {
    collections: FeaturedCollection[];
    storeData: StoreData | null;
    onViewProductDetails: (product: Product) => void;
    onShowAllFromCollection: (categoryName: string) => void;
  }
> = ({
  collections,
  storeData,
  onViewProductDetails,
  onShowAllFromCollection,
}) => {
  if (!collections.length) return null;

  return (
    <StoreSection
      title="اكتشفي مجموعاتنا"
      icon={Palette}
      accentColor={storeData?.accentColor}
      className="my-10"
    >
      <div className="space-y-10">
        {collections.map((collection) => (
          <div key={collection.name}>
            <h3
              className="text-xl font-semibold mb-4 text-foreground/90"
              style={{
                borderBottom: `2px solid ${
                  storeData?.accentColor || 'hsl(var(--primary))'
                }`,
                paddingBottom: '0.5rem',
              }}
            >
              {collection.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {collection.products.slice(0, 3).map((product) => (
                <StoreProductCard
                  key={product.id}
                  product={product}
                  accentColor={storeData?.accentColor}
                  onViewDetails={onViewProductDetails}
                />
              ))}
            </div>
            {collection.products.length > 3 && (
              <div className="text-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => onShowAllFromCollection(collection.name)}
                  style={{borderColor: storeData?.accentColor || 'hsl(var(--primary))'}}
                >
                  عرض الكل
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </StoreSection>
  );
};

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
  }, []);

  useEffect(() => {
    // Simulate fetching store data based on storeId
    if (storeId) {
      // const fetchedStoreData = mockStoreDetails.find(store => store.id === storeId) || null;
      const fetchedStoreData = mockStoreDetails[0];
      setStoreData(fetchedStoreData);
    }
  }, [storeId]);

  const handleViewProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailsOpen(true);
  };

  const handleCloseProductDetails = () => {
    setIsProductDetailsOpen(false);
    setSelectedProduct(null);
  };

  if (!isMounted) {
    return (
      <div>
        <div>
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-6 w-3/4" />
        </div>

        <div>
          <Skeleton className="h-32 w-full" />
        </div>

        <div>
          <div>
            <Skeleton className="h-24 w-24 rounded-full" />
            <div>
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>

          <div>
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!storeData) {
    return (
      <div>
        <div>Store not found.</div>
        <Button variant="link" onClick={() => router.back()}>
          Go back
        </Button>
      </div>
    );
  }

  const handleAddToCart = (product: Product) => {
    toast({
      title: 'Added to cart!',
      description: `Successfully added ${product.name} to your cart.`,
    });
  };

  const featuredCollections = storeData.productTypes.map((productType) => ({
    name: productType.name,
    products: storeData.products.filter((product) => product.type === productType.id),
  }));

  const handleShowAllFromCollection = (categoryName: string) => {
    toast({
      title: 'Navigate to category',
      description: `Navigating to category ${categoryName}.`,
    });
    console.log('collectionName: ', categoryName);
    // router.push(`/stores/${storeId}/category/${categoryName}`);
  };

  return (
    <div>
      <div>
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to homepage
        </Link>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight">
            {storeData.name}
          </h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1.5">
              <Star className="w-4 h-4" />
              {storeData.rating}
            </Badge>
            <span className="text-sm text-muted-foreground">
              ({storeData.reviewsCount} reviews)
            </span>
          </div>
        </div>
        
      </div>

      <div>
        <Carousel plugins={[Autoplay({delay: 2000})]} loop className="w-full">
          <CarouselContent className="-ml-1 pl-1">
            {storeData.heroImages.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div>
                  <Image
                    src={image}
                    alt="Hero Image"
                    width={500}
                    height={300}
                    className="aspect-video object-cover rounded-md"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div>
        <FeaturedCollectionsSection
          collections={featuredCollections}
          storeData={storeData}
          onViewProductDetails={handleViewProductDetails}
          onShowAllFromCollection={handleShowAllFromCollection}
        />
        {storeData.storeType === 'bakery' && (
          <BakerySpecialsSection
            products={storeData.products}
            storeData={storeData}
            onViewProductDetails={handleViewProductDetails}
          />
        )}
        {storeData.storeType === 'salon' && (
          <SalonServicesSection
            services={storeData.services}
            storeData={storeData}
            onBookService={() => {}}
          />
        )}
        {storeData.storeType === 'fashion' && (
          <FashionLookbookSection
            products={storeData.products}
            storeData={storeData}
            onViewProductDetails={handleViewProductDetails}
          />
        )}
      </div>

      <Dialog open={isProductDetailsOpen} onOpenChange={setIsProductDetailsOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            {selectedProduct?.images.map((image, index) => (
              <div key={index}>
                <Image
                  src={image}
                  alt={selectedProduct.name}
                  width={500}
                  height={300}
                  className="aspect-video object-cover rounded-md"
                />
              </div>
            ))}

            <DialogTitle>{selectedProduct?.name}</DialogTitle>
            <DialogDescription>{selectedProduct?.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 sm:justify-between items-center">
            <Button type="button" variant="ghost" onClick={handleCloseProductDetails}>
              Close
            </Button>
            {/*<Button type="button" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Add to cart
            </Button>*/}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StorePage;
