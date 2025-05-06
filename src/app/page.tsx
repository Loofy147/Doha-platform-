import { HeroSection } from '@/components/sections/hero-section';
import { ProductShowcase } from '@/components/sections/product-showcase';
import { AboutUsSection } from '@/components/sections/about-us-section';
import { ContactSection } from '@/components/sections/contact-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductShowcase />
      <AboutUsSection />
      <ContactSection />
    </>
  );
}
