'use client';

import React from 'react';
import { Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EcoFriendlyTemplatePage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <Leaf size={64} className="mx-auto text-lime-500 mb-6" />
      <h1 className="text-4xl font-bold text-lime-600 mb-4">قالب متجر منتجات صديقة للبيئة</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        هذه الصفحة هي معاينة لقالب "متجر منتجات صديقة للبيئة أو مستدامة".
        سيتم هنا عرض تصميم يعكس الطبيعة والاستدامة لعرض وبيع المنتجات المصنعة بطرق صديقة للبيئة.
      </p>
       <div className="space-x-4 rtl:space-x-reverse">
        <Button variant="outline" asChild>
          <Link href="/platform/templates">العودة لقائمة القوالب</Link>
        </Button>
        <Button className="bg-lime-500 hover:bg-lime-600 text-white">معاينة حية للقالب (قريباً)</Button>
      </div>
    </div>
  );
}
