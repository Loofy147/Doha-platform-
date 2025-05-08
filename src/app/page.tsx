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
    { 
      title: "إجمالي الإيرادات", 
      value: "125,800 دج", 
      icon: <DollarSign className="text-green-500" />, 
      href: "/admin/reports/revenue",
      trend: "+15% هذا الشهر",
      color: "green"
    },
    { 
      title: "الطلبات الجديدة", 
      value: "12", 
      icon: <ShoppingBag className="text-blue-500" />, 
      href: "/admin/orders", 
      color: "blue"
    },
    { 
      title: "المنتجات المعروضة", 
      value: "42", 
      icon: <Package className="text-purple-500" />, 
      href: "/admin/products",
      color: "purple"
    },
    { 
      title: "تقييمات العملاء", 
      value: "4.8 نجوم", 
      icon: <Star className="text-yellow-500" />, 
      href: "/admin/customers",
      color: "yellow"
    },
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
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-background">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0">
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary">لوحة تحكم لمسة ضحى</h2>
            <p className="text-muted-foreground">نظرة عامة على نشاط منصة لمسة ضحى.</p>
        </div>
        <div className="flex items-center space-x-2">
            <Button variant="outline" asChild>
                <Link href="/admin/reports">
                    <Download className="mr-2 h-4 w-4" />
                    تحميل التقرير
                </Link>
            </Button>
        </div>
      </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {overviewCards.map((card) => (
            <Card key={card.title} className={`shadow-lg border-l-4 border-${card.color}-500`}>
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
                        {card.href ? (
                            <Link href={card.href}>عرض التفاصيل</Link>
                        ) : (
                            <span>عرض التفاصيل</span>
                        )}
                    </Button>
                </CardFooter>
            </Card>
            ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-primary flex items-center"><LineChart className="mr-2 text-accent-purple" /> اتجاهات المبيعات</CardTitle>
                    <CardDescription>أداء المبيعات لآخر 6 أشهر.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={salesData}>
                            <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000} ألف دج`} />
                            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius)"}} cursor={{fill: "hsla(var(--primary)/0.1)"}}/>
                            <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorSales)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-primary flex items-center"><Activity className="mr-2 text-accent-pink"/> النشاطات الأخيرة</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                        {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3 p-2 hover:bg-muted/50 rounded-md">
                            <Avatar className="h-8 w-8 border">
                                <AvatarImage src={activity.avatarSrc} alt={activity.user} data-ai-hint={activity.dataAiHint} />
                                <AvatarFallback>{activity.user.substring(0,1)}</AvatarFallback>
                            </Avatar>
                            <div>
                            <p className="text-sm font-medium text-foreground leading-none">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    </ScrollArea>
                </CardContent>
                 <CardFooter className="border-t pt-4">
                    <Button variant="outline" size="sm" className="w-full">عرض كل النشاطات</Button>
                </CardFooter>
            </Card>
        </div>

        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-primary flex items-center"><Zap className="mr-2 text-accent-yellow"/> إجراءات سريعة</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action) => (
                    <Button key={action.label} variant="outline" asChild className="flex flex-col h-24 items-center justify-center p-4 text-center hover:bg-primary/5 border-dashed border-primary/30 hover:border-primary">
                        <Link href={action.href}>
                            {action.icon}
                            <span className="mt-1 text-xs sm:text-sm">{action.label}</span>
                        </Link>
                    </Button>
                ))}
            </CardContent>
        </Card>

    </div>
  );
}
