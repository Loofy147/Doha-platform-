// src/components/store/sections/bakery-specials-section.tsx
'use client';

import React from 'react';
import type { Product, StoreData } from '@/lib/data/mock-store-data';
import StoreProductCard from '@/components/store/store-product-card';
import StoreSection from '@/components/store/store-section';
import { CakeSlice, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface BakerySpecialsSectionProps {
  products: Product[];
  storeData: StoreData | null;
  onViewProductDetails: (product: Product) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const BakerySpecialsSection: React.FC<BakerySpecialsSectionProps> = ({ products, storeData, onViewProductDetails }) => {
  if (!products || products.length === 0) return null;
  const accent = storeData?.accentColor || 'hsl(var(--primary))';

  return (
    <StoreSection 
      title="أشهى ما لدينا اليوم" 
      icon={CakeSlice} 
      accentColor={accent}
      description="اكتشفي أجدد وألذ المخبوزات والحلويات الطازجة المحضرة بحب."
      className="my-10"
    >
      <Card 
        className="p-4 md:p-6 shadow-inner rounded-xl"
        style={{ 
          borderColor: `${accent}4D`, 
          backgroundColor: `${accent}1A` 
        }}
      >
        <CardContent className="p-0">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={{ visible: { transition: { staggerChildren: 0.1 }}}} 
            initial="hidden"
            animate="visible"
          >
            {products.map((product, index) => (
              <motion.div key={product.id} variants={cardVariants} custom={index}>
                <StoreProductCard 
                  product={product} 
                  accentColor={accent} 
                  onViewDetails={onViewProductDetails}
                  className={cn(
                    "transform hover:scale-105 transition-transform duration-300 h-full",
                    storeData?.themeStyle === 'dark' || storeData?.themeStyle === 'elegant' ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-700/90' : 'bg-card hover:bg-card/95' 
                  )}
                />
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
      
    </StoreSection>
  );
};

export default BakerySpecialsSection;
