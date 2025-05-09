// src/components/store/sections/bakery-specials-section.tsx
'use client';

import React from 'react';
import type { Product, StoreData } from '@/lib/data/mock-store-data';
import StoreProductCard from '@/components/store/store-product-card';
import StoreSection from '@/components/store/store-section';
import { CakeSlice } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card'; // Import Card and CardContent
import { cn } from '@/lib/utils';

interface BakerySpecialsSectionProps {
  products: Product[];
  storeData: StoreData | null;
  onViewProductDetails: (product: Product) => void;
}

const BakerySpecialsSection: React.FC<BakerySpecialsSectionProps> = ({ products, storeData, onViewProductDetails }) => {
  if (!products || products.length === 0) return null;
  const accent = storeData?.accentColor || 'hsl(var(--primary))';

  return (
    <StoreSection 
      title="أشهى ما لدينا اليوم" 
      icon={CakeSlice} 
      accentColor={accent}
      description="اكتشفي أجدد وألذ المخبوزات والحلويات الطازجة المحضرة بحب."
    >
      <Card 
        className="p-4 md:p-6 shadow-inner"
        style={{ 
          borderColor: `${accent}4D`, // 30% opacity for border
          backgroundColor: `${accent}1A` // 10% opacity for background
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
                  "transform hover:scale-105 transition-transform duration-300",
                  storeData?.themeStyle === 'dark' || storeData?.themeStyle === 'elegant' ? 'bg-slate-800/70 border-slate-700' : 'bg-card' // Adjust card background for dark themes
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </StoreSection>
  );
};

export default BakerySpecialsSection;

    