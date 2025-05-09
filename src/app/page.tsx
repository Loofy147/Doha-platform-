// src/app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Sparkles, // For categories array and HeroSection (HeroSection imports its own)
  Shirt, // For categories array
  HomeIcon, // For categories array
  CalendarDays, // For categories array
  PenLine, // For categories array
  ShoppingBag as ShoppingBagIcon, // Passed as prop to CallToActionBanner
  Store as StoreIcon, // Passed as prop to CallToActionBanner
  LayoutDashboard, // For admin link section
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutUsSection } from '@/components/sections/about-us-section';
import { CallToActionBanner } from '@/components/sections/call-to-action-banner';
import { DailyDealsSection } from '@/components/sections/daily-deals-section';
import { WeeklyDealsSection } from '@/components/sections/weekly-deals-section';
import { BestsellersSection } from '@/components/sections/bestsellers-section';
import { TopRatedStoresSection } from '@/components/sections/top-rated-stores-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import ClientContactSection from '@/components/sections/client-contact-section';
import { WomenCommerceLogo } from '@/components/icons/logo';
import { motion } from 'framer-motion';
import { IconUsageExample } from '@/components/icons/icon-usage-example';

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } }
};

const categoryVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" }}
};

const categories = [
  { name: 'أزياء وإكسسوارات', icon: Shirt, href: '/products?category=أزياء وإكسسوارات', dataAiHint: 'fashion accessories', color: 'text-accent-pink', bgColor: 'bg-accent-pink/10' },
  { name: 'حلويات ومأكولات شهية', icon: Sparkles, href: '/products?category=حلويات ومأكولات شهية', dataAiHint: 'sweets treats', color: 'text-accent-yellow', bgColor: 'bg-accent-yellow/10' },
  { name: 'لمسات منزلية وديكور', icon: HomeIcon, href: '/products?category=مستلزمات منزلية وديكور', dataAiHint: 'home decor', color: 'text-accent-purple', bgColor: 'bg-accent-purple/10' },
  { name: 'تأجير إبداعات', icon: CalendarDays, href: '/products?category=منتجات للإيجار', dataAiHint: 'rental items', color: 'text-green-500', bgColor: 'bg-green-500/10' },
  { name: 'خدمات احترافية', icon: PenLine, href: '/products?category=خدمات', dataAiHint: 'professional services', color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
];

export default function HomePage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <div className="flex-1 space-y-12 p-4 md:p-8 pt-6 bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50">
                <Skeleton className="w-full h-96 rounded-lg" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Skeleton className="h-10 w-1/3 mb-8 mx-auto" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {Array(5).fill(0).map((_, i) => (
                            <div key={i} className="text-center p-6 bg-card rounded-lg shadow-lg h-40 flex flex-col justify-center items-center">
                                <Skeleton className="h-12 w-12 rounded-full mb-4" />
                                <Skeleton className="h-6 w-3/4" />
                            </div>
                        ))}
                    </div>
                </div>
                <Skeleton className="w-full h-64 rounded-lg" />
                <Skeleton className="w-full h-64 rounded-lg" />
            </div>
        );
    }

  return (
     <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
      <HeroSection />

        <motion.section
            id="categories"
            className="py-16 lg:py-24 bg-secondary/10"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
         >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div className="text-center mb-12" variants={sectionVariants}>
                    <motion.h2 variants={sectionVariants} className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                       تصفحي عالمنا الإبداعي
                    </motion.h2>
                    <motion.p variants={sectionVariants} className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
                       اكتشفي فئات متنوعة تلبي كل شغف واهتمام، من لمسات الأناقة إلى إبداعات المنزل والخدمات المميزة.
                    </motion.p>
                </motion.div>
                <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" variants={sectionVariants}>
                    {categories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                        <motion.div key={category.name} variants={categoryVariants}>
                            <Link href={category.href} className="group block">
                                <Card className={`text-center p-6 ${category.bgColor} rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col justify-center items-center border-2 border-transparent hover:border-primary group-hover:scale-105`}>
                                    <CardContent className="p-0 flex flex-col items-center justify-center">
                                        <div className={`mb-4 group-hover:scale-110 transition-transform duration-300 ${category.color}`}>
                                            <IconComponent size={28} className="mx-auto h-10 w-10" />
                                        </div>
                                        <h3 className="text-md font-semibold text-foreground group-hover:text-primary transition-colors">{category.name}</h3>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </motion.section>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <CallToActionBanner
          title="انضمي إلى مبدعات لمسة ضحى!"
          description="هل لديكِ موهبة فريدة أو منتجات مميزة؟ حان الوقت لعرض إبداعاتكِ أمام العالم. افتحي متجركِ الخاص على منصتنا اليوم وابدئي رحلتكِ نحو النجاح والتمكين."
          buttonText="افتحي متجرك الآن"
          buttonLink="/sell-with-us"
          imageSrc="https://picsum.photos/seed/cta-seller/1200/400"
          dataAiHint="women entrepreneurs working"
          icon={StoreIcon}
        />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <CallToActionBanner
          title="اكتشفي كنوز الإبداع المحلي!"
          description="تصفحي آلاف المنتجات والخدمات المقدمة من مبدعات موهوبات. كل قطعة تحكي قصة، وكل خدمة تقدم بلمسة شخصية. ادعمي المواهب المحلية واحصلي على ما هو فريد ومميز."
          buttonText="تسوقي الآن"
          buttonLink="/products"
          imageSrc="https://picsum.photos/seed/cta-shopper/1200/400"
          dataAiHint="happy woman shopping online"
          icon={ShoppingBagIcon}
          reverseLayout={true}
        />
      </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
         <DailyDealsSection />
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
         <BestsellersSection />
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
         <WeeklyDealsSection />
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
        <TopRatedStoresSection />
        </motion.div>

        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
        <AboutUsSection />
        </motion.div>


        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
        <TestimonialsSection />
        </motion.div>

        <ClientContactSection />

        <motion.section
            className="py-16 lg:py-24 bg-background"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <IconUsageExample />
            </div>
        </motion.section>

        <div className="py-12 bg-muted/30 text-center">
            <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                <h3 className="text-2xl font-semibold text-primary mb-4">إدارة المنصة</h3>
                <p className="text-foreground/80 mb-6 max-w-md mx-auto">
                    وصول سريع إلى لوحة التحكم الإدارية لإدارة كافة جوانب منصة لمسة ضحى.
                </p>
                <Button asChild size="lg">
                   <Link href="/admin">
                       <LayoutDashboard className="mr-2 h-5 w-5" /> الذهاب للوحة التحكم الكاملة
                   </Link>
                </Button>
            </motion.div>
        </div>
    </div>
  );
}
