// src/components/product-detail/product-primary-details.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ShoppingBasket,
  Star,
  Heart,
  Share2,
  Clock,
  DollarSign,
  CalendarDays,
  Handshake,
  Plus,
  Minus,
  TagIcon,
  CheckCircle,
  AlertCircle,
  Loader2,
  MapPin,
} from 'lucide-react';
import type { Product, Service, StoreData } from '@/lib/data/mock-store-data';
import { motion, type MotionProps } from 'framer-motion';
import { RatingStarsDisplay } from './rating-stars-display'; 

type Item = Product | Service;

interface ProductPrimaryDetailsProps {
  item: Item;
  storeData: StoreData;
  quantity: number;
  handleQuantityChange: (change: number) => void;
  handlePrimaryAction: (item: Item) => void;
  isAddingToCart: boolean;
  effectiveAccentColor: string;
  itemVariants: MotionProps['variants']; 
}

export function ProductPrimaryDetails({
  item,
  storeData,
  quantity,
  handleQuantityChange,
  handlePrimaryAction,
  isAddingToCart,
  effectiveAccentColor,
  itemVariants
}: ProductPrimaryDetailsProps) {

  const displayPrice = item.discountPercentage && parseInt(item.discountPercentage) > 0 && item.rawPrice
    ? (item.rawPrice * (1 - parseInt(item.discountPercentage) / 100)).toLocaleString() + ' دج'
    : item.price;

  const originalPriceDisplay = item.discountPercentage && parseInt(item.discountPercentage) > 0 && item.rawPrice
    ? item.rawPrice.toLocaleString() + ' دج'
    : null;
    
  return (
    <motion.div variants={itemVariants}>
      <Card className="shadow-xl border-primary/10 overflow-hidden">
        <CardHeader className="bg-gradient-to-br from-card via-secondary/10 to-card pb-4">
          <div className="flex justify-between items-start gap-2">
            <div>
              <Badge variant="outline" className="mb-2 capitalize text-xs px-2 py-0.5" style={{ borderColor: effectiveAccentColor, color: effectiveAccentColor }}>
                {item.type} / {item.category}
              </Badge>
              <CardTitle className="text-3xl lg:text-4xl font-bold" style={{ color: effectiveAccentColor }}>
                {item.name}
              </CardTitle>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Button variant="ghost" size="icon" className="text-destructive/70 hover:text-destructive h-8 w-8" title="أضف إلى المفضلة" aria-label="إضافة إلى المفضلة">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary h-8 w-8" title="مشاركة" aria-label="مشاركة المنتج">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <Link href={`/store/${storeData.id}`} className="flex items-center gap-2 pt-3 group">
            <Avatar className="h-10 w-10 border-2" style={{ borderColor: effectiveAccentColor }}>
              <AvatarImage src={storeData.sellerAvatar} alt={storeData.sellerName} data-ai-hint={storeData.dataAiHintSellerAvatar} />
              <AvatarFallback>{storeData.sellerName.substring(0, 1)}</AvatarFallback>
            </Avatar>
            <div>
              <span className="text-sm font-medium text-primary group-hover:underline" style={{ color: effectiveAccentColor }}>{storeData.sellerName}</span>
              <RatingStarsDisplay rating={storeData.rating} size={12} className="gap-0.5" />
              <span className="text-xs text-muted-foreground ml-1">({storeData.reviewsCount} تقييم للمتجر)</span>
            </div>
          </Link>
        </CardHeader>
        <CardContent className="pt-4 space-y-5">
          <motion.p variants={itemVariants} className="text-base text-foreground/85 leading-relaxed whitespace-pre-line">
            {item.longDescription || item.description}
          </motion.p>

          {item.type === 'بيع' && (item as Product).preparationTime && (
            <motion.div variants={itemVariants}>
              <Badge variant="secondary"><Clock size={14} className="ml-1" /> وقت التجهيز: {(item as Product).preparationTime}</Badge>
            </motion.div>
          )}
          {item.type === 'إيجار' && (item as Product).rentalTerms && (
            <motion.div variants={itemVariants} className="text-sm text-muted-foreground space-y-1 border-l-2 pl-3 py-1" style={{ borderColor: effectiveAccentColor }}>
              <p className="font-medium text-foreground" style={{ color: effectiveAccentColor }}>شروط الإيجار:</p>
              {(item as Product).rentalTerms?.minDuration && <p><CalendarDays size={14} className="inline ml-1" /> أقل مدة: {(item as Product).rentalTerms?.minDuration}</p>}
              {(item as Product).rentalTerms?.deposit && <p><DollarSign size={14} className="inline ml-1" /> التأمين: {(item as Product).rentalTerms?.deposit}</p>}
            </motion.div>
          )}
          {item.type === 'خدمة' && (
            <motion.div variants={itemVariants} className="text-sm text-muted-foreground space-y-1 border-l-2 pl-3 py-1" style={{ borderColor: effectiveAccentColor }}>
              <p className="font-medium text-foreground" style={{ color: effectiveAccentColor }}>تفاصيل الخدمة:</p>
              {(item as Service).duration && <p><Clock size={14} className="inline ml-1" /> المدة: {(item as Service).duration}</p>}
              {(item as Service).location && <p><MapPin size={14} className="inline ml-1" /> المكان: {(item as Service).location}</p>}
            </motion.div>
          )}

          {(item as Product | Service).tags && (item as Product | Service).tags!.length > 0 && (
            <motion.div variants={itemVariants} className="mt-3">
              <p className="text-sm font-medium mb-1.5" style={{ color: effectiveAccentColor }}>كلمات مفتاحية:</p>
              <div className="flex flex-wrap gap-1.5">
                {(item as Product | Service).tags!.map(tag =>
                  <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0.5 flex items-center gap-1" style={{ borderColor: `${effectiveAccentColor}80`, color: effectiveAccentColor }}>
                    <TagIcon size={12} />
                    {tag}
                  </Badge>
                )}
              </div>
            </motion.div>
          )}

          <Separator className="my-5" />

          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <p className="text-4xl font-extrabold" style={{ color: effectiveAccentColor }}>
                {displayPrice}
              </p>
              {originalPriceDisplay && (
                <p className="text-xl text-muted-foreground line-through">{originalPriceDisplay}</p>
              )}
            </div>
            {item.type === 'بيع' && (
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} aria-label="تقليل الكمية">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-semibold w-10 text-center tabular-nums" aria-live="polite">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)} aria-label="زيادة الكمية">
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground mr-auto">
                  {(item as Product).availability === 'متوفر' ?
                    <span className="text-green-600 flex items-center"><CheckCircle size={16} className="ml-1" />متوفر</span> :
                    <span className="text-red-600 flex items-center"><AlertCircle size={16} className="ml-1" />{(item as Product).availability || 'غير متوفر'}</span>
                  }
                </span>
              </div>
            )}
            <Button
              size="lg"
              className="w-full text-lg py-6 px-8 shadow-lg text-white hover:opacity-90 transition-opacity flex items-center justify-center"
              style={{ backgroundColor: effectiveAccentColor }}
              onClick={() => handlePrimaryAction(item)}
              disabled={isAddingToCart || (item as Product).availability === 'نفذ المخزون'}
              aria-label={isAddingToCart ? 'جاري الإضافة...' : (item as Product).availability === 'نفذ المخزون' ? 'غير متوفر حاليًا' : item.type === 'بيع' ? 'أضيفي إلى السلة' : item.type === 'إيجار' ? 'احجزي الآن' : 'احجزي/استفسري عن الخدمة'}
            >
              {isAddingToCart ? (
                <Loader2 className="ml-2 h-5 w-5 animate-spin" />
              ) : (
                <>
                  {item.type === 'بيع' && <ShoppingBasket size={22} className="ml-2" />}
                  {item.type === 'إيجار' && <CalendarDays size={22} className="ml-2" />}
                  {item.type === 'خدمة' && <Handshake size={22} className="ml-2" />}
                </>
              )}
              {isAddingToCart ? 'جاري الإضافة...' :
                (item as Product).availability === 'نفذ المخزون' ? 'غير متوفر حاليًا' :
                item.type === 'بيع' ? 'أضيفي إلى السلة' :
                item.type === 'إيجار' ? 'احجزي الآن' :
                'احجزي/استفسري عن الخدمة'
              }
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
