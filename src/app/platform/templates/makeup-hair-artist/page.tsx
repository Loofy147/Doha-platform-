'use client';

import React from 'react';
import { Paintbrush } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MakeupHairArtistTemplatePage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <Paintbrush size={64} className="mx-auto text-fuchsia-500 mb-6" />
      <h1 className="text-4xl font-bold text-fuchsia-600 mb-4">قالب فنانة مكياج وشعر للمناسبات</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        هذه الصفحة هي معاينة لقالب "فنانة مكياج وشعر للمناسبات".
        سيتم هنا عرض تصميم يركز على حجز خدمات المكياج وتسريحات الشعر للمناسبات الخاصة.
      </p>
       <div className="space-x-4 rtl:space-x-reverse">
        <Button variant="outline" asChild>
          <Link href="/platform/templates">العودة لقائمة القوالب</Link>
        </Button>
        <Button className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white">معاينة حية للقالب (قريباً)</Button>
      </div>
    </div>
  );
}
