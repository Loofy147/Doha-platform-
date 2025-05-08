// src/components/dashboard/seller-dashboard-header.tsx
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
  PanelLeft,
  Search,
  Users,
  Palette,
  FileText,
  LifeBuoy,
  CreditCard,
  Gift,
  Eye,
  LayoutTemplate,
  PlusCircle,
  UserCircle,
  Heart,
  LogOutIcon,
  Store // Import Store icon
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
import { Badge } from '@/components/ui/badge';
import { mockStoreDetails } from '@/lib/data/mock-store-data'; // For getting store slug

const dashboardNavItems = [
    { href: '/dashboard', icon: Home, label: 'لوحة التحكم الرئيسية', breadcrumb: 'الرئيسية' },
    { href: '/dashboard/products', icon: Package, label: 'المنتجات والخدمات', breadcrumb: 'المنتجات' },
    { href: '/dashboard/products/new', icon: PlusCircle, label: 'إضافة منتج جديد', parent: '/dashboard/products', breadcrumb: 'إضافة جديد'},
    { href: '/dashboard/products/edit/[productId]', icon: Package, label: 'تعديل المنتج', parent: '/dashboard/products', breadcrumb: 'تعديل', isDynamic: true, dynamicParam: 'productId' },
    { href: '/dashboard/orders', icon: ShoppingBag, label: 'الطلبات الواردة', breadcrumb: 'الطلبات' },
    { href: '/dashboard/orders/[orderId]', icon: ShoppingBag, label: 'تفاصيل الطلب', parent: '/dashboard/orders', breadcrumb: 'تفاصيل الطلب', isDynamic: true, dynamicParam: 'orderId' },
    { href: '/dashboard/customers', icon: Users, label: 'عملائي والتواصل', breadcrumb: 'العملاء' },
    { href: '/dashboard/analytics', icon: BarChart3, label: 'تحليلات المتجر', breadcrumb: 'التحليلات' },
    { href: '/dashboard/marketing', icon: Gift, label: 'التسويق والعروض', breadcrumb: 'التسويق' },
    { href: '/dashboard/payments', icon: CreditCard, label: 'المدفوعات والفواتير', breadcrumb: 'المدفوعات' },
    { href: '/dashboard/store-template', icon: LayoutTemplate, label: 'قالب وتصميم المتجر', breadcrumb: 'تصميم المتجر' },
    { href: '/dashboard/settings', icon: Settings, label: 'إعدادات المتجر العامة', breadcrumb: 'الإعدادات' },
];


const getBreadcrumbPath = (pathname: string) => {
    const pathSegments = pathname.split('/').filter(segment => segment && segment !== 'dashboard');
    const breadcrumbs = [{ href: '/dashboard', label: 'لوحة التحكم' }];
    let currentPath = '/dashboard';

    for (let i = 0; i < pathSegments.length; i++) {
        const segment = pathSegments[i];
        const potentialPath = `${currentPath}/${segment}`;
        let foundMatch = false;

        // Try exact match first
        let matchedNavItem = dashboardNavItems.find(item => item.href === potentialPath && !item.isDynamic);

        // If no exact match, check for dynamic routes
        if (!matchedNavItem) {
             matchedNavItem = dashboardNavItems.find(item =>
                item.isDynamic && potentialPath.startsWith(item.href.split('/[')[0])
            );
            if (matchedNavItem) {
                const dynamicParamValue = segment; // The actual ID/slug
                const breadcrumbLabel = `${matchedNavItem.breadcrumb} #${dynamicParamValue.substring(0,6)}`; // Shorten ID for display
                 if (matchedNavItem.parent && !breadcrumbs.some(b => b.href === matchedNavItem!.parent)) {
                    const parentItem = dashboardNavItems.find(p => p.href === matchedNavItem!.parent);
                     if (parentItem) {
                         breadcrumbs.push({ href: parentItem.href, label: parentItem.breadcrumb });
                     }
                }
                breadcrumbs.push({ href: potentialPath, label: breadcrumbLabel });
                foundMatch = true;
            }
        } else {
            // Handle specific case like /products/new or /products/edit
             if (matchedNavItem.parent && !breadcrumbs.some(b => b.href === matchedNavItem!.parent)) {
                 const parentItem = dashboardNavItems.find(p => p.href === matchedNavItem!.parent);
                 if (parentItem) {
                     breadcrumbs.push({ href: parentItem.href, label: parentItem.breadcrumb });
                 }
            }
            breadcrumbs.push({ href: potentialPath, label: matchedNavItem.breadcrumb });
            foundMatch = true;
        }

        if (foundMatch) {
             currentPath = potentialPath;
        } else {
            // Fallback for unmatched segments (might be an ID without a defined dynamic route structure)
            // We might want to log this or handle it differently
            console.warn("Unmatched segment in breadcrumb:", segment);
        }

    }

    // Remove duplicates that might arise from parent logic
    return breadcrumbs.filter((breadcrumb, index, self) =>
        index === self.findIndex((b) => (b.href === breadcrumb.href))
    );
};


export function SellerDashboardHeader() {
  const pathname = usePathname();
  // For demo purposes, let's assume the seller is managing the first store in mock data.
  // In a real app, this would come from auth/seller context.
  const currentSellerStoreSlug = mockStoreDetails.length > 0 ? mockStoreDetails[0].id : "lamsa-ibdaa"; // Default to a valid slug
  const breadcrumbItems = getBreadcrumbPath(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">فتح/إغلاق القائمة</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="sm:max-w-xs bg-sidebar">
          <nav className="grid gap-6 text-lg font-medium p-4">
            <Link
              href="/dashboard"
              className="group flex h-10 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:text-base mb-4"
            >
              <WomenCommerceLogo className="h-12 w-auto" />
              <span className="sr-only">لمسة ضحى - لوحة التحكم</span>
            </Link>
            {/* Filter nav items for mobile sidebar, maybe excluding dynamic ones unless necessary */}
            {dashboardNavItems.filter(item => !item.isDynamic || !item.parent).map(item => (
                <Link
                key={item.href.replace(/\[.*?\]/g, '')} // Use base href as key
                href={item.href.split('/[')[0]} // Link to base path for dynamic routes in sidebar
                className={`flex items-center gap-4 px-2.5 py-2 rounded-md ${pathname.startsWith(item.href.split('/[')[0]) && item.href !== '/dashboard' ? 'bg-sidebar-primary text-sidebar-primary-foreground font-semibold' : 'text-sidebar-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/10'}`}
              >
                <item.icon className="h-5 w-5" />
                {item.label.split('(')[0]} {/* Show base label */}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={item.href + index}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {index === breadcrumbItems.length - 1 ? (
                  <BreadcrumbPage className="text-foreground">{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href} className="text-muted-foreground hover:text-primary">{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>


      <div className="ml-auto flex items-center gap-3">
        <Button variant="outline" size="sm" asChild className="hidden md:inline-flex border-accent-yellow text-accent-yellow hover:bg-accent-yellow/10 transition-all">
            {/* Make sure the store link uses the correct slug */}
            <Link href={`/store/${currentSellerStoreSlug}`} target="_blank" rel="noopener noreferrer">
                <Eye size={16} className="ml-2" /> معاينة متجري
            </Link>
        </Button>
        <div className="relative md:grow-0">
            <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
            type="search"
            placeholder="بحث في لوحة التحكم..."
            className="w-full rounded-lg bg-background pr-8 md:w-[200px] lg:w-[300px]" // Adjusted for RTL
            />
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full border-2 border-transparent hover:border-primary transition-all group"
            >
                <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                <span className="sr-only">الإشعارات</span>
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-1 ring-background" />
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
                    <Link href="/dashboard/store-template"><LayoutTemplate className="mr-2 h-4 w-4" /><span>تصميم المتجر</span></Link>
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
      </div>
    </header>
  );
}
