// src/components/sections/daily-deals-section.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarClock, Percent, Eye, ChevronLeft } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from 'framer-motion';

const mockDailyDeals = [
  {
    id: 'deal-daily-1',
    title: 'خصم 25% على كيكة الفراولة اليوم فقط!',
    description: 'دللي نفسك بكيكة الفراولة الطازجة بخصم خاص. العرض ينتهي منتصف الليل.',
    imageSrc: 'https://picsum.photos/seed/dailystrawberry/350/220',
    dataAiHint: 'strawberry cake slice',
    originalPrice: '6,000 دج',
    dealPrice: '4,500 دج',
    storeName: 'حلويات الأحلام',
    storeSlug: 'mathaq-albayt', 
    productLink: '/products/mathaq-prod1', 
  },
  {
    id: 'deal-daily-2',
    title: 'توصيل مجاني لطلبات الإكسسوارات اليوم!',
    description: 'اطلبي أي قطعة إكسسوار من متجر "إبداعات نادية" واحصلي على توصيل مجاني داخل المدينة.',
    imageSrc: 'https://picsum.photos/seed/dailyjewelrydeal/350/220',
    dataAiHint: 'handmade necklace earring',
    storeName: 'إبداعات نادية',
    storeSlug: 'lamsa-ibdaa', 
    productLink: '/store/lamsa-ibdaa?category=accessories', 
  },
  {
    id: 'deal-daily-3',
    title: 'اشترِ قطعتين صابون يدوي واحصل على الثالثة مجاناً!',
    description: 'عرض اليوم: دللي بشرتك مع صابوننا الطبيعي المصنوع يدوياً.',
    imageSrc: 'https://picsum.photos/seed/dailysoapdeal/350/220',
    dataAiHint: 'handmade soap bars',
    storeName: 'لمسة الطبيعة',
    storeSlug: 'lamsa-ibdaa', 
    productLink: '/products/common-prod1', 
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function DailyDealsSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <section id="daily-deals" className="py-16 lg:py-24 bg-gradient-to-br from-accent-pink/10 via-background to-accent-yellow/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <CalendarClock className="mx-auto h-12 w-12 text-accent-pink animate-ping-slow" />
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            عروض اليوم الذهبية
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            لا تفوتي فرصتكِ! عروض حصرية تتجدد يوميًا لتستمتعي بأفضل المنتجات والخدمات بأسعار لا تُقاوم.
          </p>
        </div>
        
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
            direction: "rtl",
          }}
        >
          <CarouselContent className="-ml-4"> 
            {mockDailyDeals.map((deal, index) => (
              <CarouselItem key={deal.id} className="pl-4 md:basis-1/2 lg:basis-1/3"> 
                <motion.div 
                  className="p-1 h-full"
                  variants={cardVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={index}
                >
                  <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl group flex flex-col h-full border-2 border-accent-pink/30 hover:border-accent-pink focus-within:border-accent-pink focus-within:ring-2 focus-within:ring-accent-pink/50">
                    <CardHeader className="p-0 relative">
                      <div className="aspect-video relative overflow-hidden rounded-t-xl">
                        <Image 
                          src={deal.imageSrc} 
                          alt={deal.title} 
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          data-ai-hint={deal.dataAiHint}
                        />
                        <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center animate-pulse" style={{animationDuration: '2s'}}>
                          <Percent size={14} className="ml-1" /> عرض اليوم
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 flex-grow flex flex-col">
                      <CardTitle className="text-lg font-semibold text-primary mb-2 group-hover:text-accent-pink transition-colors">
                        {deal.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-foreground/70 mb-2 flex-grow line-clamp-2">
                        {deal.description}
                      </CardDescription>
                      <p className="text-xs text-muted-foreground mb-2">
                        متوفر لدى: <Link href={`/store/${deal.storeSlug}`} className="text-accent-purple hover:underline font-medium">{deal.storeName}</Link>
                      </p>
                      <div className="flex items-baseline gap-2 mt-auto">
                        <p className="text-2xl font-bold text-accent-pink">{deal.dealPrice}</p>
                        {deal.originalPrice && (
                          <p className="text-md text-muted-foreground line-through">{deal.originalPrice}</p>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 border-t">
                      <Button asChild variant="default" className="w-full bg-accent-pink hover:bg-accent-pink/90 text-accent-pink-foreground group/button transform hover:scale-105 transition-transform duration-200">
                        <Link href={deal.productLink}>
                          <Eye className="ml-2 h-4 w-4 group-hover/button:animate-ping-slow" style={{animationDuration: '1.5s'}} /> اغتنمي العرض
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
          <Button size="lg" variant="outline" asChild className="border-accent-purple text-accent-purple hover:bg-accent-purple/10 group transform hover:scale-105 transition-transform duration-200">
            <Link href="/deals?filter=daily">
              اكتشفي كل عروض اليوم <ChevronLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
