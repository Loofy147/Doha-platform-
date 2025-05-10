'use client';

import React from 'react';
import { Users2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FamilyConsultingTemplatePage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <Users2 size={64} className="mx-auto text-cyan-500 mb-6" />
      <h1 className="text-4xl font-bold text-cyan-600 mb-4">قالب مستشارة علاقات أسرية وتربية</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        هذه الصفحة هي معاينة لقالب "مستشارة العلاقات الأسرية والتربية".
        سيتم هنا عرض تصميم داعم وهادئ لتقديم استشارات وجلسات دعم للأفراد والأسر.
      </p>
       <div className="space-x-4 rtl:space-x-reverse">
        <Button variant="outline" asChild>
          <Link href="/platform/templates">العودة لقائمة القوالب</Link>
        </Button>
        <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">معاينة حية للقالب (قريباً)</Button>
      </div>
    </div>
  );
}
