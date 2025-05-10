'use client';

import React from 'react';
import { CakeSlice } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BakeryTemplatePage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <CakeSlice size={64} className="mx-auto text-yellow-500 mb-6" />
      <h1 className="text-4xl font-bold text-yellow-600 mb-4">قالب متجر الحلويات والمخبوزات</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        هذه الصفحة هي معاينة لقالب "متجر الحلويات والمخبوزات والأطعمة المنزلية".
        سيتم هنا عرض تصميم شهي لعرض الكيك، المعجنات، والحلويات المتنوعة.
        سيشمل القالب أقسامًا مثل "قائمة الطعام"، "عروض المناسبات"، و "اطلب كيك مخصص".
      </p>
       <div className="space-x-4 rtl:space-x-reverse">
        <Button variant="outline" asChild>
          <Link href="/platform/templates">العودة لقائمة القوالب</Link>
        </Button>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">معاينة حية للقالب (قريباً)</Button>
      </div>
    </div>
  );
}
