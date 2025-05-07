'use client';

import React from 'react';
import Link from 'next/link';
import {
  Home,
  Package,
  ShoppingBag,
  Settings,
  BarChart3,
  Bell,
  LogOut,
  PanelLeft,
  Search,
  Users,
  Palette,
  FileText,
  LifeBuoy,
  CreditCard,
  Gift
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
  DropdownMenuGroup,
  DropdownMenuShortcut
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { WomenCommerceLogo } from '@/components/icons/logo';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PlusCircle, UserCircle, Heart, LogOutIcon } from 'lucide-react';

const dashboardNavItems = [
    { href: '/dashboard', icon: Home, label: 'لوحة التحكم الرئيسية' },
    { href: '/dashboard/products', icon: Package, label: 'المنتجات والخدمات' },
    { href: '/dashboard/products/new', icon: PlusCircle, label: 'إضافة منتج جديد', parent: '/dashboard/products'},
    { href: '/dashboard/orders', icon: ShoppingBag, label: 'الطلبات' },
    { href: '/dashboard/customers', icon: Users, label: 'العملاء والتواصل' }, // Placeholder
    { href: '/dashboard/analytics', icon: BarChart3, label: 'تحليلات المتجر' }, // Placeholder
    { href: '/dashboard/marketing', icon: Gift, label: 'التسويق والعروض' }, // Placeholder
    { href: '/dashboard/payments', icon: CreditCard, label: 'المدفوعات والفواتير' }, // Placeholder
    { href: '/dashboard/settings', icon: Settings, label: 'إعدادات المتجر' },
];

const kebabToTitleCase = (str: string) => {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};


export function SellerDashboardHeader() {
  const pathname = usePathname();

  const getBreadcrumbItems = () => {
    const pathParts = pathname.split('/').filter(part => part && part !== 'dashboard');
    let currentPath = '/dashboard';
    
    const breadcrumbItems = pathParts.map((part, index) => {
      currentPath += `/${part}`;
      const isLast = index === pathParts.length - 1;
      
      const navItem = dashboardNavItems.find(item => item.href === currentPath || (item.parent && currentPath.startsWith(item.parent) && currentPath.endsWith(part)));
      let label = navItem ? navItem.label : kebabToTitleCase(part); // Fallback for dynamic parts like [productId]

      // Specific labels for known segments
      if (part === 'new' && currentPath.includes('/products/new')) label = 'إضافة جديد';
      if (part === 'edit' && currentPath.includes('/products/edit')) label = 'تعديل المنتج';
      if (currentPath.match(/\/dashboard\/orders\/ORD\d+/)) {
         label = `تفاصيل الطلب #${part}`;
      }


      return (
        <React.Fragment key={currentPath}>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {isLast ? (
              <BreadcrumbPage className="text-foreground font-medium">{label}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link href={navItem?.href || currentPath} className="text-muted-foreground hover:text-primary">{label}</Link>
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
        <SheetContent side="right" className="sm:max-w-xs bg-sidebar"> {/* Changed to right for RTL */}
          <nav className="grid gap-6 text-lg font-medium p-4">
            <Link
              href="/dashboard"
              className="group flex h-10 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:text-base mb-4"
            >
              <WomenCommerceLogo className="h-12 w-auto" />
              <span className="sr-only">لمسة ضحى - لوحة التحكم</span>
            </Link>
            {dashboardNavItems.filter(item => !item.parent).map(item => ( // Filter out sub-items
                <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-2.5 py-2 rounded-md ${pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href)) ? 'bg-sidebar-primary text-sidebar-primary-foreground font-semibold' : 'text-sidebar-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/10'}`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
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
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> {/* Adjust to right-2.5 for RTL */}
        <Input
          type="search"
          placeholder="بحث في لوحة التحكم..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" /* Adjust to pr-8 for RTL */
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full border-2 border-transparent hover:border-primary transition-all"
          >
             <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary" /> 
             <span className="sr-only">الإشعارات</span>
             {/* Add a dot for unread notifications */}
             {/* <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" /> */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel className="flex justify-between items-center">
            <span>الإشعارات الهامة</span>
            <Badge variant="destructive">3 جديدة</Badge>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-start gap-2">
            <ShoppingBag className="h-4 w-4 mt-1 text-green-500"/>
            <div>
                <p className="font-medium">طلب جديد #ORD582</p>
                <p className="text-xs text-muted-foreground">من نورة السالم - منذ 5 دقائق</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-start gap-2">
            <Users className="h-4 w-4 mt-1 text-blue-500"/>
             <div>
                <p className="font-medium">رسالة جديدة من عميل</p>
                <p className="text-xs text-muted-foreground">بخصوص استفسار عن منتج "فستان الزفاف"</p>
            </div>
          </DropdownMenuItem>
           <DropdownMenuItem className="flex items-start gap-2">
            <Package className="h-4 w-4 mt-1 text-yellow-500"/>
             <div>
                <p className="font-medium">مخزون منخفض لمنتج</p>
                <p className="text-xs text-muted-foreground">"أقراط اللؤلؤ" - تبقى قطعتان فقط</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/notifications" className="text-primary hover:underline justify-center">
                عرض كل الإشعارات
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="overflow-hidden rounded-full p-0 w-9 h-9 focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Avatar className="h-9 w-9 border border-primary/50">
                <AvatarImage src="https://picsum.photos/id/1027/40/40" alt="صورة المبدعة" data-ai-hint="woman seller" />
                <AvatarFallback>ضحى</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>حسابي كـ مبدعة</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
                 <Link href="/profile"><UserCircle className="mr-2 h-4 w-4" /><span>ملفي الشخصي العام</span></Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/dashboard/settings"><Settings className="mr-2 h-4 w-4" /><span>إعدادات المتجر</span></Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
                <Link href="/dashboard/payments"><CreditCard className="mr-2 h-4 w-4" /><span>المدفوعات والفواتير</span></Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/help-center"><LifeBuoy className="mr-2 h-4 w-4" /><span>مركز المساعدة</span></Link>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Palette className="mr-2 h-4 w-4" />
            <span>تغيير المظهر (قريباً)</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>تسجيل الخروج</span>
            <DropdownMenuShortcut>⇧⌘خ</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

