// src/app/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle, CardFooter, CardHeader } from '@/components/ui/card';
import { Sparkles, Eye, ChevronLeft, Users, CalendarDays, ShoppingBag, Store, PenLine, Flame, Award, Rocket, HomeIcon, FileText, Gift, UserCircle, LogOutIcon, LayoutDashboard, MessageSquare, Info } from 'lucide-react'; // Added CalendarDays, Rocket, HomeIcon, FileText, Gift, UserCircle, LogOutIcon, LayoutDashboard, MessageSquare, Info
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
// Removed import { Rocket } from 'lucide-react'; // Ensure Rocket is imported

const categories = [
  { name: 'أناقة وإكسسوارات', icon: ShoppingBag, href: '/products?category=أزياء وإكسسوارات', dataAiHint: 'fashion accessories', color: 'text-accent-pink' },
  { name: 'حلويات ومأكولات شهية', icon: Sparkles, href: '/products?category=حلويات ومأكولات شهية', dataAiHint: 'sweets treats', color: 'text-accent-yellow' },
  { name: 'لمسات منزلية وديكور', icon: Store, href: '/products?category=مستلزمات منزلية وديكور', dataAiHint: 'home decor', color: 'text-accent-purple' },
  { name: 'تأجير إبداعات', icon: CalendarDays, href: '/products?category=منتجات للإيجار', dataAiHint: 'rental items', color: 'text-green-500' },
  { name: 'خدمات احترافية', icon: PenLine, href: '/products?category=خدمات احترافية', dataAiHint: 'professional services', color: 'text-blue-500' },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } } // Added staggerChildren
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
            title="✨ انضمي إلى مبدعات لمسة ضحى! ✨"
            description="هل تمتلكين موهبة فريدة أو منتجات تفيض بالإبداع؟ حان الوقت لتشاركي العالم بلمستكِ الخاصة! افتحي متجركِ الرقمي معنا اليوم واكتشفي فرصًا لا حدود لها للنمو والتمكين."
            buttonText="افتحي متجركِ الآن"
            buttonLink="/sell-with-us"
            imageSrc="https://picsum.photos/seed/cta-seller/1200/400"
            dataAiHint="women entrepreneurs working"
            icon={Rocket}
            animationConfig={sectionVariants} // Pass animation config
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
        variants={sectionVariants} // Container animation
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            variants={sectionVariants} // Animate header elements together
          >
            <Users className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              تصفحي عالمنا الإبداعي
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              اكتشفي فئات متنوعة تلبي كل شغف واهتمام، من لمسات الأناقة إلى إبداعات المنزل والخدمات المميزة.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => {
              const CategoryIcon = category.icon;
              return (
                <motion.div
                  key={category.name}
                  custom={index}
                  variants={categoryCardVariants} // Individual card animation with stagger
                  whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.2 } }}
                >
                  <Link href={category.href} className="group block h-full">
                     {/* Card Styling - Consider adding more engaging visual elements */}
                     <Card className="text-center p-6 bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform h-full flex flex-col justify-center items-center border-2 border-transparent hover:border-primary focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/50">
                        <CardContent className="p-0 flex flex-col items-center justify-center">
                           <motion.div
                           className={`mb-4 ${category.color} p-3 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 shadow-inner`} // Added gradient background & padding
                           whileHover={{ scale: 1.15, rotate: 5 }}
                           transition={{ type: "spring", stiffness: 300 }}
                           >
                           <CategoryIcon size={28} className="mx-auto h-8 w-8" /> {/* Slightly larger icon */}
                           </motion.div>
                           <h3 className="text-sm sm:text-md font-semibold text-foreground group-hover:text-primary transition-colors">{category.name}</h3>
                        </CardContent>
                     </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
           <motion.div
            className="mt-12 text-center"
            variants={buttonVariants} // Animate button separately
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
            title="💖 اكتشفي كنوز الإبداع المحلي! 💖"
            description="تصفحي آلاف المنتجات والخدمات المقدمة من مبدعات موهوبات. كل قطعة تحكي قصة، وكل خدمة تقدم بلمسة شخصية. ادعمي المواهب المحلية واحصلي على ما هو فريد ومميز."
            buttonText="تسوقي الآن"
            buttonLink="/products"
            imageSrc="https://picsum.photos/seed/cta-shopper/1200/400"
            dataAiHint="happy woman shopping online"
            icon={ShoppingBag}
            reverseLayout
            animationConfig={sectionVariants} // Pass animation config
            />
        </motion.div>

      <AboutUsSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
    