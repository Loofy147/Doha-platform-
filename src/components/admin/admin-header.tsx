
'use client';

import Link from 'next/link';
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  ShoppingCart,
  Users2,
  Settings,
  Bell,
  LogOut,
  LayoutGrid,
  BarChart3
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
    { href: '/admin', icon: Home, label: 'Dashboard' },
    { href: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
    { href: '/admin/products', icon: Package, label: 'Products' },
    { href: '/admin/customers', icon: Users2, label: 'Customers' },
    { href: '/admin/sellers', icon: Package2, label: 'Sellers' }, // Using Package2 for Sellers as Store is used elsewhere or less common
    { href: '/admin/categories', icon: LayoutGrid, label: 'Categories' },
    { href: '/admin/reports', icon: BarChart3, label: 'Reports' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
];


export function AdminHeader() {
  const pathname = usePathname();

  const getBreadcrumbItems = () => {
    const pathParts = pathname.split('/').filter(part => part);
    let currentPath = '';
    const breadcrumbItems = pathParts.map((part, index) => {
      currentPath += `/${part}`;
      const isLast = index === pathParts.length - 1;
      const label = part.charAt(0).toUpperCase() + part.slice(1);
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
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs bg-sidebar">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/admin"
              className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
            >
              <WomenCommerceLogo className="h-10 w-auto" />
              <span className="sr-only">WomenCommerce Admin</span>
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
              <Link href="/admin" className="text-muted-foreground hover:text-primary">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {getBreadcrumbItems()}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
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
             <span className="sr-only">Notifications</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>New order #1234</DropdownMenuItem>
          <DropdownMenuItem>Seller application pending</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View all notifications</DropdownMenuItem>
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
              alt="Admin Avatar"
              data-ai-hint="admin avatar"
              className="overflow-hidden rounded-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
