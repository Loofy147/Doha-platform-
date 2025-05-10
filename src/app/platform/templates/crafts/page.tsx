'use client';

import React from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CraftsTemplatePage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <Palette size={64} className="mx-auto text-purple-500 mb-6" />
      <h1 className="text-4xl font-bold text-purple-600 mb-4">قالب متجر الحرف اليدوية والفنون</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        هذه الصفحة هي معاينة لقالب "متجر الحرف اليدوية والفنون والتصميمات".
        سيتم هنا عرض تصميم إبداعي يبرز جمال المنتجات المصنوعة يدويًا والقطع الفنية.
        سيشمل القالب أقسامًا مثل "معرض الأعمال"، "قصة الفنانة"، و "ورش العمل".
      </p>
       <div className="space-x-4 rtl:space-x-reverse">
        <Button variant="outline" asChild>
          <Link href="/platform/templates">العودة لقائمة القوالب</Link>
        </Button>
        <Button className="bg-purple-500 hover:bg-purple-600 text-white">معاينة حية للقالب (قريباً)</Button>
      </div>
    </div>
  );
}
