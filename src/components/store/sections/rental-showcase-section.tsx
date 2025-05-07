// src/components/store/sections/rental-showcase-section.tsx
'use client';

import React from 'react';
import type { Product, StoreData } from '@/lib/data/mock-store-data';
import StoreProductCard from '@/components/store/store-product-card';
import StoreSection from '@/components/store/store-section';
import { CalendarDays, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface RentalShowcaseSectionProps {
  products: Product[]; // Items available for rent
  storeData: StoreData | null;
  onViewProductDetails: (product: Product) => void;
}

const RentalShowcaseSection: React.FC<RentalShowcaseSectionProps> = ({ products, storeData, onViewProductDetails }) => {
  if (!products || products.length === 0) return null;

  const featuredRentals = products.filter(p => storeData?.featuredProductIds?.includes(p.id) || p.isBestseller || p.isNew).slice(0, 4);

  return (
    <StoreSection
      title="استأجري إطلالتكِ أو احتياجاتكِ"
      icon={CalendarDays}
      accentColor={storeData?.accentColor}
      description="اكتشفي مجموعتنا المختارة من المنتجات المتاحة للإيجار. حلول أنيقة وعملية لمناسباتكِ ومشروعاتكِ."
      className="my-10"
    >
      {featuredRentals.length > 0 && (
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRentals.map(product => (
              <StoreProductCard
                key={product.id}
                product={product}
                accentColor={storeData?.accentColor}
                onViewDetails={onViewProductDetails}
                className="transition-all duration-300 ease-in-out hover:shadow-2xl"
              />
            ))}
          </div>
        </div>
      )}
      
      {storeData?.policies?.customPolicy && (
         <Card className="mt-12" style={{borderColor: storeData.accentColor}}>
            <CardHeader>
                <CardTitle className="text-xl flex items-center" style={{color: storeData.accentColor}}>
                    <Sparkles size={22} className="ml-2"/> {storeData.policies.customPolicy.title || "معلومات هامة للإيجار"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-foreground/80 whitespace-pre-line">{storeData.policies.customPolicy.content}</p>
            </CardContent>
         </Card>
      )}

    </StoreSection>
  );
};

export default RentalShowcaseSection;
