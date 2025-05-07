import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Eye, ChevronRight, Users, CalendarDays, ShoppingBag, Store, Edit3, Flame, Award, Percent, CalendarClock, CalendarRange, Rocket, PenLine } from 'lucide-react';
import { HeroSection } from '@/components/sections/hero-section';
import { AboutUsSection } from '@/components/sections/about-us-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ContactSection } from '@/components/sections/contact-section';
import { DailyDealsSection } from '@/components/sections/daily-deals-section';
import { WeeklyDealsSection } from '@/components/sections/weekly-deals-section';
import { BestsellersSection } from '@/components/sections/bestsellers-section';
import { TopRatedStoresSection } from '@/components/sections/top-rated-stores-section';
import { CallToActionBanner } from '@/components/sections/call-to-action-banner';

const categories = [
  { name: 'أناقة وإكسسوارات', icon: ShoppingBag, href: '/products?category=fashion', dataAiHint: 'fashion accessories', color: 'text-accent-pink' },
  { name: 'حلويات ومأكولات شهية', icon: Sparkles, href: '/products?category=sweets', dataAiHint: 'sweets treats', color: 'text-accent-yellow' },
  { name: 'لمسات منزلية وديكور', icon: Store, href: '/products?category=home-decor', dataAiHint: 'home decor', color: 'text-accent-purple' },
  { name: 'تأجير إبداعات', icon: CalendarDays, href: '/products?category=rental', dataAiHint: 'rental items', color: 'text-green-500' },
  { name: 'خدمات احترافية', icon: Edit3, href: '/products?category=services', dataAiHint: 'professional services', color: 'text-blue-500' },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <CallToActionBanner
        title="انضمي إلى مبدعات لمسة ضحى!"
        description="هل لديكِ موهبة فريدة أو منتجات مميزة؟ حان الوقت لعرض إبداعاتكِ أمام العالم. افتحي متجركِ الخاص على منصتنا اليوم وابدئي رحلتكِ نحو النجاح والتمكين."
        buttonText="افتحي متجرك الآن"
        buttonLink="/sell-with-us"
        imageSrc="https://picsum.photos/seed/cta-seller/1200/400"
        dataAiHint="women entrepreneurs working"
        iconName="Rocket"
      />

      <DailyDealsSection />
      <WeeklyDealsSection />
      <BestsellersSection />
      <TopRatedStoresSection />

      {/* Categories Section - Restyled for more dynamism */}
      <section id="categories" className="py-16 lg:py-24 bg-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Users className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              تصفحي عالمنا الإبداعي
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              اكتشفي فئات متنوعة تلبي كل شغف واهتمام، من لمسات الأناقة إلى إبداعات المنزل والخدمات المميزة.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => {
              const CategoryIcon = category.icon; // Assign the component to a variable with a capitalized name
              return (
                <Link key={category.name} href={category.href} className="group block">
                  <div className="text-center p-6 bg-card rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col justify-center items-center border-2 border-transparent hover:border-primary">
                    <div className={`mb-4 group-hover:scale-110 transition-transform duration-300 ${category.color}`}>
                      <CategoryIcon size={28} className="mx-auto h-10 w-10" />
                    </div>
                    <h3 className="text-md font-semibold text-foreground group-hover:text-primary transition-colors">{category.name}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CallToActionBanner
        title="اكتشفي كنوز الإبداع المحلي!"
        description="تصفحي آلاف المنتجات والخدمات المقدمة من مبدعات موهوبات. كل قطعة تحكي قصة، وكل خدمة تقدم بلمسة شخصية. ادعمي المواهب المحلية واحصلي على ما هو فريد ومميز."
        buttonText="تسوقي الآن"
        buttonLink="/products"
        imageSrc="https://picsum.photos/seed/cta-shopper/1200/400"
        dataAiHint="happy woman shopping online"
        iconName="ShoppingBag"
        reverseLayout
      />
      
      <AboutUsSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
