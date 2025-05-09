// src/components/store/sections/fashion-lookbook-section.tsx
'use client';

import React from 'react';
import type { Product, StoreData } from '@/lib/data/mock-store-data'; 
import StoreProductCard from '@/components/store/store-product-card';
import StoreSection from '@/components/store/store-section';
import { Shirt, Sparkles } from 'lucide-react'; 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface FashionLookbookSectionProps {
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


const FashionLookbookSection: React.FC<FashionLookbookSectionProps> = ({ products, storeData, onViewProductDetails }) => {
  if (!products || products.length === 0) return null;
  const accent = storeData?.accentColor || 'hsl(var(--primary))';

  const lookbookItems = products.filter(p => p.isNew || p.isBestseller).slice(0, 6);

  return (
    <StoreSection 
        title="أحدث إطلالات الموسم" 
        icon={Shirt} 
        accentColor={accent}
        description="تصفحي مجموعتنا الجديدة من الأزياء والإكسسوارات لتتألقي في كل مناسبة."
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
            {(lookbookItems.length > 0 ? lookbookItems : products.slice(0,6)).map((product, index) => ( 
              <motion.div key={product.id} variants={cardVariants} custom={index}>
                <StoreProductCard 
                  product={product} 
                  accentColor={accent} 
                  onViewDetails={onViewProductDetails}
                  className={cn(
                    "group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 h-full",
                    storeData?.themeStyle === 'dark' || storeData?.themeStyle === 'elegant' ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-700/90' : 'bg-card hover:bg-card/95'
                  )}
                />
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
      {storeData?.story && (
         <Card className="mt-8" style={{borderColor: accent, backgroundColor: `${accent}0D`}}>
             <CardHeader>
                 <CardTitle className="text-lg flex items-center" style={{color: accent}}><Sparkles size={20} className="ml-2"/> فلسفة الأناقة لدينا</CardTitle>
             </CardHeader>
             <CardContent>
                 <p className="italic text-sm text-foreground/75">"{storeData.story}"</p>
                 <p className="text-xs font-medium mt-2 text-right" style={{color: accent}}>- {storeData.sellerName}</p>
             </CardContent>
         </Card>
      )}
    </StoreSection>
  );
};

export default FashionLookbookSection;
