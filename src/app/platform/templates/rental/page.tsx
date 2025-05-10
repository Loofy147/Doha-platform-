'use client';

import React from 'react';
import { CalendarClock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function RentalTemplatePage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <CalendarClock size={64} className="mx-auto text-blue-500 mb-6" />
      <h1 className="text-4xl font-bold text-blue-600 mb-4">قالب متجر تأجير المنتجات</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        هذه الصفحة هي معاينة لقالب "متجر تأجير المنتجات".
        سيتم هنا عرض تصميم عملي لتأجير فساتين السهرة، تجهيزات الحفلات، وغيرها.
        سيشمل القالب أقسامًا مثل "قائمة المنتجات للإيجار"، "كيفية عملية الإيجار"، و "شروط وأحكام الإيجار".
      </p>
       <div className="space-x-4 rtl:space-x-reverse">
        <Button variant="outline" asChild>
          <Link href="/platform/templates">العودة لقائمة القوالب</Link>
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">معاينة حية للقالب (قريباً)</Button>
      </div>
    </div>
  );
}
