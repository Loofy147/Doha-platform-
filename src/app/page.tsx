
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle, CardFooter, CardHeader } from '@/components/ui/card';
import { Sparkles, Eye, ChevronRight, Users, CalendarDays, ShoppingBag, Store, Edit3, Search } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { HeroSection } from '@/components/sections/hero-section';
import { AboutUsSection } from '@/components/sections/about-us-section';
import { ContactSection } from '@/components/sections/contact-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';


export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              How WomenCommerce Works
            </h2>
            <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
              A simple and empowering journey for both sellers and buyers on our platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Users size={32} className="text-primary" />
                </div>
                <CardTitle className="text-xl text-primary">1. Register & Verify</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/70">Sign up as a seller or customer. Quick OTP verification to get you started.</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Store size={32} className="text-primary" />
                </div>
                <CardTitle className="text-xl text-primary">2. Create Your Store</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/70">Sellers: Choose a template, customize your store name, logo, and description easily.</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Edit3 size={32} className="text-primary" />
                </div>
                <CardTitle className="text-xl text-primary">3. Add Products/Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/70">Upload photos/videos, write descriptions (or use AI!), set prices or rental terms.</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Search size={32} className="text-primary" />
                </div>
                <CardTitle className="text-xl text-primary">4. Discover & Transact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/70">Customers: Browse, buy, or rent unique items securely. Support women entrepreneurs!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products / Services */}
      <section className="py-16 lg:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <ShoppingBag className="mx-auto h-12 w-12 text-accent mb-4" />
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Featured Products & Services
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              Explore a curated selection from our talented community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <Image
                  src="https://picsum.photos/400/400?random=1"
                  alt="Handmade jewelry"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                  data-ai-hint="handmade jewelry"
                />
              </div>
              <CardContent className="pt-4">
                <CardTitle>Elegant Handmade Necklace</CardTitle>
                <CardDescription>By The Artisan Jeweler</CardDescription>
                <p className="font-semibold mt-2 text-primary">DA 3,200</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Eye className="mr-2" /> View Details
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <Image
                  src="https://picsum.photos/400/400?random=2"
                  alt="Custom cake"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                  data-ai-hint="custom cake"
                />
              </div>
              <CardContent className="pt-4">
                <CardTitle>Custom Celebration Cakes</CardTitle>
                <CardDescription>Service by Sweet Delights Bakery</CardDescription>
                <p className="font-semibold mt-2 text-primary">Starts at DA 2,000</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Eye className="mr-2" /> View Service
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <Image
                  src="https://picsum.photos/400/400?random=3"
                  alt="Rental dress"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                  data-ai-hint="evening dress"
                />
              </div>
              <CardContent className="pt-4">
                <CardTitle>Evening Gown Rental</CardTitle>
                <CardDescription>From Glamour Closet Rentals</CardDescription>
                <p className="font-semibold mt-2 text-primary">DA 5,000 / day</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Eye className="mr-2" /> View Rental
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <Image
                  src="https://picsum.photos/400/400?random=4"
                  alt="Online workshop"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                  data-ai-hint="online workshop"
                />
              </div>
              <CardContent className="pt-4">
                <CardTitle>Digital Marketing Workshop</CardTitle>
                <CardDescription>By Business Boost Academy</CardDescription>
                <p className="font-semibold mt-2 text-primary">DA 1,500</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Eye className="mr-2" /> Learn More
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action for Sellers */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Store className="mx-auto h-12 w-12 text-accent-purple mb-4" />
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Share Your Talent with the World
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Are you a talented woman entrepreneur? Join WomenCommerce and showcase your products, services, or rental items to a supportive community. We provide the tools and platform to help you grow.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild className="bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground shadow-lg transform hover:scale-105 transition-transform">
              <Link href="/sell-with-us">
                Become a Seller <ChevronRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <AboutUsSection />
      <TestimonialsSection />
      
      {/* Workshops & Community Events - Placeholder, as main TestimonialsSection covers community voice */}
       <section id="community" className="py-16 lg:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <CalendarDays className="mx-auto h-12 w-12 text-accent mb-4" />
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Community Hub: Workshops & Events
            </h2>
            <p className="mt-4 text-lg text-foreground/80">
              Connect, learn, and grow with WomenCommerce. Join our forums, workshops, and live shopping events.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="flex flex-col shadow-lg">
              <CardHeader>
                <CardTitle>Live Shopping Fridays</CardTitle>
                <CardDescription>Every Friday, 7 PM</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-foreground/70">Discover new products and interact with sellers live! Exclusive deals during the stream.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Join Live</Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col shadow-lg">
              <CardHeader>
                <CardTitle>Seller Success Forum</CardTitle>
                <CardDescription>Ongoing Discussions</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-foreground/70">Connect with fellow sellers, share tips, and get support in our dedicated forum.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Visit Forum</Button>
              </CardFooter>
            </Card>
            <Card className="flex flex-col shadow-lg">
              <CardHeader>
                <CardTitle>AI for Product Photography Workshop</CardTitle>
                <CardDescription>Coming Soon!</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-foreground/70">Learn how to use AI tools to enhance your product images and boost sales. Stay tuned for dates!</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled>Notify Me</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}

