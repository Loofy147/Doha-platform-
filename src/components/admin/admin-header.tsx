'use client';

import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, // Changed from Home
  ShoppingCart,
  Package,
  Users2,
  Store, 
  LayoutGrid,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  PanelLeft,
  Search,
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

const adminNavItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'لوحة التحكم' },
    { href: '/admin/orders', icon: ShoppingCart, label: 'الطلبات' },
    { href: '/admin/products', icon: Package, label: 'المنتجات' },
    { href: '/admin/customers', icon: Users2, label: 'العملاء' },
    { href: '/admin/sellers', icon: Store, label: 'البائعات' },
    { href: '/admin/categories', icon: LayoutGrid, label: 'الفئات' },
    { href: '/admin/reports', icon: BarChart3, label: 'التقارير' },
    { href: '/admin/settings', icon: Settings, label: 'الإعدادات' },
];


export function AdminHeader() {
  const pathname = usePathname();

  const getBreadcrumbItems = () => {
    const pathParts = pathname.split('/').filter(part => part && part !== 'admin'); 
    let currentPath = '/admin';
    const breadcrumbItems = pathParts.map((part, index) => {
      currentPath += `/${part}`;
      const isLast = index === pathParts.length - 1;
      let label = part.charAt(0).toUpperCase() + part.slice(1);
      if (part === 'orders') label = 'الطلبات';
      if (part === 'products') label = 'المنتجات';
      if (part === 'customers') label = 'العملاء';
      if (part === 'sellers') label = 'البائعات';
      if (part === 'categories') label = 'الفئات';
      if (part === 'reports') label = 'التقارير';
      if (part === 'settings') label = 'الإعدادات';
      if (part === 'new') label = 'إضافة جديد';
      if (part === 'approvals') label = 'الموافقات';
      if (part === 'moderation') label = 'الإشراف';
      if (part === 'users') label = 'المستخدمون';


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
        <SheetContent side="left" className="sm:max-w-xs bg-sidebar">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/admin"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <WomenCommerceLogo className="h-10 w-auto" />
              <span className="sr-only">لمسة ضحى - لوحة التحكم</span>
            </Link>
            {adminNavItems.map(item => (
                <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-2.5 ${pathname === item.href ? 'text-sidebar-primary font-semibold' : 'text-sidebar-foreground hover:text-sidebar-primary'}`}
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
              <Link href="/admin" className="text-muted-foreground hover:text-primary">لوحة التحكم</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {getBreadcrumbItems()}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="بحث..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
             <Bell className="h-5 w-5 text-muted-foreground" /> 
             <span className="sr-only">الإشعارات</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>الإشعارات</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>طلب جديد #1234</DropdownMenuItem>
          <DropdownMenuItem>طلب بائعة جديد معلق</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>عرض كل الإشعارات</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <img
              src="https://picsum.photos/32/32?random=admin"
              width={36}
              height={36}
              alt="صورة حساب المسؤول"
              data-ai-hint="admin avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>حسابي</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            الإعدادات
          </DropdownMenuItem>
          <DropdownMenuItem>الدعم</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            تسجيل الخروج
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
