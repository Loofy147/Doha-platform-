// src/components/store/store-service-card.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarPlus, Eye, Heart, Clock, MapPin, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Service } from '@/lib/data/mock-store-data';
import { cn } from '@/lib/utils';
import { useWishlist } from '@/context/wishlist-context';

interface StoreServiceCardProps {
  service: Service;
  accentColor?: string;
  onViewDetails: (service: Service) => void;
  className?: string;
}

const StoreServiceCard: React.FC<StoreServiceCardProps> = ({ service, accentColor, onViewDetails, className }) => {
  const { toast } = useToast();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();
  const primaryColor = accentColor || 'hsl(var(--primary))';
  const accentPinkColor = accentColor || 'hsl(var(--accent-pink))';

  const isInWishlist = wishlistState.items.some(item => item.id === service.id);

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
      wishlistDispatch({ type: 'REMOVE_ITEM', payload: { id: service.id } });
      toast({
        title: `💔 ${service.name}`,
        description: 'تمت إزالة الخدمة من قائمة أمنياتك.',
      });
    } else {
      wishlistDispatch({ type: 'ADD_ITEM', payload: service });
      toast({
        title: `💖 ${service.name}`,
        description: 'تمت إضافة الخدمة إلى قائمة أمنياتك!',
        action: (
          <Button variant="outline" size="sm" asChild>
            <Link href="/wishlist">عرض القائمة</Link>
          </Button>
        ),
      });
    }
  };

  const handleBookServiceAnimation = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    button.classList.add('animate-head-shake');
    setTimeout(() => button.classList.remove('animate-head-shake'), 600);

    toast({
      title: `🗓️ ${service.name}`,
      description: "تم طلب الخدمة بنجاح (محاكاة)! سنتواصل معكِ قريبًا لتأكيد التفاصيل.",
      action: <Button variant="outline" size="sm">متابعة حجوزاتي</Button>,
    });
  };

  return (
    <Card className={cn(
        "overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group h-full border rounded-xl border-border/50 hover:border-primary/60 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        "transform hover:-translate-y-1.5", // Subtle lift on hover
        className
    )}>
      <CardHeader className="p-0 relative aspect-video overflow-hidden">
        <Link href={`/products/${service.id}`} passHref aria-label={`عرض تفاصيل ${service.name}`}>
            <Image
            src={service.imageSrc || 'https://picsum.photos/seed/serviceplaceholder/400/225'} // Fallback image
            alt={service.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            data-ai-hint={service.dataAiHint || "service image"}
            />
        </Link>
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
        <p className="text-xs text-muted-foreground mb-1 capitalize">{service.type} / {service.category}</p>
        <CardTitle
            className="text-base font-semibold text-primary mb-1 group-hover:underline transition-colors cursor-pointer line-clamp-2"
            style={{ color: primaryColor }}
            onClick={() => onViewDetails(service)}
            title={service.name}
        >
          {service.name}
        </CardTitle>
        <CardDescription className="text-xs text-foreground/70 flex-grow mb-2 line-clamp-2">{service.description}</CardDescription>

        {service.duration && (
            <p className="text-xs text-muted-foreground mb-0.5 flex items-center"><Clock size={12} className="ml-1"/>المدة: {service.duration}</p>
        )}
        {service.location && (
            <p className="text-xs text-muted-foreground mb-2 flex items-center"><MapPin size={12} className="ml-1"/>المكان: {service.location}</p>
        )}

        <p className="text-lg font-bold mt-auto" style={{ color: accentPinkColor }}>{service.price}</p>
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
          onClick={() => onViewDetails(service)}
          aria-label={`عرض تفاصيل ${service.name}`}
        >
          <Eye size={16} className="ml-2 group-hover/button:animate-pulse"/> تفاصيل الخدمة
        </Button>
         <Button
          className="flex-1 text-white transition-opacity duration-300 group/button hover:opacity-90 shadow-md"
          style={{
            backgroundColor: primaryColor,
          }}
           onClick={handleBookServiceAnimation}
           aria-label={`حجز خدمة ${service.name}`}
        >
          <CalendarPlus size={16} className="ml-2 group-hover/button:animate-bounce"/> احجزي الخدمة
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoreServiceCard;
