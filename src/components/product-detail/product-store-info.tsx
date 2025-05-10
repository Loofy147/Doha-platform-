// src/components/product-detail/product-store-info.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Store as StoreIcon, Truck, ShieldCheck, MessageSquare, Eye } from 'lucide-react';
import type { StoreData } from '@/lib/data/mock-store-data';
import { motion, type MotionProps } from 'framer-motion';

interface ProductStoreInfoProps {
  storeData: StoreData;
  effectiveAccentColor: string;
  itemVariants: MotionProps['variants'];
}

export function ProductStoreInfo({ storeData, effectiveAccentColor, itemVariants }: ProductStoreInfoProps) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="shadow-md border-secondary/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2" style={{ color: effectiveAccentColor }}>
            <StoreIcon size={20} /> معلومات المتجر والشحن
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-foreground/80">
          <Button variant="outline" size="sm" className="w-full mb-2 hover:bg-primary/10" style={{ borderColor: effectiveAccentColor, color: effectiveAccentColor }} asChild>
            <Link href={`/store/${storeData.id}`}> <Eye size={16} className="ml-2" /> زيارة متجر {storeData.name} </Link>
          </Button>
          {storeData.policies?.shippingPolicy && (
            <div className="flex items-start gap-2">
              <Truck size={16} className="mt-0.5 text-blue-500 flex-shrink-0" />
              <p><span className="font-medium">سياسة الشحن:</span> {storeData.policies.shippingPolicy.substring(0, 100)}{storeData.policies.shippingPolicy.length > 100 ? '...' : ''}</p>
            </div>
          )}
          {storeData.policies?.returnPolicy && (
            <div className="flex items-start gap-2">
              <ShieldCheck size={16} className="mt-0.5 text-green-500 flex-shrink-0" />
              <p><span className="font-medium">سياسة الإرجاع:</span> {storeData.policies.returnPolicy.substring(0, 100)}{storeData.policies.returnPolicy.length > 100 ? '...' : ''}</p>
            </div>
          )}
          {storeData.contact.email && (
            <div className="flex items-start gap-2">
              <MessageSquare size={16} className="mt-0.5 text-purple-500 flex-shrink-0" />
              <p><span className="font-medium">للتواصل:</span> {storeData.contact.email}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
