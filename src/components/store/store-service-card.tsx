// src/components/store/store-service-card.tsx
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarPlus, Eye, Heart, Clock, MapPin, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Service } from '@/lib/data/mock-store-data';
import { cn } from '@/lib/utils';

interface StoreServiceCardProps {
  service: Service;
  accentColor?: string;
  onViewDetails: (service: Service) => void;
  className?: string;
}

const StoreServiceCard: React.FC<StoreServiceCardProps> = ({ service, accentColor, onViewDetails, className }) => {
  const { toast } = useToast();

  const handleBookServiceAnimation = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    button.classList.add('animate-head-shake');
    setTimeout(() => button.classList.remove('animate-head-shake'), 600);

    toast({
      title: `🗓️ ${service.name}`,
      description: "تم طلب الخدمة (محاكاة)! سنتواصل معكِ للتفاصيل.",
      action: <Button variant="outline" size="sm">متابعة الحجوزات</Button>,
    });
  };

  return (
    <Card className={cn("overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group h-full border rounded-xl hover:border-primary/60 transform hover:-translate-y-1.5", className)}>
      <CardHeader className="p-0 relative aspect-video overflow-hidden"> {/* Changed aspect-square to aspect-video for services */}
        <Image
          src={service.imageSrc || 'https://picsum.photos/seed/serviceplaceholder/400/225'} // Fallback image
          alt={service.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          data-ai-hint={service.dataAiHint || "service image"}
        />
         <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 left-2 z-10 bg-card/50 hover:bg-card rounded-full text-destructive opacity-80 group-hover:opacity-100 transition-opacity"
            onClick={() => toast({title: "تمت الإضافة للمفضلة (محاكاة)", description: `${service.name} أضيفت إلى قائمة أمنياتك.`})}
            title="أضف إلى المفضلة"
        >
            <Heart className="w-5 h-5" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <p className="text-xs text-muted-foreground mb-1">{service.category}</p>
        <CardTitle
            className="text-lg font-semibold text-primary mb-1 group-hover:underline transition-colors cursor-pointer"
            style={{ color: accentColor || 'hsl(var(--primary))' }}
            onClick={() => onViewDetails(service)}
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

        <p className="text-xl font-bold mt-auto" style={{ color: accentColor || 'hsl(var(--accent-pink))' }}>{service.price}</p>
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
          onClick={() => onViewDetails(service)}
        >
          <Eye size={16} className="ml-2 group-hover/button:animate-pulse"/> تفاصيل الخدمة
        </Button>
         <Button
          className="flex-1 text-white transition-all duration-300 group/button"
          style={{
            backgroundColor: accentColor || 'hsl(var(--primary))',
            opacity: 0.9
          }}
           onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
           onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
           onClick={handleBookServiceAnimation}
        >
          <CalendarPlus size={16} className="ml-2 group-hover/button:animate-bounce"/> احجزي الخدمة
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoreServiceCard;
