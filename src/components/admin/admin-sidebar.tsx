
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
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
  Store,
  LayoutGrid,
  BarChart3
} from 'lucide-react';
import { WomenCommerceLogo } from '@/components/icons/logo';

const adminNavItems = [
    { href: '/admin', icon: Home, label: 'Dashboard' },
    { href: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
    { href: '/admin/products', icon: Package, label: 'Products' },
    { href: '/admin/customers', icon: Users2, label: 'Customers' },
    { href: '/admin/sellers', icon: Store, label: 'Sellers' },
    { href: '/admin/categories', icon: LayoutGrid, label: 'Categories' },
    { href: '/admin/reports', icon: BarChart3, label: 'Reports' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-sidebar sm:flex">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/admin"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <WomenCommerceLogo className="h-8 w-auto transition-all group-hover:scale-110" />
            <span className="sr-only">WomenCommerce Admin</span>
          </Link>
          {adminNavItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8
                    ${pathname.startsWith(item.href) && item.href !== '/admin' || (pathname === '/admin' && item.href === '/admin')
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground hover:text-sidebar-accent-foreground' 
                      : 'text-sidebar-muted-foreground hover:text-sidebar-foreground'
                    }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/settings"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8
                  ${pathname.startsWith('/admin/settings') 
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground hover:text-sidebar-accent-foreground' 
                    : 'text-sidebar-muted-foreground hover:text-sidebar-foreground'
                  }`}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </TooltipProvider>
    </aside>
  );
}
