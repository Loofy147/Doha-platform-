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
import * as React from 'react';


const testimonials = [
  {
    name: 'Fatima Z.',
    avatar: 'https://picsum.photos/100/100?random=10',
    dataAiHint: 'woman portrait',
    initials: 'FZ',
    text: "The Khobz Dar from Hamid Merdj Bakery is just like my grandmother used to make! So soft and delicious, it's a taste of home.",
    rating: 5,
  },
  {
    name: 'Ahmed K.',
    avatar: 'https://picsum.photos/100/100?random=11',
    dataAiHint: 'man portrait',
    initials: 'AK',
    text: "I order their Msemmen every weekend. It's the perfect breakfast treat. The quality is consistently excellent.",
    rating: 5,
  },
  {
    name: 'Sarah B.',
    avatar: 'https://picsum.photos/100/100?random=12',
    dataAiHint: 'woman smiling',
    initials: 'SB',
    text: 'Their baklava is to die for! Not too sweet, perfectly crispy. Best I have had in Algiers.',
    rating: 4,
  },
  {
    name: 'Youssef M.',
    avatar: 'https://picsum.photos/100/100?random=13',
    dataAiHint: 'man happy',
    initials: 'YM',
    text: 'A true gem in the city. The aroma of fresh bread when you walk in is incredible. Highly recommend!',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Hear from those who love our traditional bakes.
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
                      <div className="flex mb-3">
                        {Array(testimonial.rating).fill(0).map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ))}
                        {Array(5 - testimonial.rating).fill(0).map((_, i) => (
                           <Star key={i + testimonial.rating} className="h-5 w-5 text-yellow-400" />
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
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
