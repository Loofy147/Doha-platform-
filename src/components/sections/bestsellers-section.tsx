// src/components/sections/bestsellers-section.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, Eye, ChevronLeft } from 'lucide-react'; 
import { motion } from 'framer-motion';

const mockBestsellers = [
  {
    id: 'bestseller-1',
    name: 'مجموعة مجوهرات "أناقة الفيروز"',
    seller: 'مجوهرات أصالة',
    sellerSlug: 'asala-jewelry',
    imageSrc: 'https://picsum.photos/seed/turquoisejewelry/400/300',
    dataAiHint: 'turquoise jewelry set',
    price: '7,200 دج',
    category: 'أناقة وإكسسوارات',
    oldPrice: '8,500 دج',
  },
  {
    id: 'bestseller-2',
    name: 'كيكة الليمون المنعشة بالكريمة',
    seller: 'مخبز الأحلام',
    sellerSlug: 'mathaq-albayt',
    imageSrc: 'https://picsum.photos/seed/lemoncake/400/300',
    dataAiHint: 'lemon cake cream',
    price: '4,500 دج',
    category: 'حلويات ومأكولات شهية',
  },
  {
    id: 'bestseller-3',
    name: 'فستان سهرة "نجمة الليل" (للإيجار)',
    seller: 'خزانة الأناقة',
    sellerSlug: 'anaqa-lilijar',
    imageSrc: 'https://picsum.photos/seed/nightstar_dress/400/300',
    dataAiHint: 'dark blue evening dress',
    price: '9,000 دج / لليلة',
    category: 'تأجير إبداعات',
  },
   {
    id: 'bestseller-4',
    name: 'لوحة فنية "هدوء الطبيعة"',
    seller: 'ريشة فنانة',
    sellerSlug: 'lamsa-ibdaa',
    imageSrc: 'https://picsum.photos/seed/natureart/400/300',
    dataAiHint: 'nature landscape painting',
    price: '6,800 دج',
    category: 'لمسات منزلية وديكور',
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 30, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
};


export function BestsellersSection() {
  return (
    <section id="bestsellers" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Flame className="mx-auto h-12 w-12 text-primary animate-pulse" style={{animationDuration: '1.2s'}}/>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            الأكثر مبيعاً وشهرة
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            اكتشفي القطع والخدمات التي خطفت قلوب عميلاتنا وأصبحت حديث مجتمع لمسة ضحى.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {mockBestsellers.map((product, index) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              custom={index} // for staggered animation if needed
            >
            <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl group flex flex-col border border-transparent hover:border-primary focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/50 h-full">
              <CardHeader className="p-0 relative">
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-xl">
                  <Image 
                    src={product.imageSrc} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint={product.dataAiHint}
                  />
                   {product.oldPrice && (
                    <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-1 rounded-md shadow-md animate-pulse" style={{animationDuration: '2.5s'}}>
                      خصم!
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-grow flex flex-col">
                <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                <CardTitle className="text-lg font-semibold text-primary mb-1 group-hover:text-accent-pink transition-colors">
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </CardTitle>
                <CardDescription className="text-xs text-foreground/70 mb-2">
                  من إبداع: <Link href={`/store/${product.sellerSlug}`} className="text-accent-purple hover:underline font-medium">{product.seller}</Link>
                </CardDescription>
                <div className="flex items-baseline gap-2 mt-auto pt-2">
                  <p className="text-xl font-bold text-accent-pink">{product.price}</p>
                  {product.oldPrice && (
                    <p className="text-sm text-muted-foreground line-through">{product.oldPrice}</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-3 border-t">
                <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/button transform hover:scale-105">
                  <Link href={`/products/${product.id}`}>
                    <Eye className="ml-2 h-4 w-4 group-hover/button:animate-pulse" style={{animationDuration: '1s'}} /> عرض التفاصيل
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button size="lg" variant="default" asChild className="bg-accent-pink hover:bg-accent-pink/90 text-accent-pink-foreground shadow-md hover:shadow-lg transition-all duration-300 group transform hover:scale-105">
            <Link href="/products?sort=bestsellers">
              شاهدي كل المنتجات الرائجة <ChevronLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
