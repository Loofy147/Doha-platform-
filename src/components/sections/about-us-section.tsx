import Image from 'next/image';
import { ChefHat, ScrollText, Heart } from 'lucide-react';

export function AboutUsSection() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-6">
              Our Story: A Tradition of Taste
            </h2>
            <p className="text-lg text-foreground/80 mb-4">
              Hamid Merdj Bakery is more than just a place to buy bread; it's a continuation of a family legacy. For generations, we've been perfecting the art of traditional baking, using time-honored techniques and the freshest local ingredients.
            </p>
            <p className="text-lg text-foreground/80 mb-6">
              Our passion is to bring the authentic flavors of our heritage to your table. Every loaf, pastry, and cake is baked with meticulous care and a deep respect for the craft.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <ChefHat size={24} className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary">Expert Craftsmanship</h3>
                  <p className="text-sm text-foreground/70">Baked by skilled artisans following cherished family recipes.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ScrollText size={24} className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary">Time-Honored Traditions</h3>
                  <p className="text-sm text-foreground/70">Preserving authentic baking methods passed down through generations.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart size={24} className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary">Baked with Love</h3>
                  <p className="text-sm text-foreground/70">Every item is made with passion and a commitment to quality.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 rounded-lg overflow-hidden shadow-xl aspect-square">
            <Image
              src="https://picsum.photos/600/600"
              alt="Baker kneading dough"
              width={600}
              height={600}
              className="object-cover w-full h-full"
              data-ai-hint="baker hands"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
