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
  SheetClose // Import SheetClose
} from '@/components/ui/sheet';
import { Menu, ShoppingBag, Users, Info, MessageSquare, Store, Sparkles, HomeIcon, FileText, Gift, UserCircle, LogOutIcon, LayoutDashboard, ListOrdered } from 'lucide-react'; // Added ListOrdered
import { WomenCommerceLogo } from '@/components/icons/logo';
import { motion } from 'framer-motion';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

const navItems = [
  { label: 'الرئيسية', href: '/', icon: <HomeIcon size={16} /> },
  { label: 'المنتجات والخدمات', href: '/products', icon: <ShoppingBag size={16} /> },
  { label: 'انضمي كمبدعة', href: '/sell-with-us', icon: <Store size={16} /> },
  { label: 'باقات الاشتراك', href: '/subscriptions', icon: <Gift size={16} /> },
  { label: 'مدونة لمسة ضحى', href: '/blog', icon: <FileText size={16} /> },
  { label: 'عن لمسة ضحى', href: '/#about', icon: <Info size={16} /> },
  { label: 'تواصل معنا', href: '/#contact', icon: <MessageSquare size={16} /> },
];

const navItemVariants = {
  hover: { scale: 1.05, color: "hsl(var(--primary))" },
  tap: { scale: 0.95 }
};

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = true; // Simulate user being logged in
  const isSeller = true; // Simulate user being a seller

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="لمسة ضحى - الصفحة الرئيسية">
          <WomenCommerceLogo className="h-14 w-auto sm:h-16" />
        </Link>

        <nav className="hidden lg:flex gap-0.5 items-center">
          {navItems.map((item) => (
             <motion.div key={item.label} whileHover="hover" whileTap="tap" variants={navItemVariants}>
                 <Button variant="ghost" asChild>
                    <Link href={item.href} className="text-xs xl:text-sm font-medium text-foreground flex items-center px-2 py-2">
                        {item.icon && React.cloneElement(item.icon, { size: 14, className: "ml-1.5" })}
                        {item.label}
                    </Link>
                 </Button>
             </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              {isSeller && (
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="ghost" asChild className="hidden sm:inline-flex text-foreground hover:text-primary">
                    <Link href="/dashboard" className="flex items-center text-sm">
                      <LayoutDashboard size={18} className="ml-1.5 text-accent-purple" />
                      لوحة تحكم متجري
                    </Link>
                  </Button>
                </motion.div>
              )}
               <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="ghost" asChild className="hidden sm:inline-flex text-foreground hover:text-primary">
                    <Link href="/profile" className="flex items-center text-sm">
                      <UserCircle size={18} className="ml-1.5" />
                      حسابي
                    </Link>
                  </Button>
               </motion.div>
               <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" size="sm" className="hidden sm:inline-flex border-primary text-primary hover:bg-primary/10 text-sm" onClick={() => alert('تسجيل الخروج (محاكاة)')}>
                    <LogOutIcon size={16} className="ml-1.5" />
                    تسجيل الخروج
                  </Button>
               </motion.div>
            </>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex border-primary text-primary hover:bg-primary/10">
                  <Link href="/auth/login">تسجيل الدخول</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button size="sm" asChild className="hidden sm:inline-flex bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground">
                  <Link href="/auth/register">إنشاء حساب</Link>
                </Button>
              </motion.div>
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
                {/* Visually hidden title for accessibility */}
                <VisuallyHidden.Root asChild>
                  <SheetTitle>القائمة الرئيسية</SheetTitle>
                </VisuallyHidden.Root>
                <SheetHeader className="p-4 border-b">
                  {/* Use SheetClose around the link to close on navigation */}
                   <SheetClose asChild>
                     <Link href="/" className="flex items-center gap-2">
                       <WomenCommerceLogo className="h-12 w-auto" />
                     </Link>
                    </SheetClose>
                </SheetHeader>
                <div className="p-4 pt-2">
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <SheetClose key={item.label} asChild>
                         <Button
                           variant="ghost"
                           asChild
                           className="justify-start text-base py-2.5"
                         >
                          <Link href={item.href} className="flex items-center">
                            {item.icon && React.cloneElement(item.icon, { size: 18, className: "ml-2.5" })}
                            {item.label}
                          </Link>
                         </Button>
                      </SheetClose>
                    ))}
                     <hr className="my-3"/>
                     {isLoggedIn ? (
                       <>
                          {isSeller && (
                           <SheetClose asChild>
                            <Button variant="ghost" className="w-full justify-start text-base py-2.5" asChild>
                                <Link href="/dashboard" className="flex items-center">
                                  <LayoutDashboard size={18} className="ml-2.5 text-accent-purple" />
                                  لوحة تحكم متجري
                                </Link>
                            </Button>
                           </SheetClose>
                          )}
                         <SheetClose asChild>
                           <Button variant="ghost" className="w-full justify-start text-base py-2.5" asChild>
                             <Link href="/profile" className="flex items-center">
                                <UserCircle size={18} className="ml-2.5" />
                                حسابي
                             </Link>
                           </Button>
                         </SheetClose>
                          <SheetClose asChild>
                           <Button variant="ghost" className="w-full justify-start text-base py-2.5" asChild>
                             <Link href="/order" className="flex items-center"> {/* Added My Orders */}
                                <ListOrdered size={18} className="ml-2.5" />
                                طلباتي
                             </Link>
                           </Button>
                         </SheetClose>
                         <Button variant="outline" className="w-full justify-start text-base py-2.5 mt-4 border-primary text-primary hover:bg-primary/5" onClick={() => {alert('تسجيل الخروج (محاكاة)'); setIsMobileMenuOpen(false);}}>
                            <LogOutIcon size={18} className="ml-2.5" />
                            تسجيل الخروج
                         </Button>
                       </>
                     ) : (
                       <>
                         <SheetClose asChild>
                           <Button variant="outline" className="w-full justify-start text-base py-2.5" asChild>
                             <Link href="/auth/login">تسجيل الدخول</Link>
                           </Button>
                         </SheetClose>
                         <SheetClose asChild>
                           <Button className="w-full justify-start text-base py-2.5 bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground" asChild>
                             <Link href="/auth/register">إنشاء حساب</Link>
                           </Button>
                         </SheetClose>
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
