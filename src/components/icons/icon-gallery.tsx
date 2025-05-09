// src/components/icons/icon-gallery.tsx
'use client';

import React from 'react';
// استيراد IconProvider و useIcon من ملف icon-provider.tsx
import { IconProvider, useIcon } from './icon-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// مكوّن Gallery: يعرض مجموعة من الأيقونات باستخدام هوك useIcon
function Gallery() {
  // استخدام هوك useIcon للحصول على مكونات أيقونات مطبّق عليها الثيم
  const HeartIcon = useIcon('heart'); // أيقونة القلب (ستتغير بناءً على theme.variant)
  const CartIcon  = useIcon('cart');  // أيقونة سلة التسوق
  const CapIcon   = useIcon('academic-cap'); // أيقونة القبعة الأكاديمية
  const OffIcon   = useIcon('disabled'); // أيقونة "غير متاح"

  // عرض الأيقونات في شبكة (grid) مع تسميات توضيحية
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-primary">معرض الأيقونات الموحدة</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          هذه الأيقونات تستخدم نظام الثيمات المركزي. جربي تغيير الإعدادات لرؤية التغييرات الفورية!
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { IconComponent: CapIcon, label: 'تعليمي' },
            { IconComponent: CartIcon, label: 'سلّة' },
            { IconComponent: HeartIcon, label: 'مفضل' },
            { IconComponent: OffIcon, label: 'غير متاح' },
          ].map(({ IconComponent, label }) => (
            <div key={label} className="flex flex-col items-center p-4 border rounded-md bg-card hover:shadow-md transition-shadow">
              {/* عرض الأيقونة */}
              <IconComponent className="mb-2" /> 
              {/* تسمية توضيحية للأيقونة */}
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// مكوّن IconGalleryWithTheme: يغلف Gallery بـ IconProvider
// هذا يضمن أن Gallery وجميع الأيقونات بداخله يمكنها الوصول إلى الثيم
export default function IconGalleryWithTheme() {
  return (
    // توفير IconProvider للمكونات الفرعية
    <IconProvider>
      {/* 
        هنا يمكن إضافة واجهة لتغيير الثيم (مثل مكوّن IconSettings).
        بما أن IconSettings سيعدّل الثيم في IconProvider،
        فإن Gallery سيعيد الرسم تلقائيًا بالأيقونات المحدثة.
      */}
      <Gallery /> {/* عرض مكوّن Gallery الذي يحتوي على الأيقونات */}
    </IconProvider>
  );
}
