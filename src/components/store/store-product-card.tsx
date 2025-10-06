// src/components/store/store-product-card.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBasket, Star, Eye, Heart, CalendarClock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/data/mock-store-data';
import { cn } from '@/lib/utils';
import { useWishlist } from '@/context/wishlist-context';

interface StoreProductCardProps {
  product: Product;
  accentColor?: string;
  onViewDetails: (product: Product) => void;
  className?: string;
}

const StoreProductCard: React.FC<StoreProductCardProps> = ({ product, accentColor, onViewDetails, className }) => {
  const { toast } = useToast();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const primaryColor = accentColor || 'hsl(var(--primary))';
  const accentPinkColor = accentColor || 'hsl(var(--accent-pink))';
  const accentYellowColor = accentColor || 'hsl(var(--accent-yellow))';

  const isInWishlist = wishlistState.items.some(item => item.id === product.id);

  const handleWishlistToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const button = event.currentTarget;
    button.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.2)' },
        { transform: 'scale(1)' },
      ],
      { duration: 300, easing: 'ease-in-out' }
    );

    if (isInWishlist) {
      wishlistDispatch({ type: 'REMOVE_ITEM', payload: { id: product.id } });
      toast({
        title: `💔 ${product.name}`,
        description: 'تمت إزالة المنتج من قائمة أمنياتك.',
      });
    } else {
      wishlistDispatch({ type: 'ADD_ITEM', payload: product });
      toast({
        title: `💖 ${product.name}`,
        description: 'تمت إضافة المنتج إلى قائمة أمنياتك!',
        action: (
          <Button variant="outline" size="sm" asChild>
            <Link href="/wishlist">عرض القائمة</Link>
          </Button>
        ),
      });
    }
  };

  const handlePrimaryActionAnimation = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    button.classList.add('animate-head-shake');
    setTimeout(() => button.classList.remove('animate-head-shake'), 600);

    const actionText = product.type === 'بيع' ? 'تمت الإضافة للسلة' : 'تم الحجز (محاكاة)';
    const buttonText = product.type === 'بيع' ? 'عرض السلة' : 'عرض الحجوزات';
    const navigateTo = product.type === 'بيع' ? '/cart' : '/dashboard/orders'; // Adjust navigation as needed

    toast({
      title: `🛍️ ${product.name}`,
      description: `${actionText}!`,
      action: <Button variant="outline" size="sm" onClick={() => { /* navigate to target */ }}>{buttonText}</Button>,
    });
  };

  const displayPrice = product.discountPercentage && parseInt(product.discountPercentage) > 0 && product.rawPrice
    ? (product.rawPrice * (1 - parseInt(product.discountPercentage) / 100)).toLocaleString() + ' دج'
    : product.price;

  const originalPriceDisplay = product.discountPercentage && parseInt(product.discountPercentage) > 0 && product.rawPrice
    ? product.rawPrice.toLocaleString() + ' دج'
    : null;

  return (
    <Card className={cn(
        "overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group h-full border rounded-xl border-border/50 hover:border-primary/60 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        "transform hover:-translate-y-1", // Subtle lift on hover
        className
    )}>
      <CardHeader className="p-0 relative aspect-square overflow-hidden">
        <Link href={`/products/${product.id}`} passHref aria-label={`عرض تفاصيل ${product.name}`}>
          <Image
            src={product.imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            data-ai-hint={product.dataAiHint}
          />
        </Link>
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-10">
            {product.isNew && <Badge variant="destructive" className="shadow-md animate-pulse backdrop-blur-sm bg-destructive/90 text-xs px-1.5 py-0.5">جديد!</Badge>}
            {product.isBestseller && <Badge style={{ backgroundColor: accentYellowColor, color: 'hsl(var(--accent-yellow-foreground))' }} className="shadow-md backdrop-blur-sm bg-opacity-90 text-xs px-1.5 py-0.5">الأكثر مبيعًا</Badge>}
            {product.discountPercentage && parseInt(product.discountPercentage) > 0 && (
                 <Badge variant="secondary" className="shadow-md backdrop-blur-sm bg-green-500/90 text-white text-xs px-1.5 py-0.5 border-none">
                   خصم {product.discountPercentage}%
                 </Badge>
            )}
        </div>
        <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-2 left-2 z-10 bg-card/50 hover:bg-card/80 rounded-full w-8 h-8 opacity-90 group-hover:opacity-100 transition-all",
              isInWishlist ? "text-destructive" : "text-destructive/80 hover:text-destructive"
            )}
            onClick={handleWishlistToggle}
            title={isInWishlist ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
            aria-label={isInWishlist ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
        >
            <Heart className={cn("w-4 h-4 transition-all", isInWishlist ? "fill-destructive" : "")} />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <p className="text-xs text-muted-foreground mb-1 capitalize">{product.type} / {product.category}</p>
        <CardTitle
            className="text-base font-semibold text-primary mb-1 group-hover:underline transition-colors cursor-pointer line-clamp-2"
            style={{ color: primaryColor }}
            onClick={() => onViewDetails(product)}
             title={product.name}
        >
          {product.name}
        </CardTitle>
        <CardDescription className="text-xs text-foreground/70 flex-grow mb-2 line-clamp-2">{product.description}</CardDescription>
        {product.averageRating && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                <Star className="w-3.5 h-3.5" style={{fill: accentYellowColor, color: accentYellowColor}}/>
                <span>{product.averageRating.toFixed(1)}</span>
                <span className="text-muted-foreground/70">({product.reviewCount} تقييمات)</span>
            </div>
        )}
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <p className="text-lg font-bold" style={{ color: accentPinkColor }}>{displayPrice}</p>
          {originalPriceDisplay && (
            <p className="text-sm text-muted-foreground line-through">{originalPriceDisplay}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-3 border-t flex gap-2">
        <Button
          variant="outline"
          className="flex-1 hover:text-white transition-colors duration-300 group/button border"
          style={{
            borderColor: primaryColor,
            color: primaryColor,
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = primaryColor}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          onClick={() => onViewDetails(product)}
          aria-label={`عرض تفاصيل ${product.name}`}
        >
          <Eye size={16} className="ml-2 group-hover/button:animate-pulse"/> تفاصيل
        </Button>
         <Button
          className="flex-1 text-white transition-opacity duration-300 group/button hover:opacity-90 shadow-md"
          style={{
            backgroundColor: primaryColor,
          }}
           onClick={handlePrimaryActionAnimation}
           aria-label={product.type === 'بيع' ? `إضافة ${product.name} للسلة` : `حجز ${product.name}`}
        >
          {product.type === 'بيع' ? <ShoppingBasket size={16} className="ml-2 group-hover/button:animate-bounce"/> : <CalendarClock size={16} className="ml-2 group-hover/button:animate-pulse"/>}
          {product.type === 'بيع' ? 'أضيفي للسلة' : 'احجزي الآن'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoreProductCard;
