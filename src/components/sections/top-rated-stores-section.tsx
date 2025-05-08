// src/components/sections/top-rated-stores-section.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Award, Star, Eye, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const mockTopRatedStores = [
  {
    id: 'lamsa-ibdaa', // Store slug as ID
    name: 'لمسة إبداع نادية',
    avatarSrc: 'https://picsum.photos/seed/nadia/100/100',
    dataAiHint: 'woman artist smiling',
    specialty: 'مجوهرات يدوية وفنون كروشيه',
    rating: 4.8,
    reviewCount: 150,
    bannerImage: 'https://picsum.photos/seed/lamsabanner1/400/150',
    dataAiHintBanner: 'handmade crafts display',
  },
  {
    id: 'mathaq-albayt', // Store slug as ID
    name: 'مذاق البيت مع سارة',
    avatarSrc: 'https://picsum.photos/seed/sara/100/100',
    dataAiHint: 'woman baker smiling',
    specialty: 'كيك وحلويات المناسبات الفاخرة',
    rating: 4.9,
    reviewCount: 210,
    bannerImage: 'https://picsum.photos/seed/mathaqbanner1/400/150',
    dataAiHintBanner: 'assorted pastries display',
  },
  {
    id: 'anaqa-lilijar', // Store slug as ID
    name: 'أناقة للإيجار مع ليلى',
    avatarSrc: 'https://picsum.photos/seed/laila/100/100',
    dataAiHint: 'woman fashion designer stylish',
    specialty: 'تأجير فساتين سهرة وعبايات راقية',
    rating: 4.7,
    reviewCount: 95,
    bannerImage: 'https://picsum.photos/seed/anaqabanner1/400/150',
    dataAiHintBanner: 'evening gowns display',
  },
  {
    id: 'salon-farah', // Store slug as ID
    name: 'صالون فرح للتجميل',
    avatarSrc: 'https://picsum.photos/seed/farah/100/100',
    dataAiHint: 'woman beautician smiling elegant',
    specialty: 'خدمات تجميل وعناية بالشعر والبشرة',
    rating: 4.9,
    reviewCount: 180,
    bannerImage: 'https://picsum.photos/seed/salonfarahbanner1/400/150',
    dataAiHintBanner: 'modern salon interior luxury',
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

export function TopRatedStoresSection() {
  return (
    <motion.section
      id="top-stores"
      className="py-16 lg:py-24 bg-secondary/10"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.1 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          variants={cardVariants}
          custom={0} // Start animation immediately
        >
          <Award className="mx-auto h-12 w-12 text-accent-yellow animate-bounce" style={{animationDuration: '1.8s'}}/>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            مبدعاتنا المتألقات
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            تعرفي على المتاجر التي حازت على أعلى التقييمات بفضل جودة منتجاتها وخدماتها الاستثنائية.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {mockTopRatedStores.map((store, index) => (
            <motion.div
              key={store.id}
              custom={index + 1} // Stagger animation for cards
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.1 }}
            >
            <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl group flex flex-col border border-transparent hover:border-accent-yellow focus-within:border-accent-yellow focus-within:ring-2 focus-within:ring-accent-yellow/50 h-full">
              <div className="relative h-32 sm:h-40 overflow-hidden rounded-t-xl">
                <Link href={`/store/${store.id}`} passHref className="block h-full">
                  <Image src={store.bannerImage} alt={`${store.name} banner`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" data-ai-hint={store.dataAiHintBanner}/>
                </Link>
                <Link href={`/store/${store.id}`} passHref className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-background bg-background shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <AvatarImage src={store.avatarSrc} alt={store.name} data-ai-hint={store.dataAiHint} />
                    <AvatarFallback className="text-2xl bg-primary/20 text-primary">{store.name.substring(0, 1)}</AvatarFallback>
                  </Avatar>
                </Link>
              </div>
              <CardContent className="p-4 pt-12 sm:pt-14 text-center flex-grow flex flex-col">
                <h3 className="text-lg font-semibold text-primary mb-1 group-hover:text-accent-pink transition-colors">
                  <Link href={`/store/${store.id}`}>{store.name}</Link>
                </h3>
                <p className="text-xs text-accent-purple font-medium mb-2">{store.specialty}</p>
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-3 mt-auto">
                  <Star className="h-4 w-4 text-accent-yellow fill-accent-yellow" />
                  <span>{store.rating.toFixed(1)}</span>
                  <span>({store.reviewCount} تقييم)</span>
                </div>
              </CardContent>
              <CardFooter className="p-3 border-t">
                <Button asChild variant="outline" className="w-full border-accent-yellow text-accent-yellow hover:bg-accent-yellow hover:text-accent-yellow-foreground transition-all duration-300 group/button transform hover:scale-105">
                  <Link href={`/store/${store.id}`}>
                    <Eye className="ml-2 h-4 w-4 group-hover/button:text-accent-yellow-foreground group-hover/button:animate-pulse" style={{animationDuration: '1s'}}/> زيارة المتجر
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            </motion.div>
          ))}
        </div>
         <motion.div
          className="mt-12 text-center"
          variants={cardVariants}
          custom={mockTopRatedStores.length + 1} // Animate button after cards
         >
          <Button size="lg" variant="default" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 group transform hover:scale-105">
            <Link href="/stores">
              تصفحي كل المتاجر المبدعة <ChevronLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
