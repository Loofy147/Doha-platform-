import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarPlus, Gift, Smile } from 'lucide-react';
import Image from 'next/image';

// Placeholder image - Removed local import

export function SubscriptionCTASection() {
  return (
    <section id="subscription-cta" className="py-16 lg:py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://picsum.photos/1920/1080" // Using picsum.photos
          alt="Bakery subscription background"
          layout="fill"
          objectFit="cover"
          data-ai-hint="baking ingredients pattern"
          
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Card className="shadow-xl border-2 border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="inline-block p-3 bg-accent rounded-full mb-4 shadow-md">
              <CalendarPlus size={36} className="text-accent-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Never Miss Your Favorite Bakes!
            </CardTitle>
            <CardDescription className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              Join our subscription service and enjoy fresh, delicious baked goods delivered to your schedule. Customize your plan and wake up to the smell of happiness.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8 mt-8 text-center">
              <div className="flex flex-col items-center p-4">
                <div className="p-3 bg-primary rounded-full mb-3 shadow">
                  <Gift size={28} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-1">Exclusive Perks</h3>
                <p className="text-sm text-foreground/70">Get early access to new items, special discounts, and members-only treats.</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="p-3 bg-primary rounded-full mb-3 shadow">
                  <Smile size={28} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-1">Ultimate Convenience</h3>
                <p className="text-sm text-foreground/70">Set your preferences once and enjoy regular deliveries without the hassle of reordering.</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="p-3 bg-primary rounded-full mb-3 shadow">
                  <CalendarPlus size={28} className="text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-1">Flexible Plans</h3>
                <p className="text-sm text-foreground/70">Choose from daily, weekly, or custom schedules. Pause or modify your subscription anytime.</p>
              </div>
            </div>
            <div className="mt-10 text-center">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transform hover:scale-105 transition-transform">
                <Link href="/subscriptions">
                  Explore Subscription Plans <CalendarPlus className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
