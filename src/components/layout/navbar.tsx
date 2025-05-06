
'use client';

import * as React from 'react'; // Added React import
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShoppingBag, CalendarPlus } from 'lucide-react';
import { HamidMerdjLogo } from '@/components/icons/logo';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Our Products', href: '/#products' },
  { label: 'About Us', href: '/#about' },
  { label: 'Order Online', href: '/order', icon: <ShoppingBag size={16} className="mr-2" /> },
  { label: 'Subscriptions', href: '/subscriptions', icon: <CalendarPlus size={16} className="mr-2" /> },
  { label: 'Contact', href: '/#contact' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Hamid Merdj Bakery Home">
          <HamidMerdjLogo className="h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex gap-1 items-center">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild>
              <Link href={item.href} className="text-sm font-medium text-foreground hover:text-primary flex items-center">
                {item.icon}
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
              <div className="p-6">
                <Link href="/" className="mb-6 flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                   <HamidMerdjLogo className="h-10 w-auto" />
                </Link>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Button
                      key={item.label}
                      variant="ghost"
                      asChild
                      className="justify-start text-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link href={item.href} className="flex items-center">
                        {item.icon && React.cloneElement(item.icon, { size: 20, className: "mr-3" })}
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

