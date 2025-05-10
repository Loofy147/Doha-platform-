// src/components/product-detail/product-image-carousel.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion'; // For thumbnail animations

interface ProductImageCarouselProps {
  images: string[];
  itemName: string;
  effectiveAccentColor: string;
  currentSlide: number;
  carouselApi: CarouselApi | undefined;
  setCarouselApi: (api: CarouselApi | undefined) => void;
  onThumbnailClick: (index: number) => void;
  dataAiHint?: string;
}

export function ProductImageCarousel({
  images,
  itemName,
  effectiveAccentColor,
  currentSlide,
  carouselApi, // This prop is received but not directly used inside for <Carousel setApi={...}> as it's managed by the parent.
  setCarouselApi, // This is used to set the API in the parent
  onThumbnailClick,
  dataAiHint,
}: ProductImageCarouselProps) {
  if (!images || images.length === 0) {
    images = ['https://picsum.photos/800/600?grayscale&blur=2']; // Default placeholder
  }

  return (
    <div className="space-y-4">
      <Carousel
        setApi={setCarouselApi} // Use the passed setter for the Carousel instance
        className="relative shadow-xl rounded-xl overflow-hidden group border border-border/50"
        opts={{ loop: images.length > 1 }}
      >
        <CarouselContent>
          {images.map((imgSrc, index) => (
            <CarouselItem key={index}>
              <div className="aspect-square md:min-h-[450px] relative bg-muted/30">
                <Image
                  src={imgSrc}
                  alt={`${itemName} - صورة ${index + 1}`}
                  fill
                  className="object-contain rounded-lg p-2"
                  data-ai-hint={dataAiHint || 'product image'}
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-card/70 hover:bg-card w-8 h-8"
              style={{ color: effectiveAccentColor }}
              aria-label="الصورة السابقة"
            />
            <CarouselNext
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-card/70 hover:bg-card w-8 h-8"
              style={{ color: effectiveAccentColor }}
              aria-label="الصورة التالية"
            />
          </>
        )}
      </Carousel>
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((imgSrc, index) => (
            <motion.button
              key={`thumb-${index}`}
              onClick={() => onThumbnailClick(index)}
              className={cn(
                "aspect-square rounded-md overflow-hidden border-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
                currentSlide === index ? 'ring-2 ring-offset-2' : 'border-border/50 hover:border-muted-foreground/50'
              )}
              style={currentSlide === index ? { borderColor: effectiveAccentColor, ringColor: `${effectiveAccentColor}80` } : {}}
              aria-label={`عرض الصورة ${index + 1}`}
              whileHover={{ scale: 1.05, borderColor: effectiveAccentColor }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Image
                src={imgSrc}
                alt={`صورة مصغرة ${index + 1}`}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
