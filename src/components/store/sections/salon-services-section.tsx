// src/components/store/sections/salon-services-section.tsx
'use client';

import React from 'react';
import type { Service, StoreData } from '@/lib/data/mock-store-data';
import StoreSection from '@/components/store/store-section';
import { Button } from '@/components/ui/button';
import { Card as UICard, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarPlus, Sparkle, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SalonServicesSectionProps {
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

const SalonServicesSection: React.FC<SalonServicesSectionProps> = ({ services, storeData, onViewServiceDetails }) => {
  if (!services || services.length === 0) {
    return (
        <StoreSection title="خدماتنا المميزة" icon={Sparkle} accentColor={storeData?.accentColor}>
            <p className="text-muted-foreground text-center py-4">لم يتم إضافة خدمات بعد. يرجى التحقق لاحقًا!</p>
        </StoreSection>
    );
  }
  const accent = storeData?.accentColor || 'hsl(var(--primary))';

  return (
    <StoreSection 
        title="خدماتنا المميزة" 
        icon={Sparkle} 
        accentColor={accent}
        description="اكتشفي مجموعة خدماتنا المصممة لتدليلكِ وإبراز جمالكِ."
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
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={{ visible: { transition: { staggerChildren: 0.1 }}}}
            initial="hidden"
            animate="visible"
           >
            {services.map((service, index) => (
              <motion.div key={service.id || index} variants={cardVariants} custom={index}>
                <UICard 
                  className={cn(
                    "shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col",
                    storeData?.themeStyle === 'dark' || storeData?.themeStyle === 'elegant' ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-700/90 text-slate-100' : 'bg-card text-card-foreground hover:bg-card/95'
                    )}
                >
                  <CardHeader>
                    <CardTitle className="text-xl" style={{color: accent}}>{service.name}</CardTitle>
                    {service.duration && <CardDescription className="text-sm text-muted-foreground">{service.duration}</CardDescription>}
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {service.description && <p className={cn("mb-3 text-sm", storeData?.themeStyle === 'dark' || storeData?.themeStyle === 'elegant' ? 'text-slate-300' : 'text-foreground/80')}>{service.description}</p>}
                    {service.stylistName && <p className="text-xs text-muted-foreground mb-2 flex items-center"><User size={14} className="ml-1" /> مقدمة من: {service.stylistName}</p>}
                    <p className="text-lg font-semibold" style={{color: accent ? `${accent}cc` : 'hsl(var(--accent-pink))'}}>{service.price}</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full text-white hover:opacity-95 transition-opacity"
                      style={{backgroundColor: accent}}
                      onClick={() => onViewServiceDetails(service)}
                     >
                      <CalendarPlus size={18} className="ml-2" /> احجزي موعدكِ
                    </Button>
                  </CardFooter>
                </UICard>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </UICard>
    </StoreSection>
  );
};

export default SalonServicesSection;
