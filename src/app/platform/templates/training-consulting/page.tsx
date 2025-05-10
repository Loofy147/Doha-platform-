'use client';

import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TrainingConsultingTemplatePage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <GraduationCap size={64} className="mx-auto text-indigo-500 mb-6" />
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">قالب خدمات التدريب والاستشارات</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        هذه الصفحة هي معاينة لقالب "خدمات التدريب والاستشارات / المهنيات المستقلات".
        سيتم هنا عرض تصميم احترافي للمدربات والمستشارات لتقديم دوراتهن وجلساتهن.
        سيشمل القالب أقسامًا مثل "عني / نبذة عن المستشارة"، "خدماتي"، و "قصص نجاح العميلات".
      </p>
       <div className="space-x-4 rtl:space-x-reverse">
        <Button variant="outline" asChild>
          <Link href="/platform/templates">العودة لقائمة القوالب</Link>
        </Button>
        <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">معاينة حية للقالب (قريباً)</Button>
      </div>
    </div>
  );
}
