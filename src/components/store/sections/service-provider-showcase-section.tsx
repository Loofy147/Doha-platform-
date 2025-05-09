// src/components/store/sections/service-provider-showcase-section.tsx
'use client';

import React from 'react';
import type { Service, StoreData } from '@/lib/data/mock-store-data';
import StoreServiceCard from '@/components/store/store-service-card';
import StoreSection from '@/components/store/store-section';
import { Handshake, UserCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card as UICard, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Renamed Card
import { cn } from '@/lib/utils';

interface ServiceProviderShowcaseSectionProps {
  services: Service[];
  storeData: StoreData | null;
  onViewServiceDetails: (service: Service) => void;
}

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
      <UICard // Use UICard
        className="p-4 md:p-6 shadow-inner"
        style={{ 
          borderColor: `${accent}4D`, 
          backgroundColor: `${accent}1A` 
        }}
      >
        <CardContent className="p-0">
          {featuredServices.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4" style={{color: accent}}>خدماتنا المميزة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredServices.map(service => (
                  <StoreServiceCard
                    key={service.id}
                    service={service}
                    accentColor={accent}
                    onViewDetails={onViewServiceDetails}
                    className={cn(
                        "transition-all duration-300 ease-in-out hover:shadow-2xl",
                        storeData?.themeStyle === 'dark' || storeData?.themeStyle === 'elegant' ? 'bg-slate-800/70 border-slate-700' : 'bg-card'
                    )}
                  />
                ))}
              </div>
            </div>
          )}
          
          {storeData?.story && (
            <UICard // Use UICard
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

    