// src/components/sections/bestsellers-section.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flame, Eye, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Import cn utility

const mockBestsellers = [
  {
    id: 'lamsa-prod2', // Product ID
    name: 'مجموعة دُمى أميغورومي لطيفة',
    seller: 'لمسة إبداع نادية', // Seller name for lamsa-ibdaa
    sellerSlug: 'lamsa-ibdaa', // Store Slug/ID
    imageSrc: 'https://picsum.photos/seed/amigurumi/400/300',
    dataAiHint: 'amigurumi dolls handmade',
    price: '2,500 دج للقطعة',
    category: 'ألعاب وهدايا يدوية',
  },
  {
    id: 'mathaq-prod1', // Product ID
    name: 'كيكة العسل الروسية الأصلية',
    seller: 'مذاق البيت مع سارة', // Seller name for mathaq-albayt
    sellerSlug: 'mathaq-albayt', // Store Slug/ID
    imageSrc: 'https://picsum.photos/seed/honeycake/400/300',
    dataAiHint: 'russian honey cake',
    price: '6,000 دج',
    category: 'كيك ومناسبات',
    oldPrice: '6,500 دج',
  },
  {
    id: 'anaqa-prod1', // Product ID
    name: 'فستان سهرة ذهبي مطرز فاخر (للإيجار)',
    seller: 'أناقة للإيجار مع ليلى', // Seller name for anaqa-lilijar
    sellerSlug: 'anaqa-lilijar', // Store Slug/ID
    imageSrc: 'https://picsum.photos/seed/golddress/400/300',
    dataAiHint: 'gold sequin dress elegant',
    price: '12,000 دج / لـ 3 أيام',
    category: 'تأجير إبداعات',
  },
   {
    id: 'farah-prod1', // Product ID
    name: 'زيت الأرغان المغربي النقي للشعر',
    seller: 'صالون فرح للتجميل', // Seller name for salon-farah
    sellerSlug: 'salon-farah', // Store Slug/ID
    imageSrc: 'https://picsum.photos/seed/arganoilhair/400/300',
    dataAiHint: 'argan oil hair product',
    price: '2,800 دج',
    category: 'منتجات عناية بالشعر',
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, duration: 0.5 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" }
  })
};

export function BestsellersSection() {
  return (
    <motion.section
      id="bestsellers"
      className="py-16 lg:py-24 bg-background"
      variants={sectionVariants} // Apply container variants
      initial="hidden" // Changed from 'initial'
      whileInView="visible" // Changed from 'animate'
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.1 }} // Ensure stagger works with whileInView
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          variants={itemVariants} // Use item variants for header
          custom={0} // Start animation immediately
        >
          <Flame className="mx-auto h-12 w-12 text-primary animate-pulse" style={{animationDuration: '1.2s'}}/>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            الأكثر مبيعاً وشهرة
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            اكتشفي القطع والخدمات التي خطفت قلوب عميلاتنا وأصبحت حديث مجتمع لمسة ضحى.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {mockBestsellers.map((product, index) => (
            <motion.div
              key={product.id}
              custom={index + 1} // Stagger animation for cards
              variants={itemVariants} // Apply item variants to each card container
              // Removed initial/whileInView from individual cards
            >
            <Card className={cn(
                "overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl group flex flex-col",
                "border border-transparent hover:border-primary focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/50 h-full",
                "transform hover:-translate-y-1.5" // Add lift effect
             )}>
              <CardHeader className="p-0 relative">
                <Link href={`/products/${product.id}`} passHref className="block aspect-[4/3] relative overflow-hidden rounded-t-xl">
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
                </Link>
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
        <motion.div
          className="mt-12 text-center"
          variants={itemVariants}
          custom={mockBestsellers.length + 1} // Animate button after cards
        >
          <Button size="lg" variant="default" asChild className="bg-accent-pink hover:bg-accent-pink/90 text-accent-pink-foreground shadow-md hover:shadow-lg transition-all duration-300 group transform hover:scale-105">
            <Link href="/products?sort=bestsellers">
              شاهدي كل المنتجات الرائجة <ChevronLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
