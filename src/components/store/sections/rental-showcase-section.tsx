// src/components/store/sections/rental-showcase-section.tsx
'use client';

import React from 'react';
import type { Product, StoreData } from '@/lib/data/mock-store-data';
import StoreProductCard from '@/components/store/store-product-card';
import StoreSection from '@/components/store/store-section';
import { CalendarDays, Sparkles } from 'lucide-react';
import { Card as UICard, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface RentalShowcaseSectionProps {
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

const RentalShowcaseSection: React.FC<RentalShowcaseSectionProps> = ({ products, storeData, onViewProductDetails }) => {
  if (!products || products.length === 0) return null;

  const featuredRentals = products.filter(p => storeData?.featuredProductIds?.includes(p.id) || p.isBestseller || p.isNew).slice(0, 4);
  const accent = storeData?.accentColor || 'hsl(var(--primary))';

  return (
    <StoreSection
      title="استأجري إطلالتكِ أو احتياجاتكِ"
      icon={CalendarDays}
      accentColor={accent}
      description="اكتشفي مجموعتنا المختارة من المنتجات المتاحة للإيجار. حلول أنيقة وعملية لمناسباتكِ ومشروعاتكِ."
      className="my-10"
    >
      <UICard
        className="p-4 md:p-6 shadow-inner rounded-xl"
        style={{ 
          borderColor: `${accent}4D`, 
          backgroundColor: `${accent}1A` 
        }}
      >
        <CardContent className="p-0">
          {featuredRentals.length > 0 && (
            <div className="mb-8">
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={{ visible: { transition: { staggerChildren: 0.1 }}}}
                initial="hidden"
                animate="visible"
              >
                {featuredRentals.map((product, index) => (
                  <motion.div key={product.id} variants={cardVariants} custom={index}>
                    <StoreProductCard
                      product={product}
                      accentColor={accent}
                      onViewDetails={onViewProductDetails}
                      className={cn(
                          "transition-all duration-300 ease-in-out hover:shadow-2xl h-full",
                           storeData?.themeStyle === 'dark' || storeData?.themeStyle === 'elegant' ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-700/90' : 'bg-card hover:bg-card/95'
                      )}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
          
          {storeData?.policies?.customPolicy && (
             <UICard
                className={cn(
                    "mt-12",
                    storeData?.themeStyle === 'dark' || storeData?.themeStyle === 'elegant' ? 'bg-slate-700/80 border-slate-600 text-slate-100' : 'bg-card/80 border'
                )} 
                style={{borderColor: storeData.accentColor}}
            >
                <CardHeader>
                    <CardTitle className="text-xl flex items-center" style={{color: storeData.accentColor}}>
                        <Sparkles size={22} className="ml-2"/> {storeData.policies.customPolicy.title || "معلومات هامة للإيجار"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className={cn( storeData?.themeStyle === 'dark' || storeData?.themeStyle === 'elegant' ? 'text-slate-300' : 'text-foreground/80', "whitespace-pre-line")}>{storeData.policies.customPolicy.content}</p>
                </CardContent>
             </UICard>
          )}
        </CardContent>
      </UICard>
    </StoreSection>
  );
};

export default RentalShowcaseSection;
