import Image from 'next/image';
import { Users, Lightbulb, Handshake, Briefcase } from 'lucide-react';

export function AboutUsSection() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-6">
              Empowering Women Economically, Together
            </h2>
            <p className="text-lg text-foreground/80 mb-4">
              WomenCommerce is a dedicated e-commerce platform designed to empower women by providing a space to create virtual stores, sell or rent products, and offer services. We foster a supportive community that enhances their commercial expertise.
            </p>
            <p className="text-lg text-foreground/80 mb-6">
              Our vision is to enable women's economic independence through a secure, user-friendly digital environment tailored to their needs. We aim to provide additional or primary income for sellers and easy access to quality products and services for customers.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Users size={24} className="text-accent-pink mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary">Supportive Community</h3>
                  <p className="text-sm text-foreground/70">A network for collaboration, innovation, and shared growth among women entrepreneurs.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb size={24} className="text-accent-yellow mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary">Showcasing Diverse Talents</h3>
                  <p className="text-sm text-foreground/70">A platform for unique handcrafted products, rental items, and professional services.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Briefcase size={24} className="text-accent-purple mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary">Business Growth Tools</h3>
                  <p className="text-sm text-foreground/70">Providing AI-powered tools, analytics, and marketing features to help businesses thrive.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 rounded-lg overflow-hidden shadow-xl aspect-video">
            <Image
              src="https://picsum.photos/600/338?random=20"
              alt="Diverse group of women entrepreneurs collaborating"
              width={600}
              height={338}
              className="object-cover w-full h-full"
              data-ai-hint="women collaboration business"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
