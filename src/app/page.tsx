
import { HeroSection } from '@/components/sections/hero-section';
import { ProductShowcase } from '@/components/sections/product-showcase';
import { DailySpecialsSection } from '@/components/sections/daily-specials-section';
import { AboutUsSection } from '@/components/sections/about-us-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ContactSection } from '@/components/sections/contact-section';
import { SubscriptionCTASection } from '@/components/sections/subscription-cta-section';


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DailySpecialsSection />
      <ProductShowcase />
      <SubscriptionCTASection />
      <AboutUsSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
