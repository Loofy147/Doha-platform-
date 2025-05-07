// src/components/store/sections/bakery-specials-section.tsx
'use client';

import React from 'react';
import type { Product, StoreData } from '@/lib/data/mock-store-data';
import StoreProductCard from '@/components/store/store-product-card';
import StoreSection from '@/components/store/store-section';
import { CakeSlice } from 'lucide-react';

interface BakerySpecialsSectionProps {
  products: Product[];
  storeData: StoreData | null;
  onViewProductDetails: (product: Product) => void;
}

const BakerySpecialsSection: React.FC<BakerySpecialsSectionProps> = ({ products, storeData, onViewProductDetails }) => {
  if (!products || products.length === 0) return null;

  return (
    <StoreSection 
      title="أشهى ما لدينا اليوم" 
      icon={CakeSlice} 
      accentColor={storeData?.accentColor}
      description="اكتشفي أجدد وألذ المخبوزات والحلويات الطازجة المحضرة بحب."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <StoreProductCard 
            key={product.id} 
            product={product} 
            accentColor={storeData?.accentColor} 
            onViewDetails={onViewProductDetails}
            className="transform hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>
    </StoreSection>
  );
};

export default BakerySpecialsSection;
