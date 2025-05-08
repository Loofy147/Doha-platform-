// src/components/sections/testimonials-section.tsx
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
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'أمينة ح.',
    avatar: 'https://picsum.photos/100/100?random=1',
    dataAiHint: 'woman smiling',
    initials: 'أح',
    text: "لمسة ضحى غيرت حياتي ومشروعي الصغير. الدعم والظهور الذي حصلت عليه لا يصدق! المنصة سهلة والتواصل مع الزبائن ممتع.",
    rating: 5,
    type: 'بائعة مبدعة'
  },
  {
    name: 'ليلى ر.',
    avatar: 'https://picsum.photos/100/100?random=2',
    dataAiHint: 'woman happy',
    initials: 'لر',
    text: "أحب اكتشاف المنتجات اليدوية الفريدة على لمسة ضحى. إنه وجهتي المفضلة للهدايا ولدعم رائدات الأعمال المحليّات.",
    rating: 5,
    type: 'زبونة راقية'
  },
  {
    name: 'فاطمة ك.',
    avatar: 'https://picsum.photos/100/100?random=3',
    dataAiHint: 'woman portrait',
    initials: 'فك',
    text: 'المنصة سهلة الاستخدام للغاية، والمجتمع رائع وداعم. أوصي بشدة بمنصة لمسة ضحى لأي امرأة تتطلع لبيع إبداعاتها عبر الإنترنت.',
    rating: 4,
    type: 'بائعة طموحة'
  },
  {
    name: 'ياسمين ب.',
    avatar: 'https://picsum.photos/100/100?random=4',
    dataAiHint: 'woman shopping',
    initials: 'يب',
    text: 'وجدت أجمل المجوهرات المصنوعة يدويًا هنا على لمسة ضحى. الجودة مذهلة، وأحب أنني أدعم مشروعًا تملكه امرأة موهوبة.',
    rating: 5,
    type: 'زبونة متميزة'
  },
   {
    name: 'سعاد ن.',
    avatar: 'https://picsum.photos/100/100?random=5',
    dataAiHint: 'woman professional',
    initials: 'سن',
    text: 'كصاحبة خدمة استشارات، ساعدتني لمسة ضحى في الوصول إلى عميلات جديدات وتوسيع نطاق عملي بشكل لم أكن أتوقعه.',
    rating: 5,
    type: 'مقدمة خدمة'
  },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};


export function TestimonialsSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <motion.section
      id="testimonials"
      className="py-16 lg:py-24 bg-secondary/20 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} // Trigger animation when 10% is visible
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
            className="text-center mb-12"
            variants={cardVariants} // Use card variant for header block
        >
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            أصداء من مجتمع لمسة ضحى
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            استمعي إلى ما تقوله البائعات والزبونات عن تجربتهن الملهمة مع لمسة ضحى.
          </p>
        </motion.div>

        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: "start",
            loop: true,
            direction: "rtl",
          }}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                {/* Apply motion to the div containing the Card */}
                <motion.div
                  className="p-1 h-full"
                  variants={cardVariants}
                  // initial="hidden" // Already handled by parent stagger
                  // whileInView="visible" // Already handled by parent stagger
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Card className="h-full flex flex-col shadow-lg rounded-lg overflow-hidden bg-card hover:shadow-xl transition-shadow border border-border/30">
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
                           <Star key={i + testimonial.rating} className="h-5 w-5 text-accent-yellow/50" /> // Dimmed empty stars
                        ))}
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed flex-grow">
                        "{testimonial.text}"
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex right-0 -translate-x-1/2 left-auto bg-card/70 hover:bg-card border-primary/50 text-primary" />
          <CarouselNext className="hidden sm:flex left-0 translate-x-1/2 right-auto bg-card/70 hover:bg-card border-primary/50 text-primary" />
        </Carousel>
      </div>
    </motion.section>
  );
}
