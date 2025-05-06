'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from 'react';

const testimonials = [
  {
    name: 'أمينة ح.',
    avatar: 'https://picsum.photos/100/100?random=1',
    dataAiHint: 'woman smiling',
    initials: 'أح',
    text: "لمسة ضحى غيرت حياتي ومشروعي الصغير. الدعم والظهور الذي حصلت عليه لا يصدق!",
    rating: 5,
    type: 'بائعة مبدعة'
  },
  {
    name: 'ليلى ر.',
    avatar: 'https://picsum.photos/100/100?random=2',
    dataAiHint: 'woman happy',
    initials: 'لر',
    text: "أحب اكتشاف المنتجات اليدوية الفريدة على لمسة ضحى. إنه وجهتي المفضلة للهدايا ولدعم رائدات الأعمال.",
    rating: 5,
    type: 'زبونة راقية'
  },
  {
    name: 'فاطمة ك.',
    avatar: 'https://picsum.photos/100/100?random=3',
    dataAiHint: 'woman portrait',
    initials: 'فك',
    text: 'المنصة سهلة الاستخدام للغاية، والمجتمع رائع. أوصي بشدة بمنصة لمسة ضحى لأي امرأة تتطلع لبيع إبداعاتها.',
    rating: 4,
    type: 'بائعة طموحة'
  },
  {
    name: 'ياسمين ب.',
    avatar: 'https://picsum.photos/100/100?random=4',
    dataAiHint: 'woman shopping',
    initials: 'يب',
    text: 'وجدت أجمل المجوهرات المصنوعة يدويًا هنا على لمسة ضحى. الجودة مذهلة، وأحب أنني أدعم مشروعًا تملكه امرأة.',
    rating: 5,
    type: 'زبونة متميزة'
  },
];

export function TestimonialsSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            أصداء من مجتمع لمسة ضحى
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            استمعي إلى ما تقوله البائعات والزبونات عن تجربتهن الملهمة مع لمسة ضحى.
          </p>
        </div>

        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
            direction: "rtl", // Added for RTL layout
          }}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col shadow-lg rounded-lg overflow-hidden bg-card">
                    <CardContent className="p-6 flex flex-col flex-grow items-center text-center">
                      <Avatar className="w-20 h-20 mb-4 border-2 border-primary">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                        <AvatarFallback>{testimonial.initials}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-lg text-primary mb-1">{testimonial.name}</h3>
                      <p className="text-xs text-accent-purple font-medium mb-2">{testimonial.type}</p>
                      <div className="flex mb-3">
                        {Array(testimonial.rating).fill(0).map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-accent-yellow fill-accent-yellow" />
                        ))}
                        {Array(5 - testimonial.rating).fill(0).map((_, i) => (
                           <Star key={i + testimonial.rating} className="h-5 w-5 text-accent-yellow" />
                        ))}
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        "{testimonial.text}"
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex right-0 -translate-x-1/2 left-auto" /> {/* Adjusted for RTL */}
          <CarouselNext className="hidden sm:flex left-0 translate-x-1/2 right-auto" /> {/* Adjusted for RTL */}
        </Carousel>
      </div>
    </section>
  );
}
