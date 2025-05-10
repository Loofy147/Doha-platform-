'use client';

import React from 'react';
import { Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FitnessCoachTemplatePage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <Dumbbell size={64} className="mx-auto text-amber-600 mb-6" />
      <h1 className="text-4xl font-bold text-amber-700 mb-4">قالب مدربة رياضية / أخصائية لياقة</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        هذه الصفحة هي معاينة لقالب "مدربة رياضية شخصية / أخصائية لياقة".
        سيتم هنا عرض تصميم ديناميكي لتقديم برامج تدريب شخصية وجماعية أونلاين أو حضوريًا.
      </p>
       <div className="space-x-4 rtl:space-x-reverse">
        <Button variant="outline" asChild>
          <Link href="/platform/templates">العودة لقائمة القوالب</Link>
        </Button>
        <Button className="bg-amber-600 hover:bg-amber-700 text-white">معاينة حية للقالب (قريباً)</Button>
      </div>
    </div>
  );
}
