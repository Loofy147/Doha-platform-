'use client';

import React from 'react';
import { Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LegalTemplatePage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <Scale size={64} className="mx-auto text-gray-600 mb-6" />
      <h1 className="text-4xl font-bold text-gray-700 mb-4">قالب محامية / مستشارة قانونية</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        هذه الصفحة هي معاينة لقالب "محامية / مستشارة قانونية".
        سيتم هنا عرض تصميم احترافي وموثوق لعرض الخدمات القانونية وتقديم الاستشارات.
        سيشمل القالب أقسامًا مثل "مجالات الخبرة"، "خدمات المكتب"، و "مقالات وتوعية قانونية".
      </p>
       <div className="space-x-4 rtl:space-x-reverse">
        <Button variant="outline" asChild>
          <Link href="/platform/templates">العودة لقائمة القوالب</Link>
        </Button>
        <Button className="bg-gray-600 hover:bg-gray-700 text-white">معاينة حية للقالب (قريباً)</Button>
      </div>
    </div>
  );
}
