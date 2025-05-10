'use client';

import React from 'react';
import { ShoppingBasket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CraftSuppliesTemplatePage() {
  return (
    <div className="container mx-auto p-8 text-center">
      <ShoppingBasket size={64} className="mx-auto text-stone-500 mb-6" />
      <h1 className="text-4xl font-bold text-stone-600 mb-4">قالب متجر أدوات ومستلزمات حرفية</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
        هذه الصفحة هي معاينة لقالب "متجر أدوات ومستلزمات حرفية".
        سيتم هنا عرض تصميم منظم لبيع الخامات والأدوات اللازمة لممارسة حرف يدوية معينة (خياطة، تطريز، رسم).
      </p>
       <div className="space-x-4 rtl:space-x-reverse">
        <Button variant="outline" asChild>
          <Link href="/platform/templates">العودة لقائمة القوالب</Link>
        </Button>
        <Button className="bg-stone-500 hover:bg-stone-600 text-white">معاينة حية للقالب (قريباً)</Button>
      </div>
    </div>
  );
}
