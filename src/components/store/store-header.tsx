// src/components/store/store-header.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, Share2, type LucideProps } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from '@/lib/utils';
import type { StoreData, StoreType } from '@/lib/data/mock-store-data';
import { motion } from 'framer-motion';
import { CookingPot, Shirt, Scissors, Palette as PaletteIcon, CalendarDays, Handshake, Store as StoreIconLucide } from 'lucide-react';


interface StoreHeaderProps {
  storeData: StoreData;
  storeAccentColor: string;
  setIsContactModalOpen: (isOpen: boolean) => void; // Added for contact button
  itemVariants: any; // Framer motion variants
}

const getStoreTypeSpecificIcon = (type?: StoreType): React.ElementType<LucideProps> => {
  switch (type) {
    case 'bakery': return CookingPot;
    case 'fashion': return Shirt;
    case 'salon': return Scissors;
    case 'crafts': return PaletteIcon;
    case 'rental': return CalendarDays;
    case 'service_provider': return Handshake;
    default: return StoreIconLucide;
  }
};

export function StoreHeader({ storeData, storeAccentColor, setIsContactModalOpen, itemVariants }: StoreHeaderProps) {
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();
  const StoreTypeSpecificIcon = getStoreTypeSpecificIcon(storeData.storeType);
  const storeThemeStyle = storeData.themeStyle || 'light';

  return (
    <motion.header className="relative group" variants={itemVariants}>
      <div className="h-48 md:h-64 lg:h-80 w-full overflow-hidden">
        <Carousel
          plugins={storeData.bannerImages.length > 1 ? [Autoplay({ delay: 5000, stopOnInteraction: false })] : []}
          opts={{ loop: storeData.bannerImages.length > 1 }}
          className="h-full w-full"
          setApi={setCarouselApi}
        >
          <CarouselContent className="h-full">
            {storeData.bannerImages.map((src, index) => (
              <CarouselItem key={index} className="h-full">
                <Image
                  src={src}
                  alt={`${storeData.name} بانر ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  data-ai-hint={storeData.dataAiHintBanner[index % storeData.dataAiHintBanner.length]}
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {storeData.bannerImages.length > 1 && (
            <>
              <CarouselPrevious aria-label="الصورة السابقة للبانر" className="absolute right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-card/70 hover:bg-card" style={{ color: storeAccentColor }} />
              <CarouselNext aria-label="الصورة التالية للبانر" className="absolute left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-card/70 hover:bg-card" style={{ color: storeAccentColor }} />
            </>
          )}
        </Carousel>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20 relative z-10">
        <div className={cn(
          "p-6 rounded-xl shadow-2xl flex flex-col md:flex-row items-center gap-6",
          storeThemeStyle === 'elegant' && "bg-slate-700/90 backdrop-blur-md border border-slate-600 text-slate-50",
          storeThemeStyle === 'dark' && "bg-gray-800/90 backdrop-blur-md border border-gray-700 text-gray-100",
          (storeThemeStyle === 'light' || storeThemeStyle === 'playful' || storeThemeStyle === 'modern-minimal') && "bg-card/90 backdrop-blur-md border border-border text-card-foreground"
        )}>
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 shadow-lg" style={{ borderColor: storeAccentColor }}>
            <AvatarImage src={storeData.logo} alt={`${storeData.name} شعار`} data-ai-hint={storeData.dataAiHintLogo} />
            <AvatarFallback className="text-3xl" style={{ backgroundColor: `${storeAccentColor}33`, color: storeAccentColor }}>
              {storeData.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-right">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: storeThemeStyle === 'elegant' || storeThemeStyle === 'dark' ? 'hsl(var(--card-foreground))' : storeAccentColor }}>
              {storeData.name}
            </h1>
            {storeData.slogan && <p className="mt-1 text-md md:text-lg" style={{ color: storeThemeStyle === 'elegant' || storeThemeStyle === 'dark' ? 'hsl(var(--muted-foreground))' : 'hsl(var(--muted-foreground))' }}>{storeData.slogan}</p>}
            <div className="mt-2 flex items-center justify-center md:justify-start gap-2">
              <Badge variant="outline" className="gap-1.5 text-sm py-1 px-2.5 border-current" style={{ color: storeAccentColor, borderColor: storeAccentColor }}>
                <StoreTypeSpecificIcon className="w-4 h-4" />
                {storeData.productTypes.find(pt => pt.id === storeData.storeType)?.name || storeData.storeType}
              </Badge>
              <Badge variant="outline" className="gap-1.5 text-sm py-1 px-2.5 border-current" style={{ color: storeAccentColor, borderColor: storeAccentColor }}>
                <Star className="w-4 h-4 fill-current" />
                {storeData.rating.toFixed(1)} ({storeData.reviewsCount} تقييم)
              </Badge>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col items-center gap-2 mt-4 md:mt-0 self-center md:self-start">
            <Button variant="outline" size="sm" className="w-full md:w-auto" style={{ borderColor: storeAccentColor, color: storeAccentColor }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${storeAccentColor}1A`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              aria-label="إضافة المتجر إلى المفضلة"
            >
              <Heart className="w-4 h-4 ml-2" /> أضيفي للمفضلة
            </Button>
            <Button variant="outline" size="sm" className="w-full md:w-auto" style={{ borderColor: storeAccentColor, color: storeAccentColor }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${storeAccentColor}1A`}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              onClick={() => setIsContactModalOpen(true)}
              aria-label="التواصل مع المتجر"
            >
              <MessageSquare className="w-4 h-4 ml-2" /> تواصلي مع المتجر
            </Button>
             <Button variant="outline" size="sm" className="w-full md:w-auto" style={{borderColor: storeAccentColor, color: storeAccentColor}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${storeAccentColor}1A`}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                aria-label="مشاركة المتجر"
              >
                <Share2 className="w-4 h-4 ml-2" /> شاركي المتجر
              </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
