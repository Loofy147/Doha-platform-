// src/components/layout/navbar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, ShoppingBag, Users, Info, MessageSquare, Store, Sparkles, HomeIcon, FileText, Gift, UserCircle, LogOutIcon } from 'lucide-react';
import { WomenCommerceLogo } from '@/components/icons/logo'; 

const navItems = [
  { label: 'الرئيسية', href: '/', icon: <HomeIcon size={16} /> },
  { label: 'المنتجات والخدمات', href: '/products', icon: <ShoppingBag size={16} /> },
  { label: 'بيعي معنا', href: '/sell-with-us', icon: <Store size={16} /> },
  { label: 'المجتمع', href: '/#community', icon: <Users size={16} /> },
  { label: 'الاشتراكات', href: '/subscriptions', icon: <Gift size={16} /> },
  { label: 'المدونة', href: '/blog', icon: <FileText size={16} /> },
  { label: 'عنا', href: '/#about', icon: <Info size={16} /> },
  { label: 'اتصلي بنا', href: '/#contact', icon: <MessageSquare size={16} /> },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = true; // Simulate user being logged in

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="لمسة ضحى - الصفحة الرئيسية">
          <WomenCommerceLogo className="h-14 w-auto sm:h-16" />
        </Link>

        <nav className="hidden lg:flex gap-0.5 items-center">
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" asChild>
              <Link href={item.href} className="text-xs xl:text-sm font-medium text-foreground hover:text-primary flex items-center px-2 py-2">
                {item.icon && React.cloneElement(item.icon, { size: 14, className: "ml-1.5" })}
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" asChild className="hidden sm:inline-flex text-foreground hover:text-primary">
                <Link href="/profile" className="flex items-center">
                  <UserCircle size={18} className="ml-1.5" />
                  حسابي
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="hidden sm:inline-flex border-primary text-primary hover:bg-primary/10" onClick={() => alert('تسجيل الخروج (محاكاة)')}>
                <LogOutIcon size={16} className="ml-1.5" />
                تسجيل الخروج
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex border-primary text-primary hover:bg-primary/10">
                <Link href="/auth/login">تسجيل الدخول</Link>
              </Button>
              <Button size="sm" asChild className="hidden sm:inline-flex bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground">
                <Link href="/auth/register">إنشاء حساب</Link>
              </Button>
            </>
          )}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">فتح القائمة</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[320px] bg-background">
                <SheetHeader>
                  <SheetTitle>
                     <Link href="/" className="mb-6 flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                       <WomenCommerceLogo className="h-12 w-auto" />
                     </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="p-6 pt-2">
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <Button
                        key={item.label}
                        variant="ghost"
                        asChild
                        className="justify-start text-base py-2.5"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link href={item.href} className="flex items-center">
                          {item.icon && React.cloneElement(item.icon, { size: 18, className: "ml-2.5" })}
                          {item.label}
                        </Link>
                      </Button>
                    ))}
                     <hr className="my-3"/>
                     {isLoggedIn ? (
                       <>
                          <Button variant="ghost" className="w-full justify-start text-base py-2.5" asChild onClick={() => setIsMobileMenuOpen(false)}>
                           <Link href="/profile" className="flex items-center">
                              <UserCircle size={18} className="ml-2.5" />
                              حسابي
                           </Link>
                         </Button>
                         <Button variant="outline" className="w-full justify-start text-base py-2.5" onClick={() => {alert('تسجيل الخروج (محاكاة)'); setIsMobileMenuOpen(false);}}>
                            <LogOutIcon size={18} className="ml-2.5" />
                            تسجيل الخروج
                         </Button>
                       </>
                     ) : (
                       <>
                        <Button variant="outline" className="w-full justify-start text-base py-2.5" asChild onClick={() => setIsMobileMenuOpen(false)}>
                          <Link href="/auth/login">تسجيل الدخول</Link>
                        </Button>
                        <Button className="w-full justify-start text-base py-2.5 bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground" asChild onClick={() => setIsMobileMenuOpen(false)}>
                          <Link href="/auth/register">إنشاء حساب</Link>
                        </Button>
                       </>
                     )}
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