'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  Package,
  Users,
  LineChart,
  Settings,
  PlusCircle,
  Bell,
  ShoppingBag,
  Palette,
  FileText,
  Activity,
  BarChartHorizontalBig,
  MessageSquare,
  Sparkles,
  Store,
  Star,
  LayoutTemplate, // Added for Store Template
  Download, // Import Download
  HomeIcon, // Keep HomeIcon
  Handshake, // Keep Handshake
  Shirt, // Added Shirt for fashion category
  Users2, // Added Users2 for customers card
  CreditCard, // Added CreditCard for orders card
  LayoutGrid, // Added LayoutGrid for categories card
  BarChart3, // Added BarChart3 for reports card
  Zap, // Added Zap for quick actions
  LayoutDashboard, // Added LayoutDashboard icon import
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutUsSection } from '@/components/sections/about-us-section';
import { CallToActionBanner } from '@/components/sections/call-to-action-banner';
import { DailyDealsSection } from '@/components/sections/daily-deals-section';
import { WeeklyDealsSection } from '@/components/sections/weekly-deals-section';
import { BestsellersSection } from '@/components/sections/bestsellers-section';
import { TopRatedStoresSection } from '@/components/sections/top-rated-stores-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ContactSection } from '@/components/sections/contact-section';
import ClientContactSection from '@/components/sections/client-contact-section'; // Import the new client component
import { WomenCommerceLogo } from '@/components/icons/logo'; // Import the logo component

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } }
};

export default function HomePage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight text-primary">لمسة ضحى</h2>
                </div>
                <Skeleton className="w-full h-32 rounded-lg" />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32 rounded-lg" />)}
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-64 rounded-lg" />
                    <Skeleton className="h-64 rounded-lg" />
                </div>
            </div>
        );
    }

  return (
     <div className="flex flex-col min-h-screen bg-background">
      
      <HeroSection />

        {/* Sections with Framer Motion */}
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
        >
         <DailyDealsSection />
        </motion.div>

        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
             variants={sectionVariants}
        >
         <BestsellersSection />
        </motion.div>

        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
             variants={sectionVariants}
        >
         <WeeklyDealsSection />
        </motion.div>

        <motion.div
             initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
             variants={sectionVariants}
        >
        <TopRatedStoresSection />
        </motion.div>

        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
             variants={sectionVariants}
        >
        <AboutUsSection />
        </motion.div>

        {/* Seller CTA */}
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
                icon={Store}
            />
        </motion.div>

        {/* Shopper CTA */}
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
                icon={ShoppingBag}
                reverseLayout={true}
            />
        </motion.div>

        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
             variants={sectionVariants}
        >
        <TestimonialsSection />
        </motion.div>

        {/* Wrap ContactSection usage */}
        <ClientContactSection />
    </div>
  );
}
