// src/components/store/sections/crafts-showcase-section.tsx
'use client';

import React from 'react';
import type { Product, Service, StoreData } from '@/lib/data/mock-store-data';
import StoreProductCard from '@/components/store/store-product-card';
import StoreServiceCard from '@/components/store/store-service-card';
import StoreSection from '@/components/store/store-section';
import { Palette, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CraftsShowcaseSectionProps {
  products: Product[];
  services?: Service[]; // Optional workshops or custom order services
  storeData: StoreData | null;
  onViewItemDetails: (item: Product | Service) => void;
}

const CraftsShowcaseSection: React.FC<CraftsShowcaseSectionProps> = ({ products, services, storeData, onViewItemDetails }) => {
  if ((!products || products.length === 0) && (!services || services.length === 0)) return null;

  const featuredProducts = products.filter(p => storeData?.featuredProductIds?.includes(p.id) || p.isBestseller || p.isNew).slice(0, 3);
  const featuredServices = services?.filter(s => storeData?.featuredServiceIds?.includes(s.id)).slice(0, 2);

  return (
    <StoreSection
      title="إبداعات يدوية فريدة"
      icon={Palette}
      accentColor={storeData?.accentColor}
      description="اكتشفي قطعًا فنية مصنوعة بشغف وحرفية عالية، كل قطعة تحكي قصة."
      className="my-10"
    >
      {featuredProducts.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4" style={{color: storeData?.accentColor || 'hsl(var(--primary))'}}>أبرز المنتجات اليدوية</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <StoreProductCard
                key={product.id}
                product={product}
                accentColor={storeData?.accentColor}
                onViewDetails={onViewItemDetails}
                className="transition-all duration-300 ease-in-out hover:shadow-2xl"
              />
            ))}
          </div>
        </div>
      )}

      {featuredServices && featuredServices.length > 0 && (
        <div className="mb-8">
           <h3 className="text-2xl font-semibold mb-4" style={{color: storeData?.accentColor || 'hsl(var(--primary))'}}>ورش عمل وخدمات مخصصة</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredServices.map(service => (
                <StoreServiceCard
                    key={service.id}
                    service={service}
                    accentColor={storeData?.accentColor}
                    onViewDetails={onViewItemDetails}
                    className="transition-all duration-300 ease-in-out hover:shadow-2xl"
                />
            ))}
           </div>
        </div>
      )}
      
      {storeData?.story && (
        <div className="mt-12 p-6 rounded-lg" style={{backgroundColor: `${storeData.accentColor}1A`}}>
            <h4 className="text-xl font-semibold mb-2 flex items-center" style={{color: storeData.accentColor}}>
                <Sparkles size={22} className="ml-2"/> من وحي الفنانة
            </h4>
            <p className="text-foreground/80 leading-relaxed italic">"{storeData.story}"</p>
            <p className="text-sm font-medium mt-2 text-right" style={{color: storeData.accentColor}}>- {storeData.sellerName}</p>
        </div>
      )}
    </StoreSection>
  );
};

export default CraftsShowcaseSection;
