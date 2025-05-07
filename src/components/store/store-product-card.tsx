// src/components/store/store-product-card.tsx
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBasket, Star, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/app/store/[storeId]/page'; // Assuming Product type is exported from store page

interface StoreProductCardProps {
  product: Product;
  accentColor?: string;
  onViewDetails: (product: Product) => void; // Callback to handle view details
}

const StoreProductCard: React.FC<StoreProductCardProps> = ({ product, accentColor, onViewDetails }) => {
  const { toast } = useToast();

  const handleAddToCartAnimation = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    button.classList.add('animate-pulse');
    setTimeout(() => button.classList.remove('animate-pulse'), 500);

    toast({
      title: `🎉 ${product.name}`,
      description: "تمت إضافة المنتج إلى سلتك (محاكاة)!",
      action: <Button variant="outline" size="sm" onClick={() => {/* navigate to cart */}}>عرض السلة</Button>,
    });
  };
  
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group h-full border rounded-lg hover:border-primary/50 transform hover:-translate-y-1">
      <CardHeader className="p-0 relative aspect-square">
        <Image 
          src={product.imageSrc} 
          alt={product.name} 
          fill 
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105" 
          data-ai-hint={product.dataAiHint} 
        />
        <div className="absolute top-2 right-2 flex flex-col gap-1">
            {product.isNew && <Badge variant="destructive" className="shadow-md animate-bounce">جديد!</Badge>}
            {product.isBestseller && <Badge style={{ backgroundColor: accentColor || 'hsl(var(--accent-yellow))', color: 'hsl(var(--accent-yellow-foreground))' }} className="shadow-md">الأكثر مبيعًا</Badge>}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <CardTitle 
            className="text-lg font-semibold text-primary mb-1 group-hover:text-pink-500 transition-colors cursor-pointer" 
            style={{ color: accentColor || 'hsl(var(--primary))' }}
            onClick={() => onViewDetails(product)}
        >
          {product.name}
        </CardTitle>
        <CardDescription className="text-xs text-foreground/70 flex-grow mb-2">{product.description}</CardDescription>
        {product.averageRating && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                <Star className="w-3.5 h-3.5" style={{fill: accentColor || 'hsl(var(--accent-yellow))', color: accentColor || 'hsl(var(--accent-yellow))'}}/>
                <span>{product.averageRating.toFixed(1)}</span>
                <span>({product.reviewCount} تقييمات)</span>
            </div>
        )}
        <p className="text-xl font-bold mt-auto" style={{ color: accentColor || 'hsl(var(--accent-pink))' }}>{product.price}</p>
      </CardContent>
      <CardFooter className="p-3 border-t flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1 hover:text-white transition-all duration-300"
          style={{
            borderColor: accentColor || 'hsl(var(--primary))',
            color: accentColor || 'hsl(var(--primary))',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = accentColor || 'hsl(var(--primary))'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          onClick={() => onViewDetails(product)}
        >
          <Eye size={16} className="ml-2"/> تفاصيل
        </Button>
         <Button 
          className="flex-1 text-white transition-all duration-300"
          style={{
            backgroundColor: accentColor || 'hsl(var(--primary))',
            opacity: 0.9
          }}
           onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
           onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
           onClick={handleAddToCartAnimation}
        >
          <ShoppingBasket size={16} className="ml-2"/> أضيفي للسلة
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoreProductCard;
