import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { HamidMerdjLogo } from '@/components/icons/logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-secondary/50 text-secondary-foreground">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <HamidMerdjLogo className="h-12 w-auto" />
            </Link>
            <p className="text-sm">
              Experience the taste of tradition with Hamid Merdj Bakery. Freshly baked goods made with love and generations of expertise.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#products" className="hover:text-primary transition-colors">Our Products</Link></li>
              <li><Link href="#about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-accent" />
                <span>123 Bakery Street, Algiers, Algeria</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-accent" />
                <span>+213 (0) 555 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                <span>info@hamidmerdjbakery.dz</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-accent" />
                <span>Mon - Sat: 7 AM - 7 PM</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm">
          <p>&copy; {currentYear} Hamid Merdj Bakery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
