import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-20 md:py-32">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://picsum.photos/1600/900"
          alt="Delicious baked goods background"
          layout="fill"
          objectFit="cover"
          data-ai-hint="warm bakery"
          priority
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
          Welcome to <span className="text-accent">Hamid Merdj</span> Bakery
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/80 sm:text-xl">
          Discover the authentic taste of traditional baking. Freshly made bread, pastries, and cakes, crafted with passion and the finest ingredients.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform">
            <Link href="#products">
              Explore Our Delights <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="shadow-md transform hover:scale-105 transition-transform">
            <Link href="#contact">
              Visit Us Today
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
