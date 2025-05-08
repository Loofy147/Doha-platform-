// src/app/page.tsx
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
  Eye,
  LayoutTemplate,
  Download, // Import Download
  HomeIcon, // Keep HomeIcon
  Handshake, // Keep Handshake
  Shirt, // Added Shirt for fashion category
  Users2, // Added Users2 for customers card
  CreditCard, // Added CreditCard for orders card
  LayoutGrid, // Added LayoutGrid for categories card
  BarChart3, // Added BarChart3 for reports card
  Zap, // Added Zap for quick actions
  LayoutDashboard // Added LayoutDashboard icon import
} from 'lucide-react';
import { Button } from '@/components/ui/button'; // Add Button import
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
import { Badge } from '@/components/ui/badge';
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
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

const categories = [
  { name: 'أزياء وإكسسوارات', icon: Shirt, href: '/products?category=أزياء وإكسسوارات', dataAiHint: 'fashion accessories', color: 'text-accent-pink', bgColor: 'bg-accent-pink/10' },
  { name: 'حلويات ومأكولات شهية', icon: Sparkles, href: '/products?category=حلويات ومأكولات شهية', dataAiHint: 'sweets treats', color: 'text-accent-yellow', bgColor: 'bg-accent-yellow/10' },
  { name: 'لمسات منزلية وديكور', icon: HomeIcon, href: '/products?category=مستلزمات منزلية وديكور', dataAiHint: 'home decor', color: 'text-accent-purple', bgColor: 'bg-accent-purple/10' },
  { name: 'تأجير إبداعات', icon: Handshake, href: '/products?category=منتجات للإيجار', dataAiHint: 'rental items', color: 'text-green-500', bgColor: 'bg-green-500/10' },
  { name: 'خدمات احترافية', icon: Handshake, href: '/products?category=خدمات', dataAiHint: 'professional services', color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
];

const salesData = [
  { month: "يناير", sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: "فبراير", sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: "مارس", sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: "أبريل", sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: "مايو", sales: Math.floor(Math.random() * 5000) + 1000 },
  { month: "يونيو", sales: Math.floor(Math.random() * 5000) + 1000 },
];

const recentActivities = [
  { id: 1, user: 'عائشة ب.', description: 'تم استلام طلب بائعة جديدة.', time: 'منذ 5 دقائق', avatarSrc: 'https://picsum.photos/40/40?random=1', dataAiHint: "woman portrait" },
  { id: 2, user: 'النظام', description: 'تم نشر تحديث المنصة v1.2.', time: 'منذ ساعة', avatarSrc: 'https://picsum.photos/40/40?random=2', dataAiHint: "system logo" },
  { id: 3, user: 'فاطمة ك.', description: 'أبلغت عن مشكلة في قائمة المنتجات.', time: 'منذ 3 ساعات', avatarSrc: 'https://picsum.photos/40/40?random=3', dataAiHint: "woman thinking" },
  { id: 4, user: 'المسؤول', description: 'تم إرسال النشرة الإخبارية الأسبوعية.', time: 'منذ يوم واحد', avatarSrc: 'https://picsum.photos/40/40?random=admin', dataAiHint: "admin icon" },
  { id: 5, user: 'ليلى ر.', description: 'تم تقديم طلب جديد بقيمة عالية.', time: 'منذ يومين', avatarSrc: 'https://picsum.photos/40/40?random=4', dataAiHint: "woman shopping" },
];

const overviewCards = [
      {
        title: "إجمالي الإيرادات",
        value: "45,231.89 دج",
        icon: <DollarSign className="text-green-500" />,
        href: "/admin/reports/revenue",
        trend: "+20.1% عن الشهر الماضي",
        color: "green"
      },
      {
        title: "إجمالي الطلبات",
        value: "+12,234",
        icon: <CreditCard className="text-purple-500" />,
        href: "/admin/orders",
        color: "purple"
      },
      {
        title: "العملاء",
        value: "1.2 ألف",
        icon: <Users2 className="text-pink-500" />,
        href: "/admin/customers",
        trend: "+30 هذا الأسبوع",
        color: "pink"
      },
      {
        title: "المنتجات/الخدمات",
        value: "250",
        icon: <ShoppingBag className="text-yellow-500" />,
        href: "/admin/products",
        color: "yellow"
      },
      {
        title: "البائعات",
        value: "85",
        icon: <Store className="text-indigo-500" />,
        href: "/admin/sellers",
        color: "indigo"
      },
    ];

const quickActions = [
      { label: "إضافة منتج جديد", icon: <PlusCircle size={18} />, href: "/admin/products/new" },
      { label: "إدارة الفئات", icon: <LayoutGrid size={18} />, href: "/admin/categories" },
      { label: "عرض التقارير", icon: <BarChart3 size={18} />, href: "/admin/reports" },
      { label: "إعدادات المنصة", icon: <Settings size={18} />, href: "/admin/settings" },
    ];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
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
                    <h2 className="text-3xl font-bold tracking-tight text-primary">لوحة تحكم المسؤول</h2>
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
     <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Admin Dashboard Snippet - Moved to a separate component if needed */}
       <motion.section
        className="py-12 bg-muted/40"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-2xl font-bold tracking-tight text-primary mb-8 text-center">لمحة سريعة عن لوحة التحكم (للإداريين)</h2>
           <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0 mb-6">
            <div>
                <h3 className="text-xl font-semibold text-primary">نظرة عامة على نشاط لمسة ضحى</h3>
                <p className="text-muted-foreground text-sm">ملخص سريع لأهم المؤشرات.</p>
            </div>
            <div className="flex items-center space-x-2">
                <Button variant="outline" asChild>
                    <Link href="/admin/reports">
                        <Download className="mr-2 h-4 w-4" />
                        تحميل التقرير
                    </Link>
                </Button>
                 <Button asChild>
                   <Link href="/admin">
                       <LayoutDashboard className="mr-2 h-4 w-4" /> الذهاب للوحة التحكم الكاملة
                   </Link>
                </Button>
            </div>
          </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
                {overviewCards.map((card) => (
                <Card key={card.title} className={`shadow-md border-l-4 border-${card.color}-500`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        {card.title}
                    </CardTitle>
                    {card.icon}
                    </CardHeader>
                    <CardContent>
                    <div className="text-xl font-bold text-primary">{card.value}</div>
                    {card.trend && <p className="text-xs text-muted-foreground">{card.trend}</p>}
                    </CardContent>
                 <CardFooter className="pt-2">
                        <Button variant="ghost" size="sm" asChild className="text-xs text-primary hover:underline p-0 h-auto">
                            <Link href={card.href ?? '#'}>{/* Fallback href added */}
                              عرض التفاصيل
                            </Link>
                        </Button>
                    </CardFooter>
              </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-primary flex items-center text-lg"><LineChart className="mr-2 text-accent-purple" /> اتجاهات المبيعات</CardTitle>
                        <CardDescription className="text-xs">أداء المبيعات لآخر 6 أشهر.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2 h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData}>
                                <defs>
                                    <linearGradient id="colorSalesHome" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000}k`} />
                                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                                <Tooltip contentStyle={{ fontSize: '10px', padding: '4px 8px' }}/>
                                <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorSalesHome)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-primary flex items-center text-lg"><Activity className="mr-2 text-accent-pink"/> النشاطات الأخيرة</CardTitle>
                        <CardDescription className="text-xs">أحدث الإجراءات والتحديثات على المنصة.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px] p-0">
                        <ScrollArea className="h-full px-6 pb-6">
                        <div className="space-y-3">
                            {recentActivities.map((activity) => (
                            <div key={activity.id} className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded-md">
                                <Avatar className="h-7 w-7 border">
                                    <AvatarImage src={activity.avatarSrc} alt={activity.user} data-ai-hint={activity.dataAiHint} />
                                    <AvatarFallback>{activity.user.substring(0,1)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                <p className="text-xs font-medium text-foreground leading-tight">{activity.description}</p>
                                <p className="text-[10px] text-muted-foreground">{activity.time}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
      </motion.section>

        {/* Dynamic Sections */}
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

        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
             variants={sectionVariants}
        >
        <ContactSection />
        </motion.div>
    </div>
  );
}