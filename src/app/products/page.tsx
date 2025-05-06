'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Eye, Filter, Search, ShoppingBag, CalendarClock, Handshake } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

type ProductType = 'sale' | 'rental' | 'service';

interface Product {
  id: string;
  name: string;
  type: ProductType;
  category: string;
  seller: string;
  description: string;
  longDescription: string;
  price?: number; // For 'sale' type
  rentalPricePerDay?: number; // For 'rental' type
  servicePrice?: string; // For 'service' type (e.g., "Starts at X", "Per Hour")
  imageSrc: string;
  dataAiHint: string;
}

const allProducts: Product[] = [
  {
    id: 'prod1',
    name: 'Handmade Ceramic Mug Set',
    type: 'sale',
    category: 'Home Goods',
    seller: 'Amina\'s Creations',
    description: 'Beautifully crafted set of 2 ceramic mugs.',
    longDescription: 'This set of two ceramic mugs is handmade with love by Amina. Each mug features a unique glaze and comfortable handle. Dishwasher and microwave safe. Capacity: 350ml.',
    price: 2800,
    imageSrc: 'https://picsum.photos/400/400?random=11',
    dataAiHint: 'ceramic mugs',
  },
  {
    id: 'prod2',
    name: 'Designer Evening Gown Rental',
    type: 'rental',
    category: 'Fashion',
    seller: 'Layla\'s Closet',
    description: 'Elegant evening gown, perfect for special occasions.',
    longDescription: 'Rent this stunning designer evening gown for your next event. Available in multiple sizes. Dry cleaning included. Rental period: 3 days.',
    rentalPricePerDay: 5000,
    imageSrc: 'https://picsum.photos/400/400?random=12',
    dataAiHint: 'evening gown',
  },
  {
    id: 'prod3',
    name: 'Custom Cake Design Service',
    type: 'service',
    category: 'Sweets & Treats',
    seller: 'Fatima\'s Confections',
    description: 'Bespoke cake design for weddings and parties.',
    longDescription: 'Fatima offers custom cake design services for any occasion. Choose your flavors, theme, and size. Consultation required. Prices vary based on complexity.',
    servicePrice: 'Starts at DA 8000',
    imageSrc: 'https://picsum.photos/400/400?random=13',
    dataAiHint: 'custom cake service',
  },
  {
    id: 'prod4',
    name: 'Custom Calligraphy Wall Art',
    type: 'sale',
    category: 'Art & Decor',
    seller: 'Nora\'s Artistry',
    description: 'Personalized calligraphy piece for home or gift.',
    longDescription: 'Commission a beautiful, personalized calligraphy piece from Nora. Choose your favorite quote, name, or verse. Various sizes and framing options available.',
    price: 3200,
    imageSrc: 'https://picsum.photos/400/400?random=14',
    dataAiHint: 'calligraphy art',
  },
   {
    id: 'prod5',
    name: 'Photography Equipment Rental',
    type: 'rental',
    category: 'Services',
    seller: 'LensLease Co.',
    description: 'Rent professional cameras, lenses, and lighting.',
    longDescription: 'Access top-tier photography gear without the commitment of buying. Daily and weekly rental options available for a range of equipment.',
    rentalPricePerDay: 3000, // Example: average daily for a kit
    imageSrc: 'https://picsum.photos/400/400?random=15',
    dataAiHint: 'camera rental',
  },
  {
    id: 'prod6',
    name: 'Hand-painted Silk Cushion Cover',
    type: 'sale',
    category: 'Home Goods',
    seller: 'Samira\'s Silks',
    description: 'Luxurious silk cushion cover, unique designs.',
    longDescription: 'Add a touch of artistry to your home with Samira\'s hand-painted silk cushion covers. Each piece is unique. Fits standard 45x45cm cushions. Cover only.',
    price: 3800,
    imageSrc: 'https://picsum.photos/400/400?random=16',
    dataAiHint: 'silk cushion',
  },
   {
    id: 'prod7',
    name: 'Online Tutoring Service (Math)',
    type: 'service',
    category: 'Education',
    seller: 'Zahra\'s Tutoring',
    description: 'Personalized online math tutoring for K-12 students.',
    longDescription: 'Zahra provides expert online math tutoring tailored to individual student needs. Improve grades and build confidence. Hourly sessions available.',
    servicePrice: 'DA 2000 / hour',
    imageSrc: 'https://picsum.photos/400/400?random=17',
    dataAiHint: 'online tutoring',
  },
  {
    id: 'prod8',
    name: 'Natural Rosewater Face Toner',
    type: 'sale',
    category: 'Beauty',
    seller: 'Yasmin\'s Garden',
    description: 'Pure and refreshing rosewater toner. 100ml.',
    longDescription: 'Rejuvenate your skin with Yasmin\'s pure rosewater toner. Made from distilled rose petals, it helps hydrate, balance, and tone your skin. Suitable for all skin types. 100ml spray bottle.',
    price: 1200,
    imageSrc: 'https://picsum.photos/400/400?random=18',
    dataAiHint: 'rosewater toner',
  }
];

const categories = ['All', ...new Set(allProducts.map(p => p.category))];
const productTypes: ProductType[] = ['sale', 'rental', 'service'];

export default function ProductsPage() {
  const [isClient, setIsClient] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
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
    if (selectedType !== 'All') {
      products = products.filter(p => p.type === selectedType);
    }
    if (searchTerm) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.seller.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(products);
  }, [selectedCategory, selectedType, searchTerm]);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  const getProductPriceDisplay = (product: Product) => {
    switch (product.type) {
      case 'sale':
        return `DA ${product.price?.toLocaleString()}`;
      case 'rental':
        return `DA ${product.rentalPricePerDay?.toLocaleString()} / day`;
      case 'service':
        return product.servicePrice || 'Inquire for price';
      default:
        return 'N/A';
    }
  };

  const getModalActionText = (type?: ProductType) => {
    switch (type) {
      case 'sale': return <><ShoppingBag size={18} className="mr-2" /> Add to Cart (Coming Soon)</>;
      case 'rental': return <><CalendarClock size={18} className="mr-2" /> Book Rental (Coming Soon)</>;
      case 'service': return <><Handshake size={18} className="mr-2" /> Inquire/Book Service (Coming Soon)</>;
      default: return 'View Details';
    }
  }

  if (!isClient) {
    // Skeleton loader
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            Explore Products & Services
          </h1>
          <p className="mt-4 text-lg text-foreground/80">
            Loading amazing creations and services...
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
          Discover Unique Creations & Services
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          Browse a diverse collection from talented women entrepreneurs. Each item and service tells a story.
        </p>
      </header>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center p-4 bg-card rounded-lg shadow">
        <div className="relative flex-grow w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="Search products, services, sellers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              {productTypes.map(type => (
                <SelectItem key={type} value={type} className="capitalize">{type}</SelectItem>
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
                <CardDescription className="text-xs text-muted-foreground mb-1">By {product.seller} • {product.category}</CardDescription>
                <span className="text-xs capitalize bg-accent-purple/20 text-accent-purple-foreground px-2 py-0.5 rounded-full self-start mb-2">{product.type}</span>
                <p className="text-sm text-foreground/80 flex-grow mb-2">{product.description}</p>
                <p className="text-xl font-bold text-accent-pink mt-auto">{getProductPriceDisplay(product)}</p>
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
          <h3 className="text-xl font-semibold text-primary mb-2">No Items Found</h3>
          <p className="text-foreground/70">
            Try adjusting your search or filters, or check back later for new additions!
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
              <p className="text-sm text-muted-foreground">By {selectedProduct.seller} • Category: {selectedProduct.category} • Type: <span className="capitalize">{selectedProduct.type}</span></p>
            </DialogHeader>
            <DialogDescription className="text-base text-foreground/80 text-left py-4 max-h-[200px] overflow-y-auto">
              {selectedProduct.longDescription}
            </DialogDescription>
            <p className="text-2xl font-bold text-accent-pink mt-2 text-left">{getProductPriceDisplay(selectedProduct)}</p>
            <DialogFooter className="mt-6 sm:justify-between items-center">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              <Button type="button" className="bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground">
                {getModalActionText(selectedProduct.type)}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
