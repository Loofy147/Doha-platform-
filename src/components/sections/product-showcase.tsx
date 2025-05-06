'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Wheat, ShoppingCart, Eye } from 'lucide-react';
import type { StaticImageData } from 'next/image';
import { useState, useEffect } from 'react';

// Placeholder images - in a real app, these would come from a CMS or API
// Removed local image imports

interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  imageSrc: string; // Changed to string for URL
  dataAiHint: string;
  price: string; // Added price
}

const products: Product[] = [
  {
    id: '1',
    name: 'Traditional Khobz Dar',
    description: 'Soft, homemade Algerian bread, perfect for any meal.',
    longDescription: 'Our Khobz Dar is baked fresh daily using a traditional family recipe. Its fluffy texture and rich flavor make it an ideal companion for stews, tagines, or simply enjoyed with olive oil.',
    imageSrc: 'https://picsum.photos/600/450',
    dataAiHint: 'traditional bread',
    price: 'DA 150',
  },
  {
    id: '2',
    name: 'Sweet Msemmen',
    description: 'Flaky, layered pancakes, often enjoyed with honey or jam.',
    longDescription: 'Experience the delight of Msemmen, a classic Algerian layered pancake. Its flaky texture and buttery taste are perfect for breakfast or a sweet snack, especially when drizzled with honey.',
    imageSrc: 'https://picsum.photos/600/450',
    dataAiHint: 'algerian pastry',
    price: 'DA 80',
  },
  {
    id: '3',
    name: 'Artisan Baguette',
    description: 'Crusty on the outside, soft on the inside – a French classic.',
    longDescription: 'Our artisan baguettes are crafted with high-quality flour and baked to perfection, achieving a crispy golden crust and a soft, airy interior. Ideal for sandwiches or pairing with cheese.',
    imageSrc: 'https://picsum.photos/600/450',
    dataAiHint: 'french baguette',
    price: 'DA 120',
  },
  {
    id: '4',
    name: 'Date Maamoul Cookies',
    description: 'Delicate shortbread pastries filled with sweet dates.',
    longDescription: 'Maamoul are traditional Middle Eastern shortbread cookies. Ours are filled with premium quality sweet dates and delicately spiced, making them a perfect treat with coffee or tea.',
    imageSrc: 'https://picsum.photos/600/450',
    dataAiHint: 'date cookies',
    price: 'DA 250 (Box)',
  },
  {
    id: '5',
    name: 'Crispy Baklava',
    description: 'Layers of flaky pastry, nuts, and sweet syrup – a delightful classic.',
    longDescription: 'Indulge in our exquisite Baklava, featuring layers of crispy phyllo pastry, a generous filling of mixed nuts, and a fragrant sweet syrup. A timeless dessert that is both rich and delicate.',
    imageSrc: 'https://picsum.photos/600/450',
    dataAiHint: 'baklava pastry',
    price: 'DA 300 (Portion)',
  },
  {
    id: '6',
    name: 'Kalb el Louz',
    description: 'A rich semolina and almond cake, soaked in orange blossom syrup.',
    longDescription: 'Kalb el Louz, meaning "heart of almonds," is a traditional Algerian cake made with semolina and ground almonds, then soaked in a fragrant orange blossom syrup. It\'s moist, rich, and utterly delicious.',
    imageSrc: 'https://picsum.photos/600/450',
    dataAiHint: 'semolina cake',
    price: 'DA 200 (Slice)',
  },
  {
    id: '7',
    name: 'Algerian Makrout',
    description: 'Diamond-shaped semolina cookies filled with dates, fried and soaked in honey.',
    longDescription: 'Makrout are iconic Algerian cookies. These diamond-shaped treats are made from semolina dough, filled with a sweet date paste, fried until golden, and then generously soaked in honey.',
    imageSrc: 'https://picsum.photos/600/450',
    dataAiHint: 'makrout pastry',
    price: 'DA 220 (Box)',
  },
  {
    id: '8',
    name: 'Ghraiba Cookies',
    description: 'Crumbly Algerian shortbread cookies, often flavored with lemon or orange blossom.',
    longDescription: 'Ghraiba are delightful North African shortbread cookies known for their crumbly, melt-in-your-mouth texture. Ours are subtly flavored with lemon zest and a hint of orange blossom water.',
    imageSrc: 'https://picsum.photos/600/450',
    dataAiHint: 'ghraiba cookies',
    price: 'DA 180 (Box)',
  },
];

export function ProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (!isClient) {
    // Render a loading state or null on the server to avoid hydration mismatch
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={`skeleton-${index}`} className="overflow-hidden shadow-lg rounded-lg flex flex-col">
                <CardHeader className="p-0">
                  <div className="aspect-w-4 aspect-h-3 bg-muted animate-pulse"></div>
                </CardHeader>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="h-6 bg-muted animate-pulse mb-2 w-3/4"></div>
                  <div className="h-4 bg-muted animate-pulse w-full mb-1"></div>
                  <div className="h-4 bg-muted animate-pulse w-5/6"></div>
                </CardContent>
                <CardFooter className="p-4">
                  <div className="h-10 bg-muted animate-pulse w-full rounded-md"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg flex flex-col">
              <CardHeader className="p-0 relative">
                <div className="aspect-w-4 aspect-h-3">
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                    data-ai-hint={product.dataAiHint}
                    
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6 flex flex-col flex-grow">
                <CardTitle className="text-xl font-semibold text-primary mb-2 flex items-center gap-2">
                  <Wheat size={20} className="text-accent" /> {product.name}
                </CardTitle>
                <CardDescription className="text-sm text-foreground/70 flex-grow">
                  {product.description}
                </CardDescription>
                <p className="text-lg font-semibold text-primary mt-2">{product.price}</p>
              </CardContent>
              <CardFooter className="p-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleViewDetails(product)}
                >
                  <Eye size={18} className="mr-2" /> View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {selectedProduct && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle className="text-2xl text-primary flex items-center gap-2">
                  <Wheat size={24} className="text-accent" /> {selectedProduct.name}
                </DialogTitle>
                <div className="aspect-w-16 aspect-h-9 my-4 rounded-md overflow-hidden">
                   <Image
                    src={selectedProduct.imageSrc}
                    alt={selectedProduct.name}
                    width={600}
                    height={338}
                    className="object-cover w-full h-full"
                    data-ai-hint={selectedProduct.dataAiHint}
                    
                  />
                </div>
                <DialogDescription className="text-base text-foreground/80 text-left">
                  {selectedProduct.longDescription}
                </DialogDescription>
                <p className="text-xl font-bold text-primary mt-4 text-left">{selectedProduct.price}</p>
              </DialogHeader>
              <DialogFooter className="mt-6">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
                <Button type="button" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <ShoppingCart size={18} className="mr-2" /> Add to Order (Coming Soon)
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}
