'use client';

import React from 'react';
import { Shirt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FashionTemplatePage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <Shirt size={64} className="mx-auto text-pink-500 mb-6" />
      <h1 className="text-4xl font-bold text-pink-600 mb-4">قالب متجر الأزياء والملابس</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        هذه الصفحة هي معاينة لقالب "متجر الأزياء والملابس والإكسسوارات".
        سيتم هنا عرض تصميم جذاب لعرض تشكيلات الملابس، العبايات، الفساتين، والإكسسوارات المتنوعة.
        سيشمل القالب أقسامًا مثل "أحدث التشكيلات"، "منتجات مميزة"، "دليل المقاسات"، و "نصائح الموضة".
      </p>
      <div className="space-x-4 rtl:space-x-reverse">
        <Button variant="outline" asChild>
          <Link href="/platform/templates">العودة لقائمة القوالب</Link>
        </Button>
        <Button className="bg-pink-500 hover:bg-pink-600 text-white">معاينة حية للقالب (قريباً)</Button>
      </div>
    </div>
  );
}
