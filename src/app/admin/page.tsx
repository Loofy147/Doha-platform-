// src/app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
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
  ShoppingBag, 
  LayoutDashboard, 
  UserCheck, 
  ShieldCheck, 
  Users2 
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
import { motion, type MotionProps } from 'framer-motion';


const platformSalesData = [
  { month: "يناير", revenue: Math.floor(Math.random() * 150000) + 20000, orders: Math.floor(Math.random() * 1000) + 200 },
  { month: "فبراير", revenue: Math.floor(Math.random() * 150000) + 20000, orders: Math.floor(Math.random() * 1000) + 200 },
  { month: "مارس", revenue: Math.floor(Math.random() * 150000) + 20000, orders: Math.floor(Math.random() * 1000) + 200 },
  { month: "أبريل", revenue: Math.floor(Math.random() * 150000) + 20000, orders: Math.floor(Math.random() * 1000) + 200 },
  { month: "مايو", revenue: Math.floor(Math.random() * 150000) + 20000, orders: Math.floor(Math.random() * 1000) + 200 },
  { month: "يونيو", revenue: Math.floor(Math.random() * 150000) + 30000, orders: Math.floor(Math.random() * 1200) + 300 },
];

const adminRecentActivities = [
  { id: 1, user: 'نظام المنصة', description: 'طلب تسجيل بائعة جديدة: متجر الأمل.', time: 'منذ 15 دقيقة', avatarSrc: 'https://picsum.photos/seed/sellerapp/40/40', dataAiHint: "application form", href: "/admin/sellers/approvals" },
  { id: 2, user: 'تنبيه النظام', description: 'تحديث المنصة مجدول الليلة الساعة 2 صباحًا.', time: 'منذ ساعة', avatarSrc: 'https://picsum.photos/seed/systemalert/40/40', dataAiHint: "alert icon", href: "#"  },
  { id: 3, user: 'إدارة المحتوى', description: 'بلاغ جديد: محتوى غير مناسب في منتج "فستان الزفاف الملكي".', time: 'منذ ساعتين', avatarSrc: 'https://picsum.photos/seed/reportcontent/40/40', dataAiHint: "warning sign", href: "/admin/moderation" },
  { id: 4, user: 'مراقبة الطلبات', description: 'طلب ذو قيمة عالية جديد: #ORD789 بقيمة 75,000 دج.', time: 'منذ 4 ساعات', avatarSrc: 'https://picsum.photos/seed/highvalueorder/40/40', dataAiHint: "money bag", href: "/admin/orders" },
  { id: 5, user: 'دعم فني', description: 'تذكرة دعم جديدة من المستخدمة "هناء.م" بخصوص عملية الدفع.', time: 'منذ 6 ساعات', avatarSrc: 'https://picsum.photos/seed/supportticket/40/40', dataAiHint: "headset help", href: "#"  },
];

const pageEntryVariants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const sectionVariants: MotionProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.1 },
  variants: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1, 
        duration: 0.5,
        ease: "easeOut"
      } 
    }
  }
};

const itemVariants: MotionProps = {
  variants: {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.4, 
        ease: "easeOut" 
      } 
    }
  }
};


export default function AdminDashboardPage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const overviewCards = [
      { 
        title: "إجمالي إيرادات المنصة", 
        value: "1,245,231.89 دج", 
        icon: <DollarSign className="text-green-500" />, 
        href: "/admin/reports",
        trend: "+18.5% عن الشهر الماضي",
        color: "green"
      },
      { 
        title: "إجمالي الطلبات على المنصة", 
        value: "22,580", 
        icon: <ShoppingBag className="text-blue-500" />, 
        href: "/admin/orders",
        trend: "+512 هذا الأسبوع",
        color: "blue"
      },
      { 
        title: "إجمالي العملاء المسجلين", 
        value: "8,750", 
        icon: <Users className="text-pink-500" />, 
        href: "/admin/customers",
        trend: "+120 عميل جديد",
        color: "pink" 
      },
      { 
        title: "إجمالي المبدعات النشطات", 
        value: "485", 
        icon: <Store className="text-indigo-500" />, 
        href: "/admin/sellers",
        trend: "+15 مبدعة هذا الشهر",
        color: "indigo"
      },
       { 
        title: "طلبات معلقة", 
        value: "12 بائعة / 25 منتج", 
        icon: <Bell className="text-yellow-500 animate-pulse" style={{animationDuration: '1.5s'}} />, 
        href: "/admin/sellers/approvals", 
        color: "yellow"
      },
    ];

    const quickActions = [
      { label: "إدارة المستخدمين", icon: Users2, href: "/admin/users" },
      { label: "إعدادات المنصة", icon: Settings, href: "/admin/settings" },
      { label: "مراجعة المحتوى", icon: ShieldCheck, href: "/admin/moderation" }, 
      { label: "الموافقة على المبدعات", icon: UserCheck, href: "/admin/sellers/approvals" }, 
      { label: "إدارة الفئات", icon: LayoutGrid, href: "/admin/categories" },
      { label: "إنشاء تقارير", icon: BarChart3, href: "/admin/reports" },
    ];
    

    if (!isClient) {
        return (
            <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <Skeleton className="h-10 w-3/5 md:w-2/5" />
                     <Skeleton className="h-10 w-28" />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-32 rounded-lg" />)}
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Skeleton className="lg:col-span-2 h-80 rounded-lg" />
                    <Skeleton className="h-80 rounded-lg" />
                </div>
                <Skeleton className="h-40 rounded-lg" />
            </div>
        );
    }

  return (
    <motion.div 
      className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-background"
      {...pageEntryVariants}
    >
      <motion.div 
        className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0"
        {...itemVariants}
      >
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary flex items-center">
              <LayoutDashboard className="mr-2 h-7 w-7 text-accent-pink" /> لوحة التحكم الإدارية
            </h2>
            <p className="text-muted-foreground">نظرة عامة شاملة على أداء ونشاط منصة لمسة ضحى.</p>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Button variant="outline" asChild>
                <Link href="/admin/reports"> 
                    <Download className="ml-2 h-4 w-4" /> 
                    تصدير ملخص المنصة
                </Link>
            </Button>
        </div>
      </motion.div>

        <motion.div 
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            {...sectionVariants}
        >
            {overviewCards.map((card, index) => (
            <motion.div key={card.title} {...itemVariants} custom={index}>
              <Card className={`shadow-lg border-r-4 border-${card.color}-500 hover:shadow-xl transition-shadow`}> 
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
                  <CardFooter className="pt-3">
                      <Button variant="ghost" size="sm" asChild className="text-xs text-primary hover:underline p-0 h-auto">
                          <Link href={card.href}>عرض التفاصيل</Link>
                      </Button>
                  </CardFooter>
              </Card>
            </motion.div>
            ))}
        </motion.div>
        
        <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            {...sectionVariants}
        >
            <motion.div className="lg:col-span-2" {...itemVariants}>
              <Card className="shadow-lg">
                  <CardHeader>
                      <CardTitle className="text-primary flex items-center"><LineChart className="ml-2 text-accent-purple" /> اتجاهات أداء المنصة</CardTitle>
                      <CardDescription>إيرادات وطلبات المنصة خلال آخر 6 أشهر.</CardDescription>
                  </CardHeader>
                  <CardContent className="pr-2"> 
                      <ResponsiveContainer width="100%" height={300}>
                          <AreaChart data={platformSalesData}>
                              <defs>
                                  <linearGradient id="colorRevenueAdmin" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.7}/>
                                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                                  </linearGradient>
                                  <linearGradient id="colorOrdersAdmin" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="hsl(var(--accent-teal))" stopOpacity={0.6}/> 
                                  <stop offset="95%" stopColor="hsl(var(--accent-teal))" stopOpacity={0.1}/>
                                  </linearGradient>
                              </defs>
                              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} reversed={true} /> 
                              <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000} ألف دج`} orientation="right" /> 
                              <YAxis yAxisId="right" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} orientation="left" /> 
                              <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius)"}} cursor={{fill: "hsla(var(--primary)/0.05)"}}/>
                              <Legend verticalAlign="top" height={36} />
                              <Area yAxisId="left" type="monotone" dataKey="revenue" name="الإيرادات (دج)" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRevenueAdmin)" />
                              <Area yAxisId="right" type="monotone" dataKey="orders" name="عدد الطلبات" stroke="hsl(var(--accent-teal))" fillOpacity={1} fill="url(#colorOrdersAdmin)" />
                          </AreaChart>
                      </ResponsiveContainer>
                  </CardContent>
              </Card>
            </motion.div>

            <motion.div {...itemVariants}>
              <Card className="shadow-lg">
                  <CardHeader>
                      <CardTitle className="text-primary flex items-center"><Activity className="ml-2 text-accent-pink"/> النشاطات الإدارية الأخيرة</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <ScrollArea className="h-[300px]">
                      <motion.div className="space-y-4" variants={sectionVariants.variants}>
                          {adminRecentActivities.map((activity, index) => ( // Added index
                          <motion.div key={activity.id} {...itemVariants} custom={index}> {/* Added custom={index} */}
                            <Link href={activity.href} className="block hover:bg-muted/50 rounded-md transition-colors">
                                <div className="flex items-start space-x-3 p-2 rtl:space-x-reverse">
                                    <Avatar className="h-8 w-8 border">
                                        <AvatarImage src={activity.avatarSrc} alt={activity.user} data-ai-hint={activity.dataAiHint} />
                                        <AvatarFallback>{activity.user.substring(0,1)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                    <p className="text-sm font-medium text-foreground leading-none">{activity.description}</p>
                                    <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
                                    </div>
                                </div>
                            </Link>
                          </motion.div>
                          ))}
                      </motion.div>
                      </ScrollArea>
                  </CardContent>
                   <CardFooter className="border-t pt-4">
                      <Button variant="outline" size="sm" className="w-full">عرض كل سجلات النظام</Button>
                  </CardFooter>
              </Card>
            </motion.div>
        </motion.div>

        <motion.div {...sectionVariants}>
          <Card className="shadow-lg">
              <CardHeader>
                  <motion.h2 {...itemVariants} className="text-primary flex items-center text-xl font-semibold"><Zap className="ml-2 text-accent-yellow"/> إجراءات إدارية سريعة</motion.h2>
              </CardHeader>
              <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {quickActions.map((action, index) => ( // Added index
                      <motion.div key={action.label} {...itemVariants} custom={index}> {/* Added custom={index} */}
                        <Button variant="outline" asChild className="flex flex-col h-24 items-center justify-center p-4 text-center hover:bg-primary/5 border-dashed border-primary/30 hover:border-primary">
                            <Link href={action.href}>
                                <action.icon size={20} className="mb-1"/>
                                <span className="mt-1 text-xs sm:text-sm">{action.label}</span>
                            </Link>
                        </Button>
                      </motion.div>
                  ))}
              </CardContent>
          </Card>
        </motion.div>
    </motion.div>
  );
}
