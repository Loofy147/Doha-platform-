import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle, CardFooter, CardHeader } from '@/components/ui/card';
import { Sparkles, Eye, ChevronRight, Users, CalendarDays, ShoppingBag, Store, Edit3 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { HeroSection } from '@/components/sections/hero-section';
import { AboutUsSection } from '@/components/sections/about-us-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ContactSection } from '@/components/sections/contact-section';


const featuredProducts = [
  {
    id: 'featProd1',
    name: 'مجموعة مجوهرات فضية مصنوعة يدوياً',
    seller: 'إبداعات نادية',
    imageSrc: 'https://picsum.photos/400/300?random=1',
    dataAiHint: 'silver jewelry handmade',
    price: '4,500 دج',
    category: 'أناقة وإكسسوارات',
  },
  {
    id: 'featProd2',
    name: 'كيكة الشوكولاتة الفاخرة للمناسبات',
    seller: 'حلويات سارة',
    imageSrc: 'https://picsum.photos/400/300?random=2',
    dataAiHint: 'chocolate cake fancy',
    price: 'حسب الطلب',
    category: 'حلويات ومأكولات شهية',
  },
  {
    id: 'featProd3',
    name: 'فستان سهرة أنيق (للإيجار)',
    seller: 'بوتيك الأحلام',
    imageSrc: 'https://picsum.photos/400/300?random=3',
    dataAiHint: 'evening dress rental',
    price: '6,000 دج / لليلة',
    category: 'تأجير إبداعات',
  },
];

const categories = [
  { name: 'أناقة وإكسسوارات', icon: <ShoppingBag size={28} className="text-accent-pink" />, href: '/products?category=fashion', dataAiHint: 'fashion accessories' },
  { name: 'حلويات ومأكولات شهية', icon: <Sparkles size={28} className="text-accent-yellow" />, href: '/products?category=sweets', dataAiHint: 'sweets treats' },
  { name: 'لمسات منزلية وديكور', icon: <Store size={28} className="text-accent-purple" />, href: '/products?category=home', dataAiHint: 'home decor' },
  { name: 'تأجير إبداعات', icon: <CalendarDays size={28} className="text-green-500" />, href: '/products?category=rental', dataAiHint: 'rental items' },
  { name: 'خدمات احترافية', icon: <Edit3 size={28} className="text-blue-500" />, href: '/products?category=services', dataAiHint: 'professional services' },
];

const featuredSellers = [
  {
    id: 'seller1',
    name: 'لمسة إبداع',
    avatarSrc: 'https://picsum.photos/80/80?random=4',
    dataAiHint: 'woman artist',
    specialty: 'مشغولات يدوية فنية',
    profileLink: '/store/lamsa-ibdaa',
  },
  {
    id: 'seller2',
    name: 'مذاق البيت',
    avatarSrc: 'https://picsum.photos/80/80?random=5',
    dataAiHint: 'woman cooking',
    specialty: 'حلويات ومأكولات منزلية',
    profileLink: '/store/mathaq-albayt',
  },
  {
    id: 'seller3',
    name: 'أناقة للإيجار',
    avatarSrc: 'https://picsum.photos/80/80?random=6',
    dataAiHint: 'woman fashion',
    specialty: 'تأجير فساتين سهرة',
    profileLink: '/store/anaqa-lilijar',
  },
];


export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Featured Products Section */}
      <section id="featured-products" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Sparkles className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              إبداعات مميزة تلامس ذوقكِ
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              اكتشفي أحدث المنتجات والخدمات التي أضافتها مبدعات لمسة ضحى.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="aspect-video relative">
                    <Image 
                      src={product.imageSrc} 
                      alt={product.name} 
                      fill 
                      className="object-cover"
                      data-ai-hint={product.dataAiHint}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                  <CardTitle className="text-xl font-semibold text-primary mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-sm text-foreground/70 mb-3">من إبداع: {product.seller}</CardDescription>
                  <p className="text-lg font-bold text-accent-pink">{product.price}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link href={`/products/${product.id}`}>
                      <Eye className="mr-2 h-4 w-4" /> عرض التفاصيل
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild className="border-accent-yellow text-accent-yellow hover:bg-accent-yellow/10">
              <Link href="/products">
                تصفحي كل اللمسات الإبداعية <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 lg:py-24 bg-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Users className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              تسوقي حسب اهتماماتكِ
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              تصفحي مجموعتنا المتنوعة من الفئات لتجدي ما يلامس شغفك.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link key={category.name} href={category.href} className="group">
                <Card className="text-center p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col justify-center items-center bg-card">
                  <div className="mb-3 text-primary group-hover:text-accent-pink transition-colors">
                     {React.cloneElement(category.icon, { 
                       className: `mx-auto h-10 w-10 ${category.icon.props.className} group-hover:scale-110 transition-transform`
                     })}
                  </div>
                  <h3 className="text-md font-semibold text-foreground group-hover:text-primary transition-colors">{category.name}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Sellers Section */}
       <section id="featured-sellers" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Store className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              مبدعات مميزات على لمسة ضحى
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              تعرفي على بعض المبدعات الملهمات في مجتمعنا واكتشفي متاجرهن الفريدة.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSellers.map((seller) => (
              <Card key={seller.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                   <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary shadow-md">
                    <AvatarImage src={seller.avatarSrc} alt={seller.name} data-ai-hint={seller.dataAiHint}/>
                    <AvatarFallback>{seller.name.substring(0,1)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-xl font-semibold text-primary mb-1">{seller.name}</CardTitle>
                  <p className="text-sm text-accent-purple font-medium mb-3">{seller.specialty}</p>
                  <Button asChild variant="outline" size="sm" className="border-accent-pink text-accent-pink hover:bg-accent-pink/10">
                    <Link href={seller.profileLink}>
                      <Eye className="mr-2 h-4 w-4" /> زيارة المتجر
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <AboutUsSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
