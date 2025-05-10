'use client';

import React from 'react';
import { Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MedicalTemplatePage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <Stethoscope size={64} className="mx-auto text-teal-500 mb-6" />
      <h1 className="text-4xl font-bold text-teal-600 mb-4">قالب طبيبة / أخصائية صحية</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        هذه الصفحة هي معاينة لقالب "طبيبة / أخصائية صحية / مركز علاجي صغير".
        سيتم هنا عرض تصميم موثوق يعكس الرعاية الصحية لعرض التخصصات الطبية وحجز المواعيد.
        سيشمل القالب أقسامًا مثل "خدماتنا الطبية"، "عن الطبيبة/المركز"، و "نصائح صحية".
      </p>
       <div className="space-x-4 rtl:space-x-reverse">
        <Button variant="outline" asChild>
          <Link href="/platform/templates">العودة لقائمة القوالب</Link>
        </Button>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white">معاينة حية للقالب (قريباً)</Button>
      </div>
    </div>
  );
}
