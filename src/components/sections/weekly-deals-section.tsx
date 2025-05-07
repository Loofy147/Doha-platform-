// src/components/sections/weekly-deals-section.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarRange, Percent, Eye, ChevronLeft } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from 'framer-motion';

const mockWeeklyDeals = [
  {
    id: 'deal-weekly-1',
    title: 'باقة العناية المتكاملة بخصم 20% هذا الأسبوع',
    description: 'احصلي على مجموعة منتجات العناية بالبشرة والشعر الفاخرة بسعر لا يُقاوم طوال هذا الأسبوع.',
    imageSrc: 'https://picsum.photos/seed/weeklyskincaredeal/400/250',
    dataAiHint: 'skincare haircare set',
    originalPrice: '12,000 دج',
    dealPrice: '9,600 دج',
    storeName: 'صالون فرح للتجميل',
    storeSlug: 'salon-farah',
    productLink: '/products/farah-prod2', // Assuming this product exists
  },
  {
    id: 'deal-weekly-2',
    title: 'خصم 15% على جميع خدمات تصميم الديكور هذا الأسبوع',
    description: 'جددي منزلكِ مع استشارة تصميم داخلي أو خدمة تنفيذ ديكور بخصم مميز.',
    imageSrc: 'https://picsum.photos/seed/weeklydecor/400/250',
    dataAiHint: 'modern living room interior design',
    storeName: 'لمسة إبداع نادية',
    storeSlug: 'lamsa-ibdaa',
    productLink: '/store/lamsa-ibdaa?category=services', // Link to services of the store
  },
  {
    id: 'deal-weekly-3',
    title: 'اشتري قطعتين من الحلويات الشرقية واحصل على الثالثة بنصف السعر!',
    description: 'عرض أسبوعي شهي على تشكيلة مختارة من الحلويات الشرقية الأصيلة.',
    imageSrc: 'https://picsum.photos/seed/weeklysweetsdeal/400/250',
    dataAiHint: 'assorted oriental sweets',
    storeName: 'مذاق البيت مع سارة',
    storeSlug: 'mathaq-albayt',
    productLink: '/store/mathaq-albayt?category=sweets',
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({ // Added index type
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: "circOut" } 
  })
};

export function WeeklyDealsSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section id="weekly-deals" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <CalendarRange className="mx-auto h-12 w-12 text-accent-purple" />
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            صفقات الأسبوع المميزة
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            عروض أسبوعية متجددة على أفضل المنتجات والخدمات. لا تدعي الفرصة تفوتكِ!
          </p>
        </div>
        
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: mockWeeklyDeals.length > 2, // Loop if more than 2 items for better UX
            direction: "rtl",
          }}
        >
          <CarouselContent className="-ml-4">
            {mockWeeklyDeals.map((deal, index) => (
              <CarouselItem key={deal.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  className="p-1 h-full"
                  custom={index}
                  variants={cardVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl group flex flex-col h-full border-2 border-accent-purple/30 hover:border-accent-purple focus-within:border-accent-purple focus-within:ring-2 focus-within:ring-accent-purple/50">
                    <CardHeader className="p-0 relative">
                      <Link href={deal.productLink} passHref className="block aspect-[16/10] relative overflow-hidden rounded-t-xl">
                        <Image
                          src={deal.imageSrc}
                          alt={deal.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          data-ai-hint={deal.dataAiHint}
                        />
                        <div className="absolute top-2 right-2 bg-accent-purple text-accent-purple-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center animate-pulse" style={{animationDelay: `${index * 0.1}s`, animationDuration: '2.2s'}}>
                          <Percent size={14} className="ml-1" /> عرض الأسبوع
                        </div>
                      </Link>
                    </CardHeader>
                    <CardContent className="p-4 flex-grow flex flex-col">
                      <CardTitle className="text-lg font-semibold text-primary mb-2 group-hover:text-accent-purple transition-colors">
                         <Link href={deal.productLink}>{deal.title}</Link>
                      </CardTitle>
                      <CardDescription className="text-xs text-foreground/70 mb-2 flex-grow line-clamp-2">
                        {deal.description}
                      </CardDescription>
                      <p className="text-xs text-muted-foreground mb-2">
                        مقدم من: <Link href={`/store/${deal.storeSlug}`} className="text-accent-pink hover:underline font-medium">{deal.storeName}</Link>
                      </p>
                      <div className="flex items-baseline gap-2 mt-auto">
                        <p className="text-2xl font-bold text-accent-purple">{deal.dealPrice}</p>
                        {deal.originalPrice && (
                          <p className="text-md text-muted-foreground line-through">{deal.originalPrice}</p>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 border-t">
                      <Button asChild variant="default" className="w-full bg-accent-purple hover:bg-accent-purple/90 text-accent-purple-foreground group/button transform hover:scale-105 transition-transform duration-200">
                        <Link href={deal.productLink}>
                          <Eye className="ml-2 h-4 w-4 group-hover/button:animate-ping-slow" style={{animationDuration: '1.6s'}} /> استفيدي من العرض
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex left-0 -translate-x-1/2 md:-translate-x-8 text-primary bg-card/80 hover:bg-card border-primary" />
          <CarouselNext className="hidden sm:flex right-0 translate-x-1/2 md:translate-x-8 text-primary bg-card/80 hover:bg-card border-primary" />
        </Carousel>

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" asChild className="border-primary text-primary hover:bg-primary/10 group transform hover:scale-105 transition-transform duration-200">
            <Link href="/products?filter=weekly-deals">
              تصفحي جميع عروض الأسبوع <ChevronLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
