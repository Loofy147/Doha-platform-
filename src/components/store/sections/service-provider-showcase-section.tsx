// src/components/store/sections/service-provider-showcase-section.tsx
'use client';

import React from 'react';
import type { Service, StoreData } from '@/lib/data/mock-store-data';
import StoreServiceCard from '@/components/store/store-service-card';
import StoreSection from '@/components/store/store-section';
import { Handshake, UserCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card as UICard, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ServiceProviderShowcaseSectionProps {
  services: Service[];
  storeData: StoreData | null;
  onViewServiceDetails: (service: Service) => void;
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

const ServiceProviderShowcaseSection: React.FC<ServiceProviderShowcaseSectionProps> = ({ services, storeData, onViewServiceDetails }) => {
  if (!services || services.length === 0) return null;

  const featuredServices = services.filter(s => storeData?.featuredServiceIds?.includes(s.id) || s.tags?.includes('مميز')).slice(0, 3);
  const accent = storeData?.accentColor || 'hsl(var(--primary))';

  return (
    <StoreSection
      title="خدمات احترافية تلبي احتياجاتكِ"
      icon={UserCheck}
      accentColor={accent}
      description="نقدم مجموعة من الخدمات المتخصصة لمساعدتكِ في تحقيق أهدافكِ. اكتشفي كيف يمكننا دعمكِ."
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
          {featuredServices.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4" style={{color: accent}}>خدماتنا المميزة</h3>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={{ visible: { transition: { staggerChildren: 0.1 }}}}
                initial="hidden"
                animate="visible"
              >
                {featuredServices.map((service, index) => (
                  <motion.div key={service.id} variants={cardVariants} custom={index}>
                    <StoreServiceCard
                      service={service}
                      accentColor={accent}
                      onViewDetails={onViewServiceDetails}
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
            <UICard
                className={cn(
                    "mt-12",
                    storeData?.themeStyle === 'dark' || storeData?.themeStyle === 'elegant' ? 'bg-slate-700/80 border-slate-600 text-slate-100' : 'bg-card/80 border'
                )} 
                style={{borderColor: storeData.accentColor}}
            >
                <CardHeader>
                    <CardTitle className="text-xl flex items-center" style={{color: storeData.accentColor}}>
                        <Sparkles size={22} className="ml-2"/> لماذا تختارين خدماتنا؟
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className={cn(storeData?.themeStyle === 'dark' || storeData?.themeStyle === 'elegant' ? 'text-slate-300' : 'text-foreground/80', "whitespace-pre-line italic")}>"{storeData.story}"</p>
                    <p className="text-sm font-medium mt-2 text-right" style={{color: storeData.accentColor}}>- {storeData.sellerName}</p>
                </CardContent>
             </UICard>
          )}

          <div className="text-center mt-10">
            <Button 
                size="lg"
                style={{backgroundColor: accent}}
                className="text-white hover:opacity-90"
                onClick={() => document.getElementById('contact-store')?.scrollIntoView({ behavior: 'smooth' })}
            >
                <Handshake size={20} className="ml-2"/> تواصلي معنا لمناقشة احتياجاتكِ
            </Button>
          </div>
        </CardContent>
      </UICard>
    </StoreSection>
  );
};

export default ServiceProviderShowcaseSection;
