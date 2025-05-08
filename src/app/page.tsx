// src/app/dashboard/page.tsx
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
  LayoutTemplate // Added for Store Template
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
import { Badge } from '@/components/ui/badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const salesDataMonthly = [
  { month: "يناير", sales: Math.floor(Math.random() * 30000) + 5000, earnings: Math.floor(Math.random() * 20000) + 3000 },
  { month: "فبراير", sales: Math.floor(Math.random() * 30000) + 5000, earnings: Math.floor(Math.random() * 20000) + 3000 },
  { month: "مارس", sales: Math.floor(Math.random() * 30000) + 5000, earnings: Math.floor(Math.random() * 20000) + 3000 },
  { month: "أبريل", sales: Math.floor(Math.random() * 30000) + 5000, earnings: Math.floor(Math.random() * 20000) + 3000 },
  { month: "مايو", sales: Math.floor(Math.random() * 30000) + 5000, earnings: Math.floor(Math.random() * 20000) + 3000 },
  { month: "يونيو", sales: Math.floor(Math.random() * 30000) + 10000, earnings: Math.floor(Math.random() * 25000) + 8000 },
];

const mockSellerProfile = {
  storeName: "متجر لمسات ضحى الإبداعية",
  avatarSrc: "https://picsum.photos/id/1027/100/100",
  dataAiHint: "woman smiling store owner",
  sellerSince: "مارس 2023",
  profileCompletion: 85, // percentage
  storeSlug: "lamsa-ibdaa" // Updated to a valid slug from mock-store-data
};

const recentActivities = [
  { id: 1, icon: <ShoppingBag className="text-green-500" />, description: "طلب جديد #ORD582 لـ 'كيكة مناسبات فاخرة'", time: "منذ 30 دقيقة", href: "/dashboard/orders/ORD582" },
  { id: 2, icon: <MessageSquare className="text-blue-500" />, description: "رسالة جديدة من الزبونة 'نورة السالم'", time: "منذ ساعة", href: "/dashboard/messages/noura-salem" },
  { id: 3, icon: <Star className="text-yellow-500" />, description: "تقييم جديد (5 نجوم) على منتج 'فستان سهرة للإيجار'", time: "منذ 3 ساعات", href: "/dashboard/reviews" },
  { id: 4, icon: <Package className="text-purple-500" />, description: "تم تحديث كمية منتج 'أقراط فضية يدوية الصنع'", time: "منذ 5 ساعات", href: "/dashboard/products" },
];

export default function SellerDashboardPage() {
  const [isClient, setIsClient] = useState(false);
  const [sellerName, setSellerName] = useState("مبدعتنا الغالية"); 
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    setSellerName("ضحى الأنصاري"); 
  }, []);
  
  const dashboardStats = [
    { title: "إجمالي الإيرادات", value: "125,800 دج", icon: <DollarSign className="text-green-500" />, trend: "+15% هذا الشهر", bgColor: "bg-green-500/10", borderColor: "border-green-500" },
    { title: "الطلبات الجديدة", value: "12", icon: <ShoppingBag className="text-blue-500" />, trend: "+3 اليوم", bgColor: "bg-blue-500/10", borderColor: "border-blue-500"},
    { title: "المنتجات المعروضة", value: "42", icon: <Package className="text-purple-500" />, trend: "5 غير نشطة", bgColor: "bg-purple-500/10", borderColor: "border-purple-500" },
    { title: "تقييمات العملاء", value: "4.8 نجوم", icon: <Star className="text-yellow-500" />, trend: " (85 تقييم)", bgColor: "bg-yellow-500/10", borderColor: "border-yellow-500" },
  ];

  const quickActions = [
    { label: "إضافة منتج/خدمة", icon: PlusCircle, href: "/dashboard/products/new", color: "text-accent-pink" },
    { label: "إدارة المنتجات", icon: Package, href: "/dashboard/products", color: "text-accent-purple" },
    { label: "عرض الطلبات", icon: ShoppingBag, href: "/dashboard/orders", color: "text-green-500" },
    { label: "تصميم المتجر", icon: LayoutTemplate, href: "/dashboard/store-template", color: "text-orange-500" },
    { label: "إعدادات المتجر", icon: Settings, href: "/dashboard/settings", color: "text-blue-500" },
    { label: "سياسات المتجر", icon: FileText, href: "/dashboard/settings#policies", color: "text-teal-500" },
  ];

  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
         <Skeleton className="h-10 w-1/3 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32 rounded-lg" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Skeleton className="lg:col-span-2 h-80 rounded-lg" />
          <Skeleton className="h-80 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-background">
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            لوحة تحكم متجركِ الإبداعي
          </h1>
          <p className="mt-1 text-lg text-foreground/80">
            أهلاً بكِ مجددًا، {sellerName}! هنا تديرين كل ما يخص متجركِ على لمسة ضحى.
          </p>
        </div>
         <Button asChild className="mt-4 sm:mt-0 bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground shadow-md">
            <Link href="/dashboard/products/new" className="flex items-center gap-2">
                <PlusCircle size={20} /> أضيفي لمسة إبداعية جديدة
            </Link>
        </Button>
      </header>

      {/* Seller Profile Snippet */}
      <Card className="mb-8 shadow-lg border-l-4 border-accent-pink bg-card">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="h-20 w-20 border-2 border-primary">
            <AvatarImage src={mockSellerProfile.avatarSrc} alt={sellerName} data-ai-hint={mockSellerProfile.dataAiHint} />
            <AvatarFallback>{sellerName.substring(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center sm:text-right">
            <h2 className="text-xl font-semibold text-primary">{mockSellerProfile.storeName}</h2>
            <p className="text-sm text-muted-foreground">مبدعة في لمسة ضحى منذ: {mockSellerProfile.sellerSince}</p>
            <div className="mt-2">
              <div className="flex justify-between items-center mb-1">
                 <span className="text-xs font-medium text-muted-foreground">إكتمال ملف المتجر</span>
                 <span className="text-xs font-semibold text-accent-pink">{mockSellerProfile.profileCompletion}%</span>
              </div>
              <Progress value={mockSellerProfile.profileCompletion} aria-label="إكتمال ملف المتجر" className="h-2" />
            </div>
          </div>
          <Button variant="outline" asChild className="border-accent-purple text-accent-purple hover:bg-accent-purple/10">
            <Link href={`/store/${mockSellerProfile.storeSlug}`} target="_blank" rel="noopener noreferrer">
                <Eye size={18} className="ml-2"/> عرض المتجر العام 
            </Link>
          </Button>
        </CardContent>
      </Card>


      {/* Stats Cards */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {dashboardStats.map((card) => (
          <Card key={card.title} className={`shadow-md hover:shadow-lg transition-shadow border-l-4 ${card.borderColor} ${card.bgColor}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{card.value}</div>
              {card.trend && <p className="text-xs text-muted-foreground">{card.trend}</p>}
            </CardContent>
             <CardFooter>
                    <Button variant="ghost" size="sm" asChild className="text-xs text-primary hover:underline p-0 h-auto">
                        <Link href={card.href}>عرض التفاصيل</Link>
                    </Button>
                </CardFooter>
          </Card>
        ))}
      </section>

    </div>
  );
}

