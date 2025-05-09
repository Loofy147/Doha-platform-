// src/components/dashboard/seller-dashboard-sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
  Gift, // Added for Marketing
  Star, // Added for Reviews
  CreditCard,
  MessageSquare,
  LayoutTemplate,
  Ticket, // New icon for coupons/discounts
  Megaphone // New icon for promotions
} from 'lucide-react';
import { WomenCommerceLogo } from '@/components/icons/logo'; // Will be LamsaDohaLogo
import { Separator } from '@/components/ui/separator';

const mainNavItems = [
    { href: '/dashboard', icon: Home, label: 'لوحة التحكم الرئيسية' },
    { href: '/dashboard/products', icon: Package, label: 'منتجاتي وخدماتي' },
    { href: '/dashboard/orders', icon: ShoppingBag, label: 'طلباتي الواردة' },
    { href: '/dashboard/customers', icon: Users, label: 'عملائي والتواصل (قريباً)' }, 
    { href: '/dashboard/analytics', icon: BarChart3, label: 'تحليلات متجري (قريباً)' }, 
];

const storeManagementNavItems = [
    { href: '/dashboard/marketing', icon: Megaphone, label: 'التسويق والعروض' }, 
    { href: '/dashboard/reviews', icon: Star, label: 'تقييمات العملاء' },
    { href: '/dashboard/payments', icon: CreditCard, label: 'المدفوعات والفواتير (قريباً)' }, 
    { href: '/dashboard/store-template', icon: LayoutTemplate, label: 'قالب وتصميم المتجر'},
];


export function SellerDashboardSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard' && pathname === '/dashboard') return true;
    // For nested routes like /dashboard/products/new, we want /dashboard/products to be active.
    if (pathname.startsWith(href) && href !== '/dashboard') {
        // Special case for /dashboard/products/new or /dashboard/products/edit/[id]
        if (href === '/dashboard/products' && (pathname.includes('/new') || pathname.includes('/edit'))) {
            return true;
        }
        // If not a sub-route of products, direct match is fine
        if (href !== '/dashboard/products') return true;
    }
    return pathname === href;
  };

  return (
    <aside className="fixed inset-y-0 right-0 z-40 hidden w-14 flex-col border-l bg-sidebar sm:flex"> {/* Changed left to right, border-r to border-l */}
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/dashboard"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-sidebar-primary text-lg font-semibold text-sidebar-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <WomenCommerceLogo className="h-8 w-auto transition-all group-hover:scale-110" />
            <span className="sr-only">لمسة ضحى - لوحة تحكم المبدعة</span>
          </Link>
          {mainNavItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8
                    ${isActive(item.href)
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground hover:text-sidebar-accent-foreground' 
                      : 'text-sidebar-muted-foreground hover:text-sidebar-foreground'
                    }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="left">{item.label}</TooltipContent> {/* Changed side to left */}
            </Tooltip>
          ))}
        </nav>
        
        <Separator className="my-2 bg-sidebar-border" />

         <nav className="flex flex-col items-center gap-4 px-2 sm:py-3">
          {storeManagementNavItems.map((item) => (
             <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8
                    ${isActive(item.href)
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground hover:text-sidebar-accent-foreground' 
                      : 'text-sidebar-muted-foreground hover:text-sidebar-foreground'
                    }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="left">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>

        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/settings"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8
                  ${isActive('/dashboard/settings') 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground hover:text-sidebar-accent-foreground' 
                    : 'text-sidebar-muted-foreground hover:text-sidebar-foreground'
                  }`}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">إعدادات المتجر العامة</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="left">إعدادات المتجر العامة</TooltipContent> {/* Changed side to left */}
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
}