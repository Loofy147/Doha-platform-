// src/components/dashboard/seller-dashboard-header.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import {
  Home,
  Package,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  Palette,
  FileText,
  PlusCircle,
  Gift, // Keep for general marketing, but use Megaphone for main icon
  CreditCard,
  MessageSquare,
  LayoutTemplate,
  Bell,
  LogOut,
  PanelLeft,
  Search,
  LayoutGrid,
  Eye, 
  Star, 
  UserCircle,
  Megaphone, // Added for Marketing
  Ticket, // For coupons/discounts maybe later
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { WomenCommerceLogo } from '@/components/icons/logo';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const sellerNavItems = [
    { href: '/dashboard', icon: Home, label: 'لوحة التحكم الرئيسية' },
    { href: '/dashboard/products', icon: Package, label: 'منتجاتي وخدماتي' },
    { href: '/dashboard/orders', icon: ShoppingBag, label: 'طلباتي الواردة' },
    { href: '/dashboard/marketing', icon: Megaphone, label: 'التسويق والعروض' }, // Added
    { href: '/dashboard/reviews', icon: Star, label: 'تقييمات العملاء' }, // Added
    // { href: '/dashboard/customers', icon: Users, label: 'عملائي والتواصل (قريباً)' }, 
    // { href: '/dashboard/analytics', icon: BarChart3, label: 'تحليلات متجري (قريباً)' }, 
    // { href: '/dashboard/payments', icon: CreditCard, label: 'المدفوعات والفواتير (قريباً)' }, 
    { href: '/dashboard/store-template', icon: LayoutTemplate, label: 'قالب وتصميم المتجر'},
    { href: '/dashboard/settings', icon: Settings, label: 'إعدادات المتجر العامة' },
];

const MOCK_SELLER_SLUG = "lamsa-ibdaa"; // Replace with dynamic slug later

export function SellerDashboardHeader() {
  const pathname = usePathname();

  const getBreadcrumbItems = () => {
    const pathParts = pathname.split('/').filter(part => part && part !== 'dashboard'); 
    let currentPath = '/dashboard';
    const breadcrumbItems = pathParts.map((part, index) => {
      currentPath += `/${part}`;
      const isLast = index === pathParts.length - 1;

      let label = part.charAt(0).toUpperCase() + part.slice(1);
      if (part === 'products') label = 'منتجاتي';
      else if (part === 'orders') label = 'طلباتي';
      else if (part === 'settings') label = 'الإعدادات العامة';
      else if (part === 'store-template') label = 'تصميم المتجر';
      else if (part === 'marketing') label = 'التسويق والعروض'; // Added
      else if (part === 'reviews') label = 'تقييمات العملاء'; // Added
      else if (part === 'new') label = 'إضافة جديد';
      else if (part === 'edit') label = 'تعديل';
      
      if (pathname.includes('/edit/') && part !== 'edit' && index > 0 && pathParts[index -1] === 'products') label = `تعديل #${label}`;
      else if (pathname.includes('/orders/') && part !== 'orders' && index > 0) label = `طلب #${label}`;


      return (
        <React.Fragment key={currentPath}>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {isLast ? (
              <BreadcrumbPage className="text-foreground">{label}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link href={currentPath} className="text-muted-foreground hover:text-primary">{label}</Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        </React.Fragment>
      );
    });
    return breadcrumbItems;
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">فتح/إغلاق القائمة</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="sm:max-w-xs bg-sidebar text-sidebar-foreground">
          <nav className="grid gap-6 text-lg font-medium p-4">
            <Link
              href="/dashboard"
              className="group flex h-10 shrink-0 items-center justify-start gap-2 rounded-full text-lg font-semibold text-sidebar-primary md:text-base mb-4"
            >
              <WomenCommerceLogo className="h-10 w-auto" />
              <span className="sr-only">لمسة ضحى - لوحة التحكم</span>
            </Link>
            {sellerNavItems.map(item => (
                <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-2.5 rounded-md py-2 transition-colors ${pathname.startsWith(item.href) ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' : 'text-sidebar-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/10'}`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
             <Button variant="outline" className="mt-6 border-sidebar-border text-sidebar-muted-foreground hover:bg-sidebar-accent/20 hover:text-sidebar-foreground" onClick={() => alert('تسجيل الخروج (محاكاة)')}>
                <LogOut className="mr-2 h-4 w-4" />
                تسجيل الخروج
            </Button>
          </nav>
        </SheetContent>
      </Sheet>

      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard" className="text-muted-foreground hover:text-primary">لوحة التحكم</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {getBreadcrumbItems()}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="relative ml-auto flex items-center gap-4 md:grow-0">
        <Button variant="outline" size="sm" asChild className="hidden sm:flex border-accent-purple text-accent-purple hover:bg-accent-purple/10">
            <Link href={`/store/${MOCK_SELLER_SLUG}`} target="_blank" rel="noopener noreferrer">
                <Eye size={16} className="ml-2" /> عرض متجري العام
            </Link>
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full relative ml-4"
          >
             <Bell className="h-5 w-5 text-muted-foreground" />
             <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 text-white text-[8px] items-center justify-center">3</span>
             </span>
             <span className="sr-only">الإشعارات</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel className="flex justify-between items-center">
            <span>الإشعارات الهامة</span>
            <Badge variant="destructive">3 جديدة</Badge>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-start gap-2">
            <ShoppingBag size={16} className="text-green-500 mt-1"/>
            <div>
                <p className="text-xs font-medium">طلب جديد #ORD701</p>
                <p className="text-xs text-muted-foreground">من نورة السالم - منذ 5 دقائق</p>
            </div>
          </DropdownMenuItem>
           <DropdownMenuItem className="flex items-start gap-2">
            <MessageSquare size={16} className="text-blue-500 mt-1"/>
            <div>
                <p className="text-xs font-medium">رسالة جديدة</p>
                <p className="text-xs text-muted-foreground">من أمل عبدالله بخصوص إيجار فستان</p>
            </div>
          </DropdownMenuItem>
            <DropdownMenuItem className="flex items-start gap-2">
            <Star size={16} className="text-yellow-500 mt-1"/>
            <div>
                <p className="text-xs font-medium">تقييم جديد (5 نجوم)</p>
                <p className="text-xs text-muted-foreground">على منتج أقراط فضية - بواسطة هند</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/notifications" className="text-center justify-center text-primary hover:underline">عرض كل الإشعارات</Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://picsum.photos/seed/seller_doha/40/40" alt="صورة حساب المبدعة ضحى" data-ai-hint="woman smiling seller" />
              <AvatarFallback>ضح</AvatarFallback> 
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>حساب المبدعة</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">
              <Settings className="mr-2 h-4 w-4" />
              إعدادات المتجر
            </Link>
          </DropdownMenuItem>
           <DropdownMenuItem asChild>
            <Link href="/profile"> 
              <UserCircle className="mr-2 h-4 w-4" />
              ملفي الشخصي (عام)
            </Link>
          </DropdownMenuItem>
           <DropdownMenuItem asChild>
            <Link href="/help-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              المساعدة والدعم
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => alert('تسجيل الخروج (محاكاة)')}>
            <LogOut className="mr-2 h-4 w-4" />
            تسجيل الخروج
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}