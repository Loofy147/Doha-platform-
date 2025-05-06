'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Activity,
  DollarSign,
  Users,
  CreditCard,
  Package,
  Store,
  Settings,
  Bell,
  Download,
  PlusCircle,
  LayoutGrid,
  BarChart3,
  LineChart,
  Zap,
  ShoppingBag
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';


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


export default function AdminDashboardPage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

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
        icon: <Users className="text-pink-500" />, 
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
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                تحميل التقرير
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
                        <Link href={card.href}>عرض التفاصيل</Link>
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
