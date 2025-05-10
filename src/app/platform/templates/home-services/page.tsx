'use client';

import React from 'react';
import { Home as HomeIcon } from 'lucide-react'; // Alias Home to avoid conflicts
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomeServicesTemplatePage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <HomeIcon size={64} className="mx-auto text-green-500 mb-6" />
      <h1 className="text-4xl font-bold text-green-600 mb-4">قالب خدمات منزلية متخصصة</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        هذه الصفحة هي معاينة لقالب "خدمات عاملة أو منظفة منزل / خدمات منزلية متخصصة".
        سيتم هنا عرض تصميم واضح لتقديم خدمات التنظيف، الترتيب، الطبخ، أو الرعاية المنزلية.
        سيشمل القالب أقسامًا مثل "خدماتنا"، "باقات الخدمة"، و "مناطق التغطية".
      </p>
       <div className="space-x-4 rtl:space-x-reverse">
        <Button variant="outline" asChild>
          <Link href="/platform/templates">العودة لقائمة القوالب</Link>
        </Button>
        <Button className="bg-green-500 hover:bg-green-600 text-white">معاينة حية للقالب (قريباً)</Button>
      </div>
    </div>
  );
}
