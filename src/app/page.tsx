// src/app/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle, CardFooter, CardHeader } from '@/components/ui/card';
import { Sparkles, Eye, ChevronLeft, Users, ShoppingBag, Store, PenLine, Flame, Award, Rocket, HomeIcon, FileText, Gift, UserCircle, LogOutIcon, LayoutDashboard, MessageSquare, Info, Palette, Scissors, CookingPot, Shirt, CalendarDays } from 'lucide-react';
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
  { name: 'أناقة وإكسسوارات', icon: Shirt, href: '/products?category=أزياء وإكسسوارات', dataAiHint: 'fashion accessories', color: 'text-accent-pink', bgColor: 'bg-accent-pink/10' },
  { name: 'حلويات ومأكولات شهية', icon: CookingPot, href: '/products?category=حلويات ومأكولات شهية', dataAiHint: 'sweets treats', color: 'text-accent-yellow', bgColor: 'bg-accent-yellow/10' },
  { name: 'لمسات منزلية وديكور', icon: HomeIcon, href: '/products?category=مستلزمات منزلية وديكور', dataAiHint: 'home decor', color: 'text-accent-purple', bgColor: 'bg-accent-purple/10' },
  { name: 'تأجير إبداعات', icon: CalendarDays, href: '/products?category=منتجات للإيجار', dataAiHint: 'rental items', color: 'text-green-500', bgColor: 'bg-green-500/10' },
  { name: 'خدمات احترافية', icon: PenLine, href: '/products?category=خدمات احترافية', dataAiHint: 'professional services', color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  { name: 'جمال وعناية', icon: Scissors, href: '/products?category=جمال وعناية شخصية', dataAiHint: 'beauty wellness', color: 'text-pink-500', bgColor: 'bg-pink-500/10' },
  { name: 'حرف وفنون يدوية', icon: Palette, href: '/products?category=حرف يدوية إبداعية', dataAiHint: 'handmade crafts', color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } }
};

const categoryCardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.06, // Slightly faster stagger
      duration: 0.4,
      ease: "easeOut"
    }
  })
};

const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "backOut" }}
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
            icon={Rocket}
            animationConfig={sectionVariants}
            />
        </motion.div>

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
          <motion.div
            className="text-center mb-12"
            variants={sectionVariants}
          >
            <Users className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              تصفحي عالمنا الإبداعي
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              اكتشفي فئات متنوعة تلبي كل شغف واهتمام، من لمسات الأناقة إلى إبداعات المنزل والخدمات المميزة.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
            {categories.map((category, index) => {
              const CategoryIcon = category.icon;
              return (
                <motion.div
                  key={category.name}
                  custom={index}
                  variants={categoryCardVariants}
                  whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.2 } }}
                >
                  <Link href={category.href} className="group block h-full">
                     <Card className={`text-center p-4 sm:p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform h-full flex flex-col justify-center items-center border-2 border-transparent hover:border-primary focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/50`}>
                        <CardContent className="p-0 flex flex-col items-center justify-center">
                           <motion.div
                           className={`mb-3 p-3 rounded-full ${category.bgColor} shadow-inner`}
                           whileHover={{ scale: 1.15, rotate: 5 }}
                           transition={{ type: "spring", stiffness: 300 }}
                           >
                           <CategoryIcon size={24} className={`mx-auto h-6 w-6 sm:h-7 sm:w-7 ${category.color}`} />
                           </motion.div>
                           <h3 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{category.name}</h3>
                        </CardContent>
                     </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
           <motion.div
            className="mt-12 text-center"
            variants={buttonVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            >
            <Button size="lg" variant="outline" asChild className="border-primary text-primary hover:bg-primary/10 group transform hover:scale-105 transition-transform duration-200 rounded-full px-8 py-3">
              <Link href="/products">
                عرض كل الفئات والمنتجات <ChevronLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              </Link>
            </Button>
          </motion.div>
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
