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
import { cn } from '@/lib/utils';

const mockDailyDeals = [
  {
    id: 'deal-daily-1',
    productId: 'mathaq-prod1', // Link to the specific product ID
    title: 'خصم 25% على كيكة الفراولة اليوم فقط!',
    description: 'دللي نفسك بكيكة الفراولة الطازجة بخصم خاص. العرض ينتهي منتصف الليل.',
    imageSrc: 'https://picsum.photos/seed/dailystrawberry/350/220',
    dataAiHint: 'strawberry cake slice',
    originalPrice: '6,000 دج',
    dealPrice: '4,500 دج',
    storeName: 'مذاق البيت مع سارة',
    storeSlug: 'mathaq-albayt',
  },
  {
    id: 'deal-daily-2',
    productId: 'lamsa-prod1', // Link to a relevant product or category page in store
    title: 'توصيل مجاني لطلبات الإكسسوارات اليوم!',
    description: 'اطلبي أي قطعة إكسسوار من متجر "لمسة إبداع نادية" واحصلي على توصيل مجاني داخل المدينة.',
    imageSrc: 'https://picsum.photos/seed/dailyjewelrydeal/350/220',
    dataAiHint: 'handmade necklace earring',
    storeName: 'لمسة إبداع نادية',
    storeSlug: 'lamsa-ibdaa',
  },
  {
    id: 'deal-daily-3',
    productId: 'common-prod1', // Link to a relevant product
    title: 'اشترِ قطعتين شمع معطر واحصل على الثالثة مجاناً!',
    description: 'عرض اليوم: دللي حواسك مع شموع الصويا الطبيعية المصنوعة يدوياً.',
    imageSrc: 'https://picsum.photos/seed/dailycandlesdeal/350/220',
    dataAiHint: 'handmade scented candles',
    storeName: 'لمسة إبداع نادية', // Assuming candle is from this store
    storeSlug: 'lamsa-ibdaa',
  },
   {
    id: 'deal-daily-4',
    productId: 'anaqa-prod2', // Link to abaya product
    title: 'خصم 10% إضافي على إيجار العباءات اليوم',
    description: 'استأجري عباءة سوداء بتطريز فضي أو أي عباءة أخرى بخصم إضافي ليوم واحد فقط.',
    imageSrc: 'https://picsum.photos/seed/dailyabayadeal/350/220',
    dataAiHint: 'elegant abaya black',
    originalPrice: '7,000 دج / أسبوع',
    dealPrice: '6,300 دج / أسبوع',
    storeName: 'أناقة للإيجار مع ليلى',
    storeSlug: 'anaqa-lilijar',
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, duration: 0.5 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" }
  })
};


export function DailyDealsSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <motion.section
      id="daily-deals"
      className="py-16 lg:py-24 bg-gradient-to-br from-accent-pink/10 via-background to-accent-yellow/10"
      variants={sectionVariants} // Apply container variants
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          variants={itemVariants} // Use item variants for header
          custom={0} // Start animation immediately
        >
          <CalendarClock className="mx-auto h-12 w-12 text-accent-pink animate-ping-slow" style={{animationDuration: '1.5s'}}/>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            عروض اليوم الذهبية ✨
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            لا تفوتي فرصتكِ! عروض حصرية تتجدد يوميًا لتستمتعي بأفضل المنتجات والخدمات بأسعار لا تُقاوم.
          </p>
        </motion.div>

        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: mockDailyDeals.length > 2,
            direction: "rtl",
          }}
        >
          <CarouselContent className="-ml-4">
            {mockDailyDeals.map((deal, index) => (
              <CarouselItem key={deal.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  className="p-1 h-full"
                  custom={index + 1} // Stagger animation for cards
                  variants={itemVariants}
                  // Removed initial/whileInView from individual cards
                >
                  <Card className={cn(
                      "overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl group flex flex-col h-full",
                      "border-2 border-accent-pink/30 hover:border-accent-pink focus-within:border-accent-pink focus-within:ring-2 focus-within:ring-accent-pink/50",
                      "transform hover:-translate-y-1.5" // Add lift effect
                   )}>
                    <CardHeader className="p-0 relative">
                     <Link href={`/products/${deal.productId}`} passHref className="block aspect-[16/10] relative overflow-hidden rounded-t-xl">
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
                      </Link>
                    </CardHeader>
                    <CardContent className="p-4 flex-grow flex flex-col">
                      <CardTitle className="text-lg font-semibold text-primary mb-2 group-hover:text-accent-pink transition-colors">
                        <Link href={`/products/${deal.productId}`}>{deal.title}</Link>
                      </CardTitle>
                      <CardDescription className="text-xs text-foreground/70 mb-2 flex-grow line-clamp-2">
                        {deal.description}
                      </CardDescription>
                      <p className="text-xs text-muted-foreground mb-2">
                        متوفر لدى: <Link href={`/store/${deal.storeSlug}`} className="text-accent-purple hover:underline font-medium">{deal.storeName}</Link>
                      </p>
                      <div className="flex items-baseline gap-2 mt-auto">
                        {deal.dealPrice && <p className="text-2xl font-bold text-accent-pink">{deal.dealPrice}</p>}
                        {deal.originalPrice && (
                          <p className={cn("text-md text-muted-foreground", deal.dealPrice && "line-through")}>{deal.originalPrice}</p>
                        )}
                         {!deal.dealPrice && !deal.originalPrice && ( // Case for free shipping etc.
                           <p className="text-xl font-bold text-accent-pink">عرض خاص!</p>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-3 border-t">
                      <Button asChild variant="default" className="w-full bg-accent-pink hover:bg-accent-pink/90 text-accent-pink-foreground group/button transform hover:scale-105 transition-transform duration-200">
                        <Link href={`/products/${deal.productId}`}>
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

        <motion.div
          className="mt-12 text-center"
          variants={itemVariants}
          custom={mockDailyDeals.length + 1} // Animate button after cards
        >
          <Button size="lg" variant="outline" asChild className="border-accent-purple text-accent-purple hover:bg-accent-purple/10 group transform hover:scale-105 transition-transform duration-200">
            <Link href="/products?filter=daily-deals">
              اكتشفي كل عروض اليوم <ChevronLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
