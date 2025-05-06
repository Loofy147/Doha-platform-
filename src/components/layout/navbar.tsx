'use client';

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShoppingBag, Users, Info, MessageSquare, Store, Sparkles, HomeIcon } from 'lucide-react';
import { AlNisaaMarketLogo } from '@/components/icons/logo'; // Updated logo

const navItems = [
  { label: 'Home', href: '/', icon: <HomeIcon size={16} className="mr-2" /> },
  { label: 'Products', href: '/products', icon: <ShoppingBag size={16} className="mr-2" /> },
  { label: 'Sell with Us', href: '/sell-with-us', icon: <Store size={16} className="mr-2" /> },
  { label: 'Community', href: '/#community', icon: <Users size={16} className="mr-2" /> },
  { label: 'About Us', href: '/#about', icon: <Info size={16} className="mr-2" /> },
  { label: 'Contact', href: '/#contact', icon: <MessageSquare size={16} className="mr-2" /> },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8"> {/* Increased height for larger logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="AlNisaaMarket Home">
          <AlNisaaMarketLogo className="h-12 w-auto sm:h-14" /> {/* Adjusted logo size */}
        </Link>

        <nav className="hidden md:flex gap-1 items-center">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild>
              <Link href={item.href} className="text-sm font-medium text-foreground hover:text-primary flex items-center px-3 py-2">
                {item.icon}
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex border-primary text-primary hover:bg-primary/10">
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button size="sm" asChild className="hidden sm:inline-flex bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground">
            <Link href="/auth/register">Sign Up</Link>
          </Button>
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
                     <AlNisaaMarketLogo className="h-12 w-auto" />
                  </Link>
                  <nav className="flex flex-col gap-3">
                    {navItems.map((item) => (
                      <Button
                        key={item.label}
                        variant="ghost"
                        asChild
                        className="justify-start text-lg py-3"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link href={item.href} className="flex items-center">
                          {item.icon && React.cloneElement(item.icon, { size: 20, className: "mr-3" })}
                          {item.label}
                        </Link>
                      </Button>
                    ))}
                     <hr className="my-4"/>
                     <Button variant="outline" className="w-full justify-start text-lg py-3" asChild onClick={() => setIsMobileMenuOpen(false)}>
                       <Link href="/auth/login">Login</Link>
                     </Button>
                     <Button className="w-full justify-start text-lg py-3 bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground" asChild onClick={() => setIsMobileMenuOpen(false)}>
                       <Link href="/auth/register">Sign Up</Link>
                     </Button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}