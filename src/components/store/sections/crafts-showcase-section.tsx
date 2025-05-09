// src/components/store/sections/crafts-showcase-section.tsx
'use client';

import React from 'react';
import type { Product, Service, StoreData } from '@/lib/data/mock-store-data';
import StoreProductCard from '@/components/store/store-product-card';
import StoreServiceCard from '@/components/store/store-service-card';
import StoreSection from '@/components/store/store-section';
import { Palette, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; 
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';


interface CraftsShowcaseSectionProps {
  products: Product[];
  services?: Service[]; 
  storeData: StoreData | null;
  onViewItemDetails: (item: Product | Service) => void;
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


const CraftsShowcaseSection: React.FC<CraftsShowcaseSectionProps> = ({ products, services, storeData, onViewItemDetails }) => {
  if ((!products || products.length === 0) && (!services || services.length === 0)) return null;

  const featuredProducts = products.filter(p => storeData?.featuredProductIds?.includes(p.id) || p.isBestseller || p.isNew).slice(0, 3);
  const featuredServices = services?.filter(s => storeData?.featuredServiceIds?.includes(s.id)).slice(0, 2);
  const accent = storeData?.accentColor || 'hsl(var(--primary))';

  return (
    <StoreSection
      title="إبداعات يدوية فريدة"
      icon={Palette}
      accentColor={accent}
      description="اكتشفي قطعًا فنية مصنوعة بشغف وحرفية عالية، كل قطعة تحكي قصة."
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
          {featuredProducts.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4" style={{color: accent}}>أبرز المنتجات اليدوية</h3>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={{ visible: { transition: { staggerChildren: 0.1 }}}}
                initial="hidden"
                animate="visible"
               >
                {featuredProducts.map((product, index) => (
                  <motion.div key={product.id} variants={cardVariants} custom={index}>
                    <StoreProductCard
                      product={product}
                      accentColor={accent}
                      onViewDetails={onViewItemDetails}
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

          {featuredServices && featuredServices.length > 0 && (
            <div className="mb-8">
               <h3 className="text-2xl font-semibold mb-4" style={{color: accent}}>ورش عمل وخدمات مخصصة</h3>
               <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={{ visible: { transition: { staggerChildren: 0.1 }}}}
                  initial="hidden"
                  animate="visible"
                >
                {featuredServices.map((service, index) => (
                  <motion.div key={service.id} variants={cardVariants} custom={index}>
                    <StoreServiceCard
                        service={service}
                        accentColor={accent}
                        onViewDetails={onViewItemDetails}
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
          
          {storeData?.story && (
            <div className="mt-12 p-6 rounded-lg" style={{backgroundColor: `${accent}1A`, borderColor: `${accent}4D`, borderWidth: 1}}>
                <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-xl font-semibold flex items-center" style={{color: accent}}>
                        <Sparkles size={22} className="ml-2"/> من وحي الفنانة
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <p className={cn("leading-relaxed italic", storeData?.themeStyle === 'dark' || storeData?.themeStyle === 'elegant' ? 'text-slate-300' : 'text-foreground/80')}>"{storeData.story}"</p>
                    <p className="text-sm font-medium mt-2 text-right" style={{color: accent}}>- {storeData.sellerName}</p>
                </CardContent>
            </div>
          )}
        </CardContent>
      </Card>
    </StoreSection>
  );
};

export default CraftsShowcaseSection;
