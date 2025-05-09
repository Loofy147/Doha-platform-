
// src/app/gallery/page.tsx
import ProductGallery from '@/components/product-gallery';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'معرض المنتجات | لمسة ضحى',
  description: 'تصفح معرض صور المنتجات المتوفرة على منصة لمسة ضحى.',
};

export default function GalleryPage() {
  return (
    <div>
      <ProductGallery />
    </div>
  );
}
