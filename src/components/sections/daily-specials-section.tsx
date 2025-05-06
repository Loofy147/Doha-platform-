'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Info } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { StaticImageData } from 'next/image';

// Placeholder images - Removed local imports

interface DailySpecial {
  id: string;
  name: string;
  description: string;
  imageSrc: string; // Changed to string for URL
  dataAiHint: string;
  day: string; // e.g., "Monday's Special", "Weekend Treat"
}

const allSpecials: DailySpecial[] = [
  {
    id: 'special-1',
    name: 'Brioche Feuilletée Praliné',
    description: 'A delicate, flaky brioche with a rich praline filling. Limited quantities!',
    imageSrc: 'https://picsum.photos/800/450',
    dataAiHint: 'brioche praline',
    day: "Today's Feature"
  },
  {
    id: 'special-2',
    name: 'Gateau Sec aux Amandes',
    description: 'Traditional Algerian almond cake, perfect with tea or coffee. A customer favorite!',
    imageSrc: 'https://picsum.photos/800/450',
    dataAiHint: 'almond cake',
    day: "Baker's Choice"
  },
  {
    id: 'special-3',
    name: 'Sables Diamant Vanille',
    description: 'Buttery vanilla shortbread cookies coated with sparkling sugar. Simply irresistible.',
    imageSrc: 'https://picsum.photos/800/450',
    dataAiHint: 'vanilla cookies',
    day: "Sweet Treat"
  },
];

export function DailySpecialsSection() {
  const [currentSpecials, setCurrentSpecials] = useState<DailySpecial[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // In a real app, you might fetch daily specials from an API based on the current day
    // For this demo, we'll just show a rotating selection or a fixed set.
    // Let's pick the first 3 for simplicity or implement a rotation.
    setCurrentSpecials(allSpecials.slice(0, 3)); 
  }, []);

  if (!isClient) {
    // Render a loading state or null on the server to avoid hydration mismatch
    return (
      <section id="daily-specials" className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Fresh From The Oven: Today's Specials
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              Discover unique treats available for a limited time.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={`skeleton-special-${index}`} className="overflow-hidden shadow-lg rounded-lg flex flex-col">
                <div className="aspect-w-16 aspect-h-9 bg-muted animate-pulse"></div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="h-6 bg-muted animate-pulse mb-2 w-3/4"></div>
                  <div className="h-4 bg-muted animate-pulse w-full mb-1"></div>
                  <div className="h-4 bg-muted animate-pulse w-5/6"></div>
                </CardContent>
                <CardFooter className="p-4 mt-auto">
                  <div className="h-10 bg-muted animate-pulse w-full rounded-md"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (currentSpecials.length === 0) {
    return null; // Or a message saying "No specials today, check back tomorrow!"
  }

  return (
    <section id="daily-specials" className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Fresh From The Oven: Today's Specials
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Discover unique treats available for a limited time. Don't miss out!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentSpecials.map((special) => (
            <Card key={special.id} className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg flex flex-col bg-card">
              <CardHeader className="p-0 relative">
                <div className="aspect-w-16 aspect-h-9">
                  <Image
                    src={special.imageSrc}
                    alt={special.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    data-ai-hint={special.dataAiHint}
                    
                  />
                </div>
                <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                  {special.day}
                </div>
              </CardHeader>
              <CardContent className="p-6 flex flex-col flex-grow">
                <CardTitle className="text-xl font-semibold text-primary mb-2 flex items-center gap-2">
                  <Star size={20} className="text-yellow-400 fill-yellow-400" /> {special.name}
                </CardTitle>
                <CardDescription className="text-sm text-foreground/70 flex-grow">
                  {special.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4 mt-auto">
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/order">
                    <Info size={18} className="mr-2" /> Find it in Our Order Section
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
