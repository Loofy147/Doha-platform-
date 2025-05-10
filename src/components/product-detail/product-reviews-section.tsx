// src/components/product-detail/product-reviews-section.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle as ReviewIcon } from 'lucide-react'; // Renamed for clarity
import type { Review as StoreReview } from '@/lib/data/mock-store-data';
import StoreSection from '@/components/store/store-section';
import { RatingStarsDisplay } from './rating-stars-display';
import { motion, type MotionProps } from 'framer-motion';

interface ProductReviewsSectionProps {
  reviews: StoreReview[];
  effectiveAccentColor: string;
  totalReviewCount?: number; // Total reviews for this item, if available
  itemVariants: MotionProps['variants'];
}

export function ProductReviewsSection({ reviews, effectiveAccentColor, totalReviewCount, itemVariants }: ProductReviewsSectionProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <motion.div variants={itemVariants} className="mt-12">
        <StoreSection title="آراء العميلات" icon={ReviewIcon} accentColor={effectiveAccentColor}>
          <p className="text-muted-foreground text-center py-4">لا توجد تقييمات لهذا المنتج بعد. كوني أول من يضيف تقييمًا!</p>
        </StoreSection>
      </motion.div>
    );
  }

  return (
    <motion.div variants={itemVariants} className="mt-12">
      <StoreSection title="آراء العميلات" icon={ReviewIcon} accentColor={effectiveAccentColor} className="mb-10">
        <div className="space-y-6">
          {reviews.map(review => (
            <Card key={review.id} className="shadow-lg border-border/30">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border">
                      <AvatarImage src={review.authorAvatar} alt={review.authorName} data-ai-hint={review.dataAiHintAvatar || "avatar customer"} />
                      <AvatarFallback>{review.authorName.substring(0, 1)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{review.authorName}</p>
                      <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                  <RatingStarsDisplay rating={review.rating} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/80 leading-relaxed">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
          {(totalReviewCount && totalReviewCount > reviews.length) && (
            <div className="text-center">
              <Button variant="link" style={{ color: effectiveAccentColor }} className="hover:underline">
                عرض كل التقييمات ({totalReviewCount})
              </Button>
            </div>
          )}
        </div>
      </StoreSection>
    </motion.div>
  );
}
