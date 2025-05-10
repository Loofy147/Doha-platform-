'use client';

import React from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function StylingTemplatePage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <Wand2 size={64} className="mx-auto text-orange-500 mb-6" />
      <h1 className="text-4xl font-bold text-orange-600 mb-4">قالب مستشارة تسوق وتنسيق أزياء</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        هذه الصفحة هي معاينة لقالب "مستشارة التسوق الشخصي وتنسيق الأزياء".
        سيتم هنا عرض تصميم أنيق لتقديم خدمات تنسيق الملابس وبناء خزانة ملابس متكاملة.
        سيشمل القالب أقسامًا مثل "خدماتي"، "قصص نجاح العميلات"، و "نصائح تنسيقية".
      </p>
       <div className="space-x-4 rtl:space-x-reverse">
        <Button variant="outline" asChild>
          <Link href="/platform/templates">العودة لقائمة القوالب</Link>
        </Button>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">معاينة حية للقالب (قريباً)</Button>
      </div>
    </div>
  );
}
