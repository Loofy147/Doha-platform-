import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wheat } from 'lucide-react';

const products = [
  {
    name: 'Traditional Khobz Dar',
    description: 'Soft, homemade Algerian bread, perfect for any meal.',
    imageSrc: 'https://picsum.photos/400/300?random=1',
    dataAiHint: 'traditional bread',
  },
  {
    name: 'Sweet Msemmen',
    description: 'Flaky, layered pancakes, often enjoyed with honey or jam.',
    imageSrc: 'https://picsum.photos/400/300?random=2',
    dataAiHint: 'algerian pastry',
  },
  {
    name: 'Artisan Baguette',
    description: 'Crusty on the outside, soft on the inside – a French classic.',
    imageSrc: 'https://picsum.photos/400/300?random=3',
    dataAiHint: 'french baguette',
  },
  {
    name: 'Date Maamoul Cookies',
    description: 'Delicate shortbread pastries filled with sweet dates.',
    imageSrc: 'https://picsum.photos/400/300?random=4',
    dataAiHint: 'date cookies',
  },
];

export function ProductShowcase() {
  return (
    <section id="products" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Our Signature Bakes
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Handcrafted daily with the finest ingredients and traditional recipes.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.name} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
              <CardHeader className="p-0">
                <div className="aspect-w-4 aspect-h-3">
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full"
                    data-ai-hint={product.dataAiHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl font-semibold text-primary mb-2 flex items-center gap-2">
                  <Wheat size={20} className="text-accent" /> {product.name}
                </CardTitle>
                <CardDescription className="text-sm text-foreground/70">
                  {product.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
