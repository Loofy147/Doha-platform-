
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Eye, Filter, Search, ShoppingBag } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';

interface Product {
  id: string;
  name: string;
  category: string;
  seller: string;
  description: string;
  longDescription: string;
  price: number;
  imageSrc: string;
  dataAiHint: string;
}

const allProducts: Product[] = [
  {
    id: 'prod1',
    name: 'Handmade Ceramic Mug Set',
    category: 'Home Goods',
    seller: 'Amina\'s Creations',
    description: 'Beautifully crafted set of 2 ceramic mugs, perfect for your morning coffee.',
    longDescription: 'This set of two ceramic mugs is handmade with love by Amina. Each mug features a unique glaze and comfortable handle. Dishwasher and microwave safe. Capacity: 350ml.',
    price: 2800,
    imageSrc: 'https://picsum.photos/400/400?random=11',
    dataAiHint: 'ceramic mugs',
  },
  {
    id: 'prod2',
    name: 'Embroidered Linen Scarf',
    category: 'Fashion',
    seller: 'Layla\'s Textiles',
    description: 'Elegant linen scarf with delicate floral embroidery.',
    longDescription: 'Stay stylish with this breathable linen scarf, hand-embroidered by Layla. The intricate floral patterns add a touch of elegance to any outfit. Dimensions: 180cm x 70cm.',
    price: 4500,
    imageSrc: 'https://picsum.photos/400/400?random=12',
    dataAiHint: 'linen scarf',
  },
  {
    id: 'prod3',
    name: 'Organic Lavender Soap Bar',
    category: 'Beauty',
    seller: 'Fatima\'s Naturals',
    description: 'Soothing and aromatic organic soap bar made with pure lavender essential oil.',
    longDescription: 'Indulge your skin with this all-natural organic soap bar from Fatima. Made with nourishing oils and pure lavender essential oil for a calming and cleansing experience. Weight: 100g.',
    price: 850,
    imageSrc: 'https://picsum.photos/400/400?random=13',
    dataAiHint: 'lavender soap',
  },
  {
    id: 'prod4',
    name: 'Custom Calligraphy Wall Art',
    category: 'Art & Decor',
    seller: 'Nora\'s Artistry',
    description: 'Personalized calligraphy piece, perfect for home decor or as a unique gift.',
    longDescription: 'Commission a beautiful, personalized calligraphy piece from Nora. Choose your favorite quote, name, or verse. Various sizes and framing options available. Price varies by complexity.',
    price: 3200, // Starting price
    imageSrc: 'https://picsum.photos/400/400?random=14',
    dataAiHint: 'calligraphy art',
  },
   {
    id: 'prod5',
    name: 'Spiced Date Cookies (Maamoul)',
    category: 'Sweets & Treats',
    seller: 'Khadija\'s Kitchen',
    description: 'Traditional Maamoul cookies filled with dates and spices. Box of 12.',
    longDescription: 'Enjoy Khadija\'s famous Maamoul cookies, a delightful Middle Eastern treat. These shortbread cookies are filled with a sweet and spiced date paste. Perfect with tea or coffee. Box of 12.',
    price: 1800,
    imageSrc: 'https://picsum.photos/400/400?random=15',
    dataAiHint: 'date cookies',
  },
  {
    id: 'prod6',
    name: 'Hand-painted Silk Cushion Cover',
    category: 'Home Goods',
    seller: 'Samira\'s Silks',
    description: 'Luxurious silk cushion cover with unique hand-painted designs.',
    longDescription: 'Add a touch of artistry to your home with Samira\'s hand-painted silk cushion covers. Each piece is unique. Fits standard 45x45cm cushions. Cover only.',
    price: 3800,
    imageSrc: 'https://picsum.photos/400/400?random=16',
    dataAiHint: 'silk cushion',
  },
   {
    id: 'prod7',
    name: 'Beaded Berber Necklace',
    category: 'Fashion',
    seller: 'Zahra\'s Jewels',
    description: 'Authentic Berber-style necklace with colorful beads and silver accents.',
    longDescription: 'This stunning Berber-style necklace is handcrafted by Zahra, featuring vibrant beads and intricate silver-plated accents. A statement piece that celebrates traditional craftsmanship.',
    price: 6200,
    imageSrc: 'https://picsum.photos/400/400?random=17',
    dataAiHint: 'berber necklace',
  },
  {
    id: 'prod8',
    name: 'Natural Rosewater Face Toner',
    category: 'Beauty',
    seller: 'Yasmin\'s Garden',
    description: 'Pure and refreshing rosewater toner for all skin types. 100ml.',
    longDescription: 'Rejuvenate your skin with Yasmin\'s pure rosewater toner. Made from distilled rose petals, it helps hydrate, balance, and tone your skin. Suitable for all skin types. 100ml spray bottle.',
    price: 1200,
    imageSrc: 'https://picsum.photos/400/400?random=18',
    dataAiHint: 'rosewater toner',
  }
];

const categories = ['All', ...new Set(allProducts.map(p => p.category))];

export default function ProductsPage() {
  const [isClient, setIsClient] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let products = allProducts;
    if (selectedCategory !== 'All') {
      products = products.filter(p => p.category === selectedCategory);
    }
    if (searchTerm) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.seller.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(products);
  }, [selectedCategory, searchTerm]);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Explore Our Products
          </h1>
          <p className="mt-4 text-lg text-foreground/80">
            Loading amazing creations by talented women...
          </p>
        </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={`skeleton-${index}`} className="overflow-hidden shadow-lg rounded-lg flex flex-col">
                <div className="aspect-square bg-muted animate-pulse rounded-t-lg"></div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="h-6 bg-muted animate-pulse mb-2 w-3/4"></div>
                  <div className="h-4 bg-muted animate-pulse w-full mb-1"></div>
                  <div className="h-4 bg-muted animate-pulse w-5/6 mb-2"></div>
                   <div className="h-6 bg-muted animate-pulse w-1/3 mt-auto"></div>
                </CardContent>
                <CardFooter className="p-4">
                  <div className="h-10 bg-muted animate-pulse w-full rounded-md"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Discover Unique Creations
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          Browse a diverse collection of products handcrafted by talented women entrepreneurs. Each item tells a story.
        </p>
      </header>

      {/* Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center p-4 bg-card rounded-lg shadow">
        <div className="relative flex-grow w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="Search products, sellers, descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg flex flex-col bg-card">
              <CardHeader className="p-0 relative">
                <div className="aspect-square">
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover rounded-t-lg"
                    data-ai-hint={product.dataAiHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 flex flex-col flex-grow">
                <CardTitle className="text-lg font-semibold text-primary mb-1">{product.name}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground mb-2">By {product.seller} • {product.category}</CardDescription>
                <p className="text-sm text-foreground/80 flex-grow mb-2">{product.description}</p>
                <p className="text-xl font-bold text-accent-pink mt-auto">DA {product.price.toLocaleString()}</p>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <Button
                  variant="outline"
                  className="w-full hover:bg-accent-yellow/20 hover:border-accent-yellow"
                  onClick={() => handleViewDetails(product)}
                >
                  <Eye size={18} className="mr-2" /> View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-primary mb-2">No Products Found</h3>
          <p className="text-foreground/70">
            Try adjusting your search or filter, or check back later for new additions!
          </p>
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <div className="aspect-video my-4 rounded-md overflow-hidden relative">
                 <Image
                  src={selectedProduct.imageSrc}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                  data-ai-hint={selectedProduct.dataAiHint}
                />
              </div>
              <DialogTitle className="text-2xl text-primary">{selectedProduct.name}</DialogTitle>
              <p className="text-sm text-muted-foreground">By {selectedProduct.seller} • Category: {selectedProduct.category}</p>
            </DialogHeader>
            <DialogDescription className="text-base text-foreground/80 text-left py-4 max-h-[200px] overflow-y-auto">
              {selectedProduct.longDescription}
            </DialogDescription>
            <p className="text-2xl font-bold text-accent-pink mt-2 text-left">DA {selectedProduct.price.toLocaleString()}</p>
            <DialogFooter className="mt-6 sm:justify-between items-center">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              <Button type="button" className="bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground">
                <ShoppingBag size={18} className="mr-2" /> Add to Cart (Coming Soon)
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

      