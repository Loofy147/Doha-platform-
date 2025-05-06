import Link from 'next/link';
import { Mail, Info, Users, Briefcase, MessageSquare, Send } from 'lucide-react';
import { AlNisaaMarketLogo } from '@/components/icons/logo'; // Updated logo
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-secondary/10 text-secondary-foreground">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <AlNisaaMarketLogo className="h-14 w-auto" />
            </Link>
            <p className="text-sm text-foreground/80">
              AlNisaaMarket: A platform dedicated to empowering women entrepreneurs and showcasing their unique talents.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Discover</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-primary transition-colors">Browse Products</Link></li>
              <li><Link href="/#categories" className="hover:text-primary transition-colors">Shop by Category</Link></li>
              <li><Link href="/#featured-sellers" className="hover:text-primary transition-colors">Featured Sellers</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Our Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Get Involved</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/sell-with-us" className="hover:text-primary transition-colors flex items-center gap-1"><Briefcase size={16} /> Sell on AlNisaaMarket</Link></li>
              <li><Link href="/#community" className="hover:text-primary transition-colors flex items-center gap-1"><Users size={16} /> Join Our Community</Link></li>
              <li><Link href="/#about" className="hover:text-primary transition-colors flex items-center gap-1"><Info size={16} /> About Us</Link></li>
              <li><Link href="/#contact" className="hover:text-primary transition-colors flex items-center gap-1"><MessageSquare size={16} /> Contact Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Stay Connected</h3>
            <p className="text-sm mb-3 text-foreground/80">Get updates on new arrivals, seller spotlights, and special offers.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Enter your email" className="bg-background placeholder:text-muted-foreground" />
              <Button type="submit" variant="default" size="icon" className="bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground flex-shrink-0">
                <Send size={18} />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">
              General Inquiries: <a href="mailto:info@alnisaamarket.dz" className="hover:text-primary">info@alnisaamarket.dz</a>
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-foreground/70">
          <p>&copy; {currentYear} AlNisaaMarket. All rights reserved. Empowering Women Through Commerce.</p>
        </div>
      </div>
    </footer>
  );
}