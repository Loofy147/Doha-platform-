import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-50 py-20 md:py-32">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://picsum.photos/1600/900?random=10"
          alt="Artisan crafts background"
          layout="fill"
          objectFit="cover"
          data-ai-hint="artisan crafts"
          priority
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
          Welcome to <span className="text-accent-pink">AlNisaa</span>Market
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/80 sm:text-xl">
          Discover unique products handcrafted by talented women entrepreneurs. Support local artisans and find something special.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" asChild className="bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground shadow-lg transform hover:scale-105 transition-transform">
            <Link href="/products">
              <ShoppingBag className="mr-2 h-5 w-5" /> Explore Products
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="shadow-md transform hover:scale-105 transition-transform border-primary text-primary hover:bg-primary/10">
            <Link href="/sell-with-us">
              <Sparkles className="mr-2 h-5 w-5" /> Sell Your Creations
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

      