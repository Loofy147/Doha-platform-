// src/components/icons/icon-settings.tsx
'use client';

import React, { useContext } from 'react';
// استيراد سياق IconThemeContext مباشرة للوصول إلى theme و setTheme
// نفترض أن IconThemeContext تم تصديره من icon-provider.tsx
// إذا لم يكن كذلك، يجب تعديل IconProvider لتصديره أو استخدام هوك مخصص إذا كان `theme` و `setTheme` يتم تمريرهما بشكل مختلف.
// للتأكد، سأفترض أن IconThemeContext مُصدَّر. إذا كان الوصول عبر هوك useTheme() مثلاً، يجب استبدال useContext(IconThemeContext).
// بما أن icon-provider.tsx لا يُصدِّر IconThemeContext مباشرة، سنحتاج لتعديله أو إنشاء هوك.
// سأقوم بتعديل icon-provider.tsx لتصدير السياق.

// تعديل: سنفترض أن icon-provider.tsx يُصدر IconThemeContext.
// إذا كان IconProvider يُمرر theme و setTheme كـ props، فإن هذا المكون سيحتاج لتلقيها كـ props.
// الطريقة المثالية هي استخدام useContext مع سياق مُصدَّر.

// لنفترض أن IconProvider.tsx تم تعديله ليُصدِّر IconThemeContext
// import { IconThemeContext } from './icon-provider'; 
// تعديل: بما اننا لم نصدر السياق، سنستخدم طريقة أخرى لربط هذا المكون.
// هذا المكون يحتاج لأن يكون ابنًا لـ IconProvider وأن يتلقى theme و setTheme كـ props
// أو أن يتم تعديل IconProvider ليُصدِّر السياق.

// الحل الأبسط الآن هو أن IconSettings سيتلقى theme و setTheme كـ props.
// أو، كحل أفضل، نعدل IconProvider لتصدير السياق.

// --- إعادة كتابة بافتراض أن IconProvider.tsx يُصدِّر السياق ---

// في icon-provider.tsx، تأكد من تصدير السياق:
// export const IconThemeContext = createContext<IconThemeContextType | undefined>(undefined);

// ثم في هذا الملف:
import { IconThemeContext } from './icon-provider'; // تأكد من صحة المسار
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


export default function IconSettings() {
  // استخدام useContext للوصول إلى الثيم ودالة تعديله من IconProvider
  const context = useContext(IconThemeContext);

  // التحقق من أن السياق متوفر (أي أن المكون ضمن IconProvider)
  if (!context) {
    // يمكنك عرض رسالة خطأ أو مكون احتياطي إذا لم يكن السياق متوفرًا
    return <p className="text-destructive">يجب استخدام IconSettings داخل IconProvider.</p>;
  }
  const { theme, setTheme } = context;

  // عرض واجهة المستخدم لتعديل إعدادات الثيم
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-primary">إعدادات مظهر الأيقونات</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-2">
          <Label htmlFor="iconColor" className="text-sm font-medium text-foreground">اللون الرئيسي للأيقونات:</Label>
          <div className="flex items-center gap-2">
            <Input
              id="iconColor"
              type="color"
              value={theme.color.startsWith('hsl') ? theme.color : '#FF69B4'} // يعمل input type=color بشكل أفضل مع hex
              onChange={e => setTheme({ ...theme, color: e.target.value })}
              className="w-16 h-10 p-1"
            />
            <Input
              type="text"
              value={theme.color}
              onChange={e => setTheme({ ...theme, color: e.target.value })}
              placeholder="مثال: #FF69B4 أو hsl(var(--primary))"
              className="flex-1"
            />
          </div>
           <p className="text-xs text-muted-foreground">يمكنك استخدام قيم HSL من ثيم الموقع مثل 'hsl(var(--primary))' أو أكواد HEX.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="iconVariant" className="text-sm font-medium text-foreground">نمط الأيقونات:</Label>
          <Select
            value={theme.variant}
            onValueChange={(value: 'outline' | 'solid' | 'fill') => setTheme({ ...theme, variant: value })}
          >
            <SelectTrigger id="iconVariant">
              <SelectValue placeholder="اختاري نمط الأيقونة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="outline">خطوط (Outline)</SelectItem>
              <SelectItem value="solid">ممتلئ (Solid)</SelectItem>
              <SelectItem value="fill">ملون (Fill)</SelectItem>
            </SelectContent>
          </Select>
           <p className="text-xs text-muted-foreground">بعض الأيقونات قد لا تدعم كل الأنماط. نمط القلب هو مثال يتغير.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="iconSize" className="text-sm font-medium text-foreground">حجم الأيقونات (بالبكسل):</Label>
          <div className="flex items-center gap-2">
            <Input
              id="iconSize"
              type="number"
              min="12" max="64" step="1"
              value={theme.size}
              onChange={e => setTheme({ ...theme, size: parseInt(e.target.value, 10) || 24 })}
              className="w-24"
            />
            <span className="text-sm text-muted-foreground">بكسل</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
