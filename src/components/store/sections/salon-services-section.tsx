// src/components/store/sections/salon-services-section.tsx
'use client';

import React from 'react';
import type { Service, StoreData } from '@/lib/data/mock-store-data';
import StoreSection from '@/components/store/store-section';
import { Button } from '@/components/ui/button';
import { Card as UICard, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; // Renamed Card to UICard
import { CalendarPlus, Sparkle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SalonServicesSectionProps {
  services: Service[]; 
  storeData: StoreData | null;
  onViewServiceDetails: (service: Service) => void; 
}

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
    >
      <UICard // Use renamed UICard
        className="p-4 md:p-6 shadow-inner"
        style={{ 
          borderColor: `${accent}4D`, 
          backgroundColor: `${accent}1A` 
        }}
      >
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <UICard // Use renamed UICard
                key={service.id || index} 
                className={cn(
                  "shadow-lg hover:shadow-xl transition-shadow",
                  storeData?.themeStyle === 'dark' || storeData?.themeStyle === 'elegant' ? 'bg-slate-800/70 border-slate-700 text-slate-100' : 'bg-card text-card-foreground'
                  )}
              >
                <CardHeader>
                  <CardTitle className="text-xl" style={{color: accent}}>{service.name}</CardTitle>
                  {service.duration && <CardDescription className="text-sm text-muted-foreground">{service.duration}</CardDescription>}
                </CardHeader>
                <CardContent>
                  {service.description && <p className={cn("mb-3 text-sm", storeData?.themeStyle === 'dark' || storeData?.themeStyle === 'elegant' ? 'text-slate-300' : 'text-foreground/80')}>{service.description}</p>}
                  <p className="text-lg font-semibold" style={{color: accent ? `${accent}cc` : 'hsl(var(--accent-pink))'}}>{service.price}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full text-white"
                    style={{backgroundColor: accent}}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    onClick={() => onViewServiceDetails(service)}
                   >
                    <CalendarPlus size={18} className="ml-2" /> احجزي موعدكِ
                  </Button>
                </CardFooter>
              </UICard>
            ))}
          </div>
        </CardContent>
      </UICard>
    </StoreSection>
  );
};

export default SalonServicesSection;

    