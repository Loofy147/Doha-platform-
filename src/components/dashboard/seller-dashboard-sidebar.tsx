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
  Gift,
  CreditCard,
  MessageSquare
} from 'lucide-react';
import { WomenCommerceLogo } from '@/components/icons/logo';

const mainNavItems = [
    { href: '/dashboard', icon: Home, label: 'لوحة التحكم' },
    { href: '/dashboard/products', icon: Package, label: 'منتجاتي وخدماتي' },
    { href: '/dashboard/orders', icon: ShoppingBag, label: 'طلباتي' },
    { href: '/dashboard/customers', icon: Users, label: 'العملاء والرسائل' }, // Placeholder
    { href: '/dashboard/analytics', icon: BarChart3, label: 'تحليلات المتجر' }, // Placeholder
];

const managementNavItems = [
    { href: '/dashboard/marketing', icon: Gift, label: 'التسويق والعروض' }, // Placeholder
    { href: '/dashboard/payments', icon: CreditCard, label: 'المدفوعات والفواتير' }, // Placeholder
];


export function SellerDashboardSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed inset-y-0 right-0 z-10 hidden w-14 flex-col border-l bg-sidebar sm:flex"> {/* Changed left to right, border-r to border-l */}
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
        {/* Separator or secondary nav items can go here */}
         <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          {managementNavItems.map((item) => (
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
                <span className="sr-only">إعدادات المتجر</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="left">إعدادات المتجر</TooltipContent> {/* Changed side to left */}
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
}