// src/components/sections/top-rated-stores-section.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Award, Star, Eye, ChevronLeft } from 'lucide-react';

const mockTopRatedStores = [
  {
    id: 'top-store-1',
    name: 'مجوهرات أصالة',
    avatarSrc: 'https://picsum.photos/seed/asala-avatar/80/80',
    dataAiHint: 'woman jeweler smiling',
    specialty: 'مجوهرات فضية وأحجار كريمة',
    profileLink: '/store/asala-jewelry', // Ensure this matches a mockStoreDetails id if navigation is implemented
    rating: 4.9,
    reviewCount: 215,
    bannerImage: 'https://picsum.photos/seed/asala-banner/400/150',
    dataAiHintBanner: 'silver jewelry display',
  },
  {
    id: 'top-store-2',
    name: 'مخبز الأحلام',
    avatarSrc: 'https://picsum.photos/seed/ahlam-avatar/80/80',
    dataAiHint: 'woman baker cakes',
    specialty: 'كيك وحلويات المناسبات',
    profileLink: '/store/mathaq-albayt', // Example store, ensure consistency
    rating: 4.8,
    reviewCount: 180,
    bannerImage: 'https://picsum.photos/seed/ahlam-banner/400/150',
    dataAiHintBanner: 'wedding cake display',
  },
  {
    id: 'top-store-3',
    name: 'خزانة الأناقة',
    avatarSrc: 'https://picsum.photos/seed/elegance-avatar/80/80',
    dataAiHint: 'fashion designer dresses',
    specialty: 'تأجير فساتين سهرة وعبايات',
    profileLink: '/store/anaqa-lilijar', // Example store
    rating: 4.7,
    reviewCount: 150,
    bannerImage: 'https://picsum.photos/seed/elegance-banner/400/150',
    dataAiHintBanner: 'evening gowns rack',
  },
  {
    id: 'top-store-4',
    name: 'ريشة فنانة مبدعة',
    avatarSrc: 'https://picsum.photos/seed/artist-avatar/80/80',
    dataAiHint: 'woman artist painting',
    specialty: 'لوحات فنية وديكورات جدارية',
    profileLink: '/store/lamsa-ibdaa', // Example store
    rating: 4.8,
    reviewCount: 130,
    bannerImage: 'https://picsum.photos/seed/artist-banner/400/150',
    dataAiHintBanner: 'art studio paintings',
  },
];

export function TopRatedStoresSection() {
  return (
    <section id="top-stores" className="py-16 lg:py-24 bg-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Award className="mx-auto h-12 w-12 text-accent-yellow animate-bounce" />
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            مبدعاتنا المتألقات
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            تعرفي على المتاجر التي حازت على أعلى التقييمات بفضل جودة منتجاتها وخدماتها الاستثنائية.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {mockTopRatedStores.map((store) => (
            <Card key={store.id} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl group flex flex-col border border-transparent hover:border-accent-yellow">
              <div className="relative h-32 sm:h-40">
                <Image src={store.bannerImage} alt={`${store.name} banner`} fill className="object-cover rounded-t-xl group-hover:opacity-80 transition-opacity" data-ai-hint={store.dataAiHintBanner}/>
                <Avatar className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 border-4 border-background bg-background shadow-lg">
                  <AvatarImage src={store.avatarSrc} alt={store.name} data-ai-hint={store.dataAiHint} />
                  <AvatarFallback className="text-2xl bg-primary/20 text-primary">{store.name.substring(0, 1)}</AvatarFallback>
                </Avatar>
              </div>
              <CardContent className="p-4 pt-12 sm:pt-14 text-center flex-grow flex flex-col">
                <h3 className="text-lg font-semibold text-primary mb-1 group-hover:text-accent-pink transition-colors">
                  <Link href={store.profileLink}>{store.name}</Link>
                </h3>
                <p className="text-xs text-accent-purple font-medium mb-2">{store.specialty}</p>
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-3 mt-auto">
                  <Star className="h-4 w-4 text-accent-yellow fill-accent-yellow" />
                  <span>{store.rating.toFixed(1)}</span>
                  <span>({store.reviewCount} تقييم)</span>
                </div>
              </CardContent>
              <CardFooter className="p-3 border-t">
                <Button asChild variant="outline" className="w-full border-accent-yellow text-accent-yellow hover:bg-accent-yellow hover:text-accent-yellow-foreground transition-colors group/button">
                  <Link href={store.profileLink}>
                    <Eye className="ml-2 h-4 w-4 group-hover/button:text-accent-yellow-foreground" /> زيارة المتجر
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
         <div className="mt-12 text-center">
          <Button size="lg" variant="default" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 group">
            <Link href="/stores"> {/* Assuming a /stores page will list all stores */}
              تصفحي كل المتاجر المبدعة <ChevronLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
