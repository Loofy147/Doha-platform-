// src/components/icons/icon-provider.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, FunctionComponent } from 'react';
// يتم استيراد 'Icon' و 'addIcon' من مكتبة @iconify-icon/react للتعامل مع الأيقونات
import { Icon } from '@iconify-icon/react'; 
// استيراد addCollection مطلوب لتسجيل مجموعات أيقونات كاملة إذا لم تكن تسجل كل أيقونة على حدة
// لكن في هذا المثال، addIcon كافية. سأبقي addIcon.
import { addIcon as registerIconifyIcon } from '@iconify/react'; // Renaming to avoid conflict if IconifyIcon uses addIcon differently


// استيراد بيانات الأيقونات المطلوبة من حزم أيقونات Iconify المختلفة
// أيقونة academic-cap من heroicons-solid
import academicCapSolid from '@iconify-icons/heroicons-solid/academic-cap';
// أيقونة shopping-cart من heroicons-outline
import shoppingCartOutline from '@iconify-icons/heroicons-outline/shopping-cart';
// أيقونة heart-fill من remixicon (ri-heart-fill)
import heartFill from '@iconify-icons/remixicon/ri-heart-fill';
// أيقونة heart (regular/outline) من phosphor-icons
import heartRegular from '@iconify-icons/phosphor/heart';
// أيقونة disabled من tabler-icons
import disabledTabler from '@iconify-icons/tabler/disabled';

// تسجيل الأيقونات في نظام Iconify لإتاحتها للاستخدام بالاسم
// هذا يسمح باستدعاء الأيقونة باسم مختصر بدلاً من المسار الكامل
// استخدام registerIconifyIcon (alias لـ addIcon من @iconify/react)
registerIconifyIcon('academic-cap', academicCapSolid); // تسجيل أيقونة القبعة الأكاديمية
registerIconifyIcon('cart', shoppingCartOutline); // تسجيل أيقونة سلة التسوق
registerIconifyIcon('heart-fill', heartFill); // تسجيل أيقونة القلب الممتلئة
registerIconifyIcon('heart-regular', heartRegular); // تسجيل أيقونة القلب (الخطوط العريضة)
registerIconifyIcon('disabled', disabledTabler); // تسجيل أيقونة "غير متاح"


// تعريف واجهة (interface) لتحديد شكل كائن الثيم
export interface IconTheme { // Exporting for use in IconSettings
  color: string;
  variant: 'outline' | 'solid' | 'fill';
  size: number;
}

// تعريف واجهة (interface) لتحديد شكل سياق الثيم
export interface IconThemeContextType { // Exporting for use in IconSettings
  theme: IconTheme;
  setTheme: React.Dispatch<React.SetStateAction<IconTheme>>;
}

// إنشاء سياق React للتحكم في ثيم الأيقونات
// يتم توفير قيمة افتراضية أولية للسياق
// Exporting the context directly
export const IconThemeContext = createContext<IconThemeContextType | undefined>(undefined);


// مكوّن IconProvider: يغلف التطبيق أو جزء منه لتوفير الثيم للأيقونات
export function IconProvider({ children }: { children: ReactNode }) {
  // حالة (state) لتخزين إعدادات الثيم الحالية
  const [theme, setTheme] = useState<IconTheme>({
    color: 'hsl(var(--primary))', // اللون الافتراضي للأيقونات (يأخذ القيمة من متغيرات CSS)
    variant: 'outline',   // النمط الافتراضي للأيقونات ('outline', 'solid', 'fill')
    size: 24,             // الحجم الافتراضي للأيقونات بالبكسل
  });

  // توفير الثيم (theme) ودالة تعديله (setTheme) لجميع المكونات الفرعية
  return (
    <IconThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </IconThemeContext.Provider>
  );
}

// Hook مخصص (custom hook) لتسهيل استخدام الأيقونات مع تطبيق الثيم
export function useIcon(name: string): FunctionComponent<any> {
  // الحصول على الثيم الحالي من السياق
  const context = useContext(IconThemeContext);
  // إذا لم يتم العثور على السياق (أي أن useIcon استُخدم خارج IconProvider)، يتم إطلاق خطأ
  if (!context) {
    throw new Error('useIcon must be used within an IconProvider');
  }
  const { theme } = context;

  // منطق لاختيار اسم الأيقونة الصحيح بناءً على `theme.variant` (خاص بأيقونة القلب كمثال)
  let iconName = name;
  if (name === 'heart') {
    if (theme.variant === 'outline') iconName = 'heart-regular'; 
    else if (theme.variant === 'fill' || theme.variant === 'solid') iconName = 'heart-fill'; 
  }
  
  // إرجاع مكوّن وظيفي (functional component) يمثل الأيقونة المطلوبة
  return (props: any) => (
    <Icon
      icon={iconName} 
      width={theme.size} 
      height={theme.size} 
      style={{ color: theme.color, ...props.style }} 
      {...props} 
    />
  );
}
