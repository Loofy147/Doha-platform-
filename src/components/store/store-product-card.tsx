// src/components/store/store-product-card.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link'; // Added Link import
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBasket, Star, Eye, Heart } from 'lucide-react'; 
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/data/mock-store-data'; // Updated path
import { cn } from '@/lib/utils';

interface StoreProductCardProps {
  product: Product;
  accentColor?: string;
  onViewDetails: (product: Product) => void; 
  className?: string; 
}

const StoreProductCard: React.FC<StoreProductCardProps> = ({ product, accentColor, onViewDetails, className }) => {
  const { toast } = useToast();

  const handleAddToCartAnimation = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    button.classList.add('animate-head-shake'); 
    setTimeout(() => button.classList.remove('animate-head-shake'), 600);

    toast({
      title: `💖 ${product.name}`,
      description: "تمت إضافة المنتج إلى سلة أمنياتك (محاكاة)!",
      action: <Button variant="outline" size="sm" onClick={() => {/* navigate to cart or wishlist */}}>عرض السلة/الأمنيات</Button>,
    });
  };
  
  return (
    <Card className={cn("overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group h-full border rounded-xl hover:border-primary/60 transform hover:-translate-y-1.5", className)}>
      <CardHeader className="p-0 relative aspect-square overflow-hidden">
        <Link href={`/store/${product.storeSlug}/product/${product.id}`} passHref>
          <Image 
            src={product.imageSrc} 
            alt={product.name} 
            fill 
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110" 
            data-ai-hint={product.dataAiHint} 
          />
        </Link>
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-10">
            {product.isNew && <Badge variant="destructive" className="shadow-md animate-pulse backdrop-blur-sm bg-destructive/80">جديد!</Badge>}
            {product.isBestseller && <Badge style={{ backgroundColor: accentColor || 'hsl(var(--accent-yellow))', color: 'hsl(var(--accent-yellow-foreground))' }} className="shadow-md backdrop-blur-sm bg-opacity-80">الأكثر مبيعًا</Badge>}
        </div>
        <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 left-2 z-10 bg-card/50 hover:bg-card rounded-full text-destructive opacity-80 group-hover:opacity-100 transition-opacity"
            onClick={() => toast({title: "تمت الإضافة للمفضلة (محاكاة)", description: `${product.name} أضيف إلى قائمة أمنياتك.`})}
            title="أضف إلى المفضلة"
        >
            <Heart className="w-5 h-5" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <CardTitle 
            className="text-lg font-semibold text-primary mb-1 group-hover:underline transition-colors cursor-pointer" 
            style={{ color: accentColor || 'hsl(var(--primary))' }}
            onClick={() => onViewDetails(product)}
        >
          {product.name}
        </CardTitle>
        <CardDescription className="text-xs text-foreground/70 flex-grow mb-2 line-clamp-2">{product.description}</CardDescription>
        {product.averageRating && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                <Star className="w-3.5 h-3.5" style={{fill: accentColor || 'hsl(var(--accent-yellow))', color: accentColor || 'hsl(var(--accent-yellow))'}}/>
                <span>{product.averageRating.toFixed(1)}</span>
                <span className="text-muted-foreground/70">({product.reviewCount} تقييمات)</span>
            </div>
        )}
        <p className="text-xl font-bold mt-auto" style={{ color: accentColor || 'hsl(var(--accent-pink))' }}>{product.price}</p>
      </CardContent>
      <CardFooter className="p-3 border-t flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1 hover:text-white transition-all duration-300 group/button"
          style={{
            borderColor: accentColor || 'hsl(var(--primary))',
            color: accentColor || 'hsl(var(--primary))',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = accentColor || 'hsl(var(--primary))'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          onClick={() => onViewDetails(product)}
        >
          <Eye size={16} className="ml-2 group-hover/button:animate-pulse"/> تفاصيل
        </Button>
         <Button 
          className="flex-1 text-white transition-all duration-300 group/button"
          style={{
            backgroundColor: accentColor || 'hsl(var(--primary))',
            opacity: 0.9
          }}
           onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
           onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
           onClick={handleAddToCartAnimation}
        >
          <ShoppingBasket size={16} className="ml-2 group-hover/button:animate-bounce"/> أضيفي للسلة
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoreProductCard;
