'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle, CardFooter, CardHeader } from '@/components/ui/card';
import { Sparkles, Eye, ChevronRight, Users, CalendarDays } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-50 py-20 md:py-32">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://picsum.photos/1600/900?random=1"
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
                Explore Products
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-md transform hover:scale-105 transition-transform border-primary text-primary hover:bg-primary/10">
              <Link href="/sell-with-us">
                Sell Your Creations
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Sparkles className="mx-auto h-12 w-12 text-accent mb-4" />
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              Explore a curated selection of our most popular and unique items.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Example Product Cards */}
            <Card>
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <Image
                  src="https://picsum.photos/400/400?random=1"
                  alt="Handmade jewelry"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                  data-ai-hint="woman shopping"
                />
              </div>
              <CardContent>
                <CardTitle>Handmade Jewelry</CardTitle>
                <CardDescription>Elegant pieces by Sarah K.</CardDescription>
                <p className="font-semibold mt-2 text-primary">DA 2,500</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Eye className="mr-2" />
                  View Details
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <Image
                  src="https://picsum.photos/400/400?random=2"
                  alt="Artisan soap"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                  data-ai-hint="artisan soap"
                />
              </div>
              <CardContent>
                <CardTitle>Organic Soaps</CardTitle>
                <CardDescription>Natural soaps by Fatima B.</CardDescription>
                <p className="font-semibold mt-2 text-primary">DA 800</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Eye className="mr-2" />
                  View Details
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <Image
                  src="https://picsum.photos/400/400?random=3"
                  alt="Embroidered cushion"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                  data-ai-hint="embroidered cushion"
                />
              </div>
              <CardContent>
                <CardTitle>Embroidered Cushions</CardTitle>
                <CardDescription>Home decor by Aisha L.</CardDescription>
                <p className="font-semibold mt-2 text-primary">DA 3,000</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Eye className="mr-2" />
                  View Details
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <Image
                  src="https://picsum.photos/400/400?random=4"
                  alt="Custom calligraphy"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                  data-ai-hint="calligraphy art"
                />
              </div>
              <CardContent>
                <CardTitle>Custom Calligraphy</CardTitle>
                <CardDescription>Personalized art by Nora M.</CardDescription>
                <p className="font-semibold mt-2 text-primary">DA 1,500</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Eye className="mr-2" />
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action for Sellers */}
      <section className="py-16 lg:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="mx-auto h-12 w-12 text-accent mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Share Your Talent with the World
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Are you a talented woman entrepreneur? Join AlNisaaMarket and showcase your products to a supportive community. We provide the tools and platform to help you grow.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform">
              <Link href="/sell-with-us">
                Become a Seller <ChevronRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Community Spotlight */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Users className="mx-auto h-12 w-12 text-accent mb-4" />
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Our Vibrant Community
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              Meet some of the inspiring women who make AlNisaaMarket special.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example community member cards */}
            <Card>
              <CardHeader className="items-center">
                <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
                  <AvatarImage src="https://picsum.photos/200/200?random=5" alt="Sarah K." data-ai-hint="woman portrait"/>
                  <AvatarFallback>SK</AvatarFallback>
                </Avatar>
                <CardTitle>Sarah K.</CardTitle>
                <CardDescription>Jewelry Designer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-center text-foreground/70">
                  "AlNisaaMarket has given me the platform to share my passion for jewelry with a wider audience. The support from the community is amazing!"
                </p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="items-center">
                <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
                  <AvatarImage src="https://picsum.photos/200/200?random=6" alt="Fatima B." data-ai-hint="woman smiling"/>
                  <AvatarFallback>FB</AvatarFallback>
                </Avatar>
                <CardTitle>Fatima B.</CardTitle>
                <CardDescription>Artisan Soap Maker</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-center text-foreground/70">
                  "I love being part of AlNisaaMarket. It's more than a marketplace; it's a family of creative women supporting each other."
                </p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="items-center">
                <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
                  <AvatarImage src="https://picsum.photos/200/200?random=7" alt="Aisha L." data-ai-hint="woman happy"/>
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
                <CardTitle>Aisha L.</CardTitle>
                <CardDescription>Textile Artist</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-center text-foreground/70">
                  "Selling my embroidered cushions here has been a dream come true. The platform is easy to use and the customers are wonderful."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Workshops & Events */}
       <section className="py-16 lg:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <CalendarDays className="mx-auto h-12 w-12 text-accent mb-4" />
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Workshops & Events
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              Learn new skills, connect with fellow artisans, and grow your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="flex flex-col">
              <div className="aspect-video rounded-t-lg overflow-hidden">
                <Image src="https://picsum.photos/600/338?random=8" alt="Online marketing workshop" width={600} height={338} className="object-cover w-full h-full" data-ai-hint="laptop online meeting" />
              </div>
              <CardHeader>
                <CardTitle>Online Marketing for Creatives</CardTitle>
                <CardDescription>July 15th, 2024 - Virtual Workshop</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-foreground/70">Learn how to effectively market your handmade products online and reach a wider audience. Experts share tips and tricks.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Learn More & Register</Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col">
              <div className="aspect-video rounded-t-lg overflow-hidden">
                 <Image src="https://picsum.photos/600/338?random=9" alt="Product photography workshop" width={600} height={338} className="object-cover w-full h-full" data-ai-hint="camera product setup" />
              </div>
              <CardHeader>
                <CardTitle>Product Photography Masterclass</CardTitle>
                <CardDescription>August 5th, 2024 - In-Person (Algiers)</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-foreground/70">Capture stunning photos of your products that sell. This hands-on workshop covers lighting, composition, and editing.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Learn More & Register</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

    </>
  );
}

      