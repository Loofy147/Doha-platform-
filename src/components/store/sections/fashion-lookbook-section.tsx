// src/components/store/sections/fashion-lookbook-section.tsx
'use client';

import React from 'react';
import type { Product, StoreData } from '@/app/store/[storeId]/page';
import StoreProductCard from '@/components/store/store-product-card';
import StoreSection from '@/components/store/store-section';
import { Shirt } from 'lucide-react'; // Or Dress icon if preferred

interface FashionLookbookSectionProps {
  products: Product[];
  storeData: StoreData | null;
  onViewProductDetails: (product: Product) => void;
}

const FashionLookbookSection: React.FC<FashionLookbookSectionProps> = ({ products, storeData, onViewProductDetails }) => {
  if (!products || products.length === 0) return null;

  return (
    <StoreSection 
        title="أحدث إطلالات الموسم" 
        icon={Shirt} 
        accentColor={storeData?.accentColor}
        description="تصفحي مجموعتنا الجديدة من الأزياء والإكسسوارات لتتألقي في كل مناسبة."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <StoreProductCard 
            key={product.id} 
            product={product} 
            accentColor={storeData?.accentColor} 
            onViewDetails={onViewProductDetails}
            className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
          />
        ))}
      </div>
    </StoreSection>
  );
};

export default FashionLookbookSection;
