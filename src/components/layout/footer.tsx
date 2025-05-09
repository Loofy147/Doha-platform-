// src/components/layout/footer.tsx
import React from 'react'; // Added React import
import Link from 'next/link';
import { Mail, Info, Users, Store, MessageSquare, Send, BookOpen, Gift, PackageSearch } from 'lucide-react';
import { WomenCommerceLogo } from '@/components/icons/logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-secondary/10 text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <WomenCommerceLogo className="h-14 w-auto" />
            </Link>
            <p className="text-sm text-foreground/80 leading-relaxed">
              لمسة ضحى: منصة شاملة تمكّن رائدات الأعمال من البيع، التأجير، وعرض مواهبهن.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">اكتشفي</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-primary transition-colors flex items-center gap-1"><PackageSearch size={16} /> المنتجات والخدمات</Link></li>
              <li><Link href="/#categories" className="hover:text-primary transition-colors">تسوقي حسب الفئة</Link></li>
              <li><Link href="/#top-stores" className="hover:text-primary transition-colors">متاجر مبدعاتنا</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors flex items-center gap-1"><BookOpen size={16} /> مدونتنا</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">انضمي إلينا</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/sell-with-us" className="hover:text-primary transition-colors flex items-center gap-1"><Store size={16} /> بيعي على لمسة ضحى</Link></li>
              <li><Link href="/subscriptions" className="hover:text-primary transition-colors flex items-center gap-1"><Gift size={16} /> باقات الاشتراك</Link></li>
              <li><Link href="/#about" className="hover:text-primary transition-colors flex items-center gap-1"><Users size={16} /> مجتمعنا</Link></li>
              <li><Link href="/#contact" className="hover:text-primary transition-colors flex items-center gap-1"><MessageSquare size={16} /> تواصل مع الدعم</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">ابقي على تواصل</h3>
            <p className="text-sm mb-3 text-foreground/80">
              احصلي على تحديثات حول المنتجات الجديدة، البائعات المميزات، والعروض الخاصة.
            </p>
            <form className="flex gap-2">
              <Input type="email" placeholder="أدخلي بريدك الإلكتروني" className="bg-background placeholder:text-muted-foreground" />
              <Button type="submit" variant="default" size="icon" className="bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground flex-shrink-0">
                <Send size={18} />
                <span className="sr-only">اشتراك</span>
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">
              للاستفسارات العامة: <a href="mailto:info@lamsadoha.com" className="hover:text-primary underline">info@lamsadoha.com</a>
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-foreground/70">
          <p>&copy; {currentYear} لمسة ضحى. جميع الحقوق محفوظة. إبداع يلامس حياتك.</p>
        </div>
      </div>
    </footer>
  );
}
