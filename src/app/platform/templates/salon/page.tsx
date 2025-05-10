'use client';

import React from 'react';
import { Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SalonTemplatePage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <Scissors size={64} className="mx-auto text-red-500 mb-6" />
      <h1 className="text-4xl font-bold text-red-600 mb-4">قالب صالون التجميل والخدمات الشخصية</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        هذه الصفحة هي معاينة لقالب "صالون التجميل والخدمات الشخصية".
        سيتم هنا عرض تصميم أنيق لتقديم خدمات العناية بالشعر، البشرة، والمكياج، مع نظام حجز مواعيد متكامل.
        سيشمل القالب أقسامًا مثل "قائمة الخدمات"، "فريق العمل"، و "معرض صور قبل وبعد".
      </p>
       <div className="space-x-4 rtl:space-x-reverse">
        <Button variant="outline" asChild>
          <Link href="/platform/templates">العودة لقائمة القوالب</Link>
        </Button>
        <Button className="bg-red-500 hover:bg-red-600 text-white">معاينة حية للقالب (قريباً)</Button>
      </div>
    </div>
  );
}
