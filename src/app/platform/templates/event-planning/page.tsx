'use client';

import React from 'react';
import { PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EventPlanningTemplatePage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <PartyPopper size={64} className="mx-auto text-rose-500 mb-6" />
      <h1 className="text-4xl font-bold text-rose-600 mb-4">قالب مخططة مناسبات وحفلات</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        هذه الصفحة هي معاينة لقالب "مخططة مناسبات وحفلات".
        سيتم هنا عرض تصميم ساحر لتقديم خدمات تخطيط وتنظيم الأفراح والمناسبات الخاصة.
        سيشمل القالب أقسامًا مثل "خدماتنا"، "معرض صور أعمال سابقة"، و "باقات تنظيم المناسبات".
      </p>
       <div className="space-x-4 rtl:space-x-reverse">
        <Button variant="outline" asChild>
          <Link href="/platform/templates">العودة لقائمة القوالب</Link>
        </Button>
        <Button className="bg-rose-500 hover:bg-rose-600 text-white">معاينة حية للقالب (قريباً)</Button>
      </div>
    </div>
  );
}
