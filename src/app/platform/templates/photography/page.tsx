'use client';

import React from 'react';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PhotographyTemplatePage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <Camera size={64} className="mx-auto text-sky-500 mb-6" />
      <h1 className="text-4xl font-bold text-sky-600 mb-4">قالب خدمات التصوير الفوتوغرافي</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        هذه الصفحة هي معاينة لقالب "خدمات التصوير الفوتوغرافي النسائي".
        سيتم هنا عرض تصميم يركز على عرض محفظة الأعمال لجلسات التصوير الشخصية، العائلية، أو للمنتجات.
      </p>
       <div className="space-x-4 rtl:space-x-reverse">
        <Button variant="outline" asChild>
          <Link href="/platform/templates">العودة لقائمة القوالب</Link>
        </Button>
        <Button className="bg-sky-500 hover:bg-sky-600 text-white">معاينة حية للقالب (قريباً)</Button>
      </div>
    </div>
  );
}
