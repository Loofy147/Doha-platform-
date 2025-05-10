// src/components/product-detail/rating-stars-display.tsx
'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsDisplayProps {
  rating: number;
  size?: number;
  className?: string;
  starClassName?: string;
  filledStarClassName?: string;
  emptyStarClassName?: string;
}

export function RatingStarsDisplay({
  rating,
  size = 16,
  className,
  starClassName,
  filledStarClassName = "text-yellow-400 fill-yellow-400",
  emptyStarClassName = "text-gray-300",
}: RatingStarsDisplayProps) {
  return (
    <div className={cn("flex", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={cn(
            "transition-colors",
            starClassName,
            i < Math.round(rating) ? filledStarClassName : emptyStarClassName
          )}
        />
      ))}
    </div>
  );
}
