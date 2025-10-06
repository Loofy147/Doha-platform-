'use client';

import React, { useEffect, useState } from 'react';
import { useWishlist } from '@/context/wishlist-context';
import StoreProductCard from '@/components/store/store-product-card';
import StoreServiceCard from '@/components/store/store-service-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { type Product, type Service } from '@/lib/data/mock-store-data';

export default function WishlistPage() {
  const { state } = useWishlist();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCardClick = (item: Product | Service) => {
    router.push(`/products/${item.id}`);
  };

  const renderSkeleton = () => (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <Heart size={48} className="mx-auto text-destructive mb-4" />
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          قائمة أمنياتكِ
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          هنا تجدين كل الإبداعات والخدمات التي أسرت قلبكِ.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={`skeleton-${i}`} className="overflow-hidden shadow-lg rounded-lg flex flex-col">
            <Skeleton className="aspect-square w-full rounded-t-lg" />
            <CardContent className="p-6 flex flex-col flex-grow space-y-3">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-6 w-1/3 mt-2" />
            </CardContent>
            <CardFooter className="p-4 border-t">
                <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );

  if (!isClient) {
    return renderSkeleton();
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <Heart size={48} className="mx-auto text-destructive mb-4" />
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          قائمة أمنياتكِ
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          هنا تجدين كل الإبداعات والخدمات التي أسرت قلبكِ.
        </p>
      </header>

      {state.items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {state.items.map(item => {
            if (item.type === 'بيع' || item.type === 'إيجار') {
              return <StoreProductCard key={item.id} product={item as Product} onViewDetails={() => handleCardClick(item)} />;
            } else {
              return <StoreServiceCard key={item.id} service={item as Service} onViewDetails={() => handleCardClick(item)} />;
            }
          })}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-border rounded-lg">
          <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-primary mb-2">قائمة أمنياتكِ فارغة حاليًا</h3>
          <p className="text-foreground/70 mb-6">
            لم تضيفي أي منتجات أو خدمات إلى قائمتكِ بعد. ابدئي التصفح الآن!
          </p>
          <Button asChild>
            <Link href="/products">
              اكتشفي إبداعات جديدة
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}