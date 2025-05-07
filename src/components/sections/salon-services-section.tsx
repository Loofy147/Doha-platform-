// src/components/store/sections/salon-services-section.tsx
'use client';

import React from 'react';
import type { StoreData, Service as GlobalService } from '@/lib/data/mock-store-data'; 
import StoreSection from '@/components/store/store-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarPlus, Sparkle } from 'lucide-react'; 

interface Service extends Pick<GlobalService, 'name' | 'price' | 'duration' | 'description' | 'id'> {}


interface SalonServicesSectionProps {
  services: Service[];
  storeData: StoreData | null;
  onBookService: (service: Service) => void; 
}

const SalonServicesSection: React.FC<SalonServicesSectionProps> = ({ services, storeData, onBookService }) => {
  if (!services || services.length === 0) {
    return (
        <StoreSection title="خدماتنا المميزة" icon={Sparkle} accentColor={storeData?.accentColor}>
            <p className="text-muted-foreground text-center py-4">لم يتم إضافة خدمات بعد. يرجى التحقق لاحقًا!</p>
        </StoreSection>
    );
  }

  return (
    <StoreSection 
        title="خدماتنا المميزة" 
        icon={Sparkle} 
        accentColor={storeData?.accentColor}
        description="اكتشفي مجموعة خدماتنا المصممة لتدليلكِ وإبراز جمالكِ."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <Card key={service.id || index} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl" style={{color: storeData?.accentColor || 'hsl(var(--primary))'}}>{service.name}</CardTitle>
              {service.duration && <CardDescription className="text-sm text-muted-foreground">{service.duration}</CardDescription>}
            </CardHeader>
            <CardContent>
              {service.description && <p className="text-foreground/80 mb-3 text-sm">{service.description}</p>}
              <p className="text-lg font-semibold" style={{color: storeData?.accentColor ? `${storeData.accentColor}cc` : 'hsl(var(--accent-pink))'}}>{service.price}</p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full text-white"
                style={{backgroundColor: storeData?.accentColor || 'hsl(var(--primary))'}}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                onClick={() => onBookService(service)}
               >
                <CalendarPlus size={18} className="ml-2" /> احجزي موعدكِ
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </StoreSection>
  );
};

export default SalonServicesSection;
