// src/app/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Sparkles,
  Eye,
  ChevronLeft,
  Users,
  ShoppingBag,
  Palette,
  FileText,
  CalendarDays,
  PenLine,
  Home as HomeIcon,
  Scissors,
} from 'lucide-react';
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
  { name: 'أزياء وإكسسوارات', icon: Shirt, href: '/products?category=أزياء وإكسسوارات', dataAiHint: 'fashion accessories', color: 'text-accent-pink', bgColor: 'bg-accent-pink/10' },
  { name: 'حلويات ومأكولات شهية', icon: CalendarDays, href: '/products?category=حلويات ومأكولات شهية', dataAiHint: 'sweets treats', color: 'text-accent-yellow', bgColor: 'bg-accent-yellow/10' },
  { name: 'لمسات منزلية وديكور', icon: HomeIcon, href: '/products?category=مستلزمات منزلية وديكور', dataAiHint: 'home decor', color: 'text-accent-purple', bgColor: 'bg-accent-purple/10' },
  { name: 'تأجير إبداعات', icon: CalendarDays, href: '/products?category=منتجات للإيجار', dataAiHint: 'rental items', color: 'text-green-500', bgColor: 'bg-green-500/10' },
  { name: 'خدمات احترافية', icon: PenLine, href: '/products?category=خدمات احترافية', dataAiHint: 'professional services', color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  { name: 'جمال وعناية', icon: Scissors, href: '/products?category=جمال وعناية شخصية', dataAiHint: 'beauty wellness', color: 'text-pink-500', bgColor: 'bg-pink-500/10' },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.1 } }
};


export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Seller CTA */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <CallToActionBanner
          title="✨ حان وقت التألق! انضمي لمبدعات لمسة ضحى ✨"
          description="هل لديكِ لمسة خاصة؟ منتجات يدوية مفعمة بالإبداع؟ خدمات فريدة؟ حوّلي شغفكِ إلى مشروع ناجح معنا. افتحي متجركِ الرقمي اليوم في بيئة داعمة مصممة خصيصًا لكِ."
          buttonText="افتحي متجركِ الآن مجاناً"
          buttonLink="/sell-with-us"
          imageSrc="https://picsum.photos/seed/cta-seller/1200/400"
          dataAiHint="women entrepreneurs working"
          icon={ShoppingBag}
          reverseLayout
          animationConfig={sectionVariants}
        />
      </motion.div>

      <DailyDealsSection />
      <WeeklyDealsSection />
      <BestsellersSection />
      <TopRatedStoresSection />

      <motion.section
        id="categories"
        className="py-16 lg:py-24 bg-secondary/20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
          >
            <Users className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              تصفحي عالمنا الإبداعي
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              اكتشفي فئات متنوعة تلبي كل شغف واهتمام، من لمسات الأناقة إلى إبداعات المنزل والخدمات المميزة.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category, index) => {
              const CategoryIcon = category.icon;
              return (
                <motion.div
                  key={category.name}
                  variants={itemVariants}
                  className="group block"
                >
                  <Link href={category.href}>
                    <Card className="h-full flex flex-col justify-center items-center p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-primary focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/50">
                      <CardContent className="p-0 flex flex-col items-center justify-center">
                        <div className={`mb-3 p-3 rounded-full shadow-inner ${category.bgColor}`}>
                          <CategoryIcon size={24} className={`mx-auto h-6 w-6 sm:h-7 sm:w-7 ${category.color}`} />
                        </div>
                        <h3 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{category.name}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Shopper CTA */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <CallToActionBanner
          title="💖 دللي نفسكِ! اكتشفي كنوز الإبداع المحلي 💖"
          description="تصفحي آلاف المنتجات والخدمات الفريدة المقدمة بحب وشغف من مبدعاتنا. كل قطعة تحكي قصة، وكل خدمة تقدم بلمسة شخصية مميزة. ادعمي المواهب المحلية، وتسوقي بذكاء ومتعة."
          buttonText="ابدئي التسوق الآن"
          buttonLink="/products"
          imageSrc="https://picsum.photos/seed/cta-shopper/1200/400"
          dataAiHint="happy woman shopping online"
          icon={ShoppingBag}
          reverseLayout
          animationConfig={sectionVariants}
        />
      </motion.div>

      <AboutUsSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
