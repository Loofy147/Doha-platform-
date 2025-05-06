import Image from 'next/image';
import { Users, Lightbulb, Handshake } from 'lucide-react';

export function AboutUsSection() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-6">
              Empowering Women, Celebrating Talent
            </h2>
            <p className="text-lg text-foreground/80 mb-4">
              AlNisaaMarket is more than just an e-commerce platform; it's a vibrant community dedicated to showcasing and supporting the incredible talents of women entrepreneurs. We believe in the power of creativity and the importance of economic empowerment.
            </p>
            <p className="text-lg text-foreground/80 mb-6">
              Our mission is to provide a space where women can share their unique products, connect with customers, and grow their businesses. We are committed to fostering an inclusive and supportive environment for all our sellers and shoppers.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Users size={24} className="text-accent-pink mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary">Community-Focused</h3>
                  <p className="text-sm text-foreground/70">A supportive network for women artisans and entrepreneurs.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb size={24} className="text-accent-yellow mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary">Showcasing Talent</h3>
                  <p className="text-sm text-foreground/70">Providing a platform for unique, handcrafted products.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Handshake size={24} className="text-accent-purple mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary">Fostering Growth</h3>
                  <p className="text-sm text-foreground/70">Helping women build and scale their businesses.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 rounded-lg overflow-hidden shadow-xl aspect-video">
            <Image
              src="https://picsum.photos/600/338?random=20"
              alt="Diverse group of women entrepreneurs"
              width={600}
              height={338}
              className="object-cover w-full h-full"
              data-ai-hint="women entrepreneurs"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

      