// src/app/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle, CardFooter, CardHeader } from '@/components/ui/card';
import { Sparkles, Eye, ChevronRight, Users, CalendarDays, ShoppingBag, Store, Edit3, Search, PenLine } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { HeroSection } from '@/components/sections/hero-section';
import { AboutUsSection } from '@/components/sections/about-us-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ContactSection } from '@/components/sections/contact-section';
import { DailyDealsSection } from '@/components/sections/daily-deals-section';
import { WeeklyDealsSection } from '@/components/sections/weekly-deals-section';
import { BestsellersSection } from '@/components/sections/bestsellers-section';
import { TopRatedStoresSection } from '@/components/sections/top-rated-stores-section';
import { CallToActionBanner } from '@/components/sections/call-to-action-banner';
import { motion } from 'framer-motion';

const categories = [
  { name: 'أناقة وإكسسوارات', icon: ShoppingBag, href: '/products?category=fashion', dataAiHint: 'fashion accessories', color: 'text-accent-pink' },
  { name: 'حلويات ومأكولات شهية', icon: Sparkles, href: '/products?category=sweets', dataAiHint: 'sweets treats', color: 'text-accent-yellow' },
  { name: 'لمسات منزلية وديكور', icon: Store, href: '/products?category=home-decor', dataAiHint: 'home decor', color: 'text-accent-purple' },
  { name: 'تأجير إبداعات', icon: CalendarDays, href: '/products?category=rental', dataAiHint: 'rental items', color: 'text-green-500' },
  { name: 'خدمات احترافية', icon: PenLine, href: '/products?category=services', dataAiHint: 'professional services', color: 'text-blue-500' },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const categoryCardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: (i: number) => ({ // Added index type
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: "easeOut"
    }
  })
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <CallToActionBanner
        title="✨ انضمي إلى مبدعات لمسة ضحى! ✨"
        description="هل تمتلكين موهبة فريدة أو منتجات تفيض بالإبداع؟ حان الوقت لتشاركي العالم بلمستكِ الخاصة! افتحي متجركِ الرقمي معنا اليوم واكتشفي فرصًا لا حدود لها للنمو والتمكين."
        buttonText="افتحي متجركِ الآن"
        buttonLink="/sell-with-us"
        imageSrc="https://picsum.photos/seed/cta-seller/1200/400"
        dataAiHint="women entrepreneurs working"
        iconName="Rocket"
        animationConfig={{
          initial: { opacity: 0, x: -50 },
          whileInView: { opacity: 1, x: 0 },
          transition: { duration: 0.6, delay: 0.2 }
        }}
      />

      <DailyDealsSection />
      <WeeklyDealsSection />
      <BestsellersSection />
      <TopRatedStoresSection />

      <motion.section 
        id="categories" 
        className="py-16 lg:py-24 bg-secondary/10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Users className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              تصفحي عوالم الإبداع الأنثوي
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              انغمسي في فئات متنوعة تُرضي كل شغف واهتمام، من أناقة الموضة ولمسات الديكور، إلى فنون الطهي والخدمات المبتكرة.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => {
              const CategoryIcon = category.icon;
              return (
                <motion.div
                  key={category.name}
                  custom={index}
                  variants={categoryCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.2 } }}
                >
                  <Link href={category.href} className="group block h-full">
                    <Card className="text-center p-6 bg-card rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform h-full flex flex-col justify-center items-center border-2 border-transparent hover:border-primary focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/50">
                      <CardContent className="p-0 flex flex-col items-center justify-center">
                        <motion.div
                          className={`mb-4 ${category.color}`}
                          whileHover={{ scale: 1.15, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <CategoryIcon size={28} className="mx-auto h-10 w-10" />
                        </motion.div>
                        <h3 className="text-md font-semibold text-foreground group-hover:text-primary transition-colors">{category.name}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
           <motion.div className="mt-12 text-center" variants={sectionVariants}>
            <Button size="lg" variant="outline" asChild className="border-primary text-primary hover:bg-primary/10 group transform hover:scale-105 transition-transform duration-200">
              <Link href="/products">
                عرض كل الفئات والمنتجات <ChevronRight className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

       <CallToActionBanner
        title="💖 اكتشفي كنوز الإبداع المحلي! 💖"
        description="تصفحي آلاف المنتجات والخدمات الفريدة المقدمة من مبدعات شغوفات. كل قطعة تروي حكاية، وكل خدمة تُقدّم بلمسة شخصية لا مثيل لها. ادعمي المواهب المحلية واحصلي على ما يُعبّر عن ذوقكِ الرفيع."
        buttonText="تسوقي الآن"
        buttonLink="/products"
        imageSrc="https://picsum.photos/seed/cta-shopper/1200/400"
        dataAiHint="happy woman shopping online"
        iconName="ShoppingBag"
        reverseLayout
         animationConfig={{
          initial: { opacity: 0, x: 50 },
          whileInView: { opacity: 1, x: 0 },
          transition: { duration: 0.6, delay: 0.2 }
        }}
      />
      
      <AboutUsSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
