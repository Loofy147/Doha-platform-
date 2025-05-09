// src/components/store/sections/fashion-lookbook-section.tsx
'use client';

import React from 'react';
import type { Product, StoreData } from '@/lib/data/mock-store-data'; 
import StoreProductCard from '@/components/store/store-product-card';
import StoreSection from '@/components/store/store-section';
import { Shirt } from 'lucide-react'; 
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FashionLookbookSectionProps {
  products: Product[];
  storeData: StoreData | null;
  onViewProductDetails: (product: Product) => void;
}

const FashionLookbookSection: React.FC<FashionLookbookSectionProps> = ({ products, storeData, onViewProductDetails }) => {
  if (!products || products.length === 0) return null;
  const accent = storeData?.accentColor || 'hsl(var(--primary))';

  return (
    <StoreSection 
        title="أحدث إطلالات الموسم" 
        icon={Shirt} 
        accentColor={accent}
        description="تصفحي مجموعتنا الجديدة من الأزياء والإكسسوارات لتتألقي في كل مناسبة."
    >
      <Card 
        className="p-4 md:p-6 shadow-inner"
        style={{ 
          borderColor: `${accent}4D`, 
          backgroundColor: `${accent}1A` 
        }}
      >
        <CardContent className="p-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <StoreProductCard 
                key={product.id} 
                product={product} 
                accentColor={accent} 
                onViewDetails={onViewProductDetails}
                className={cn(
                  "group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300",
                  storeData?.themeStyle === 'dark' || storeData?.themeStyle === 'elegant' ? 'bg-slate-800/70 border-slate-700' : 'bg-card'
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </StoreSection>
  );
};

export default FashionLookbookSection;

    