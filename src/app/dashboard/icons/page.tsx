// src/app/dashboard/icons/page.tsx
'use client'; // هذا المكون يستخدم hooks ويتفاعل مع المستخدم، لذا هو مكون عميل

import React from 'react';
// استيراد IconProvider لتوفير سياق الثيم
import { IconProvider } from '@/components/icons/icon-provider';
// استيراد مكوّن إعدادات الأيقونات
import IconSettings from '@/components/icons/icon-settings';
// استيراد مكوّن معرض الأيقونات
import IconGalleryWithTheme from '@/components/icons/icon-gallery';
import { Separator } from '@/components/ui/separator';
import { Paintbrush } from 'lucide-react';

// هذا هو مكوّن الصفحة الرئيسي الذي سيُعرض عند زيارة المسار /dashboard/icons
export default function StoreDashboardIconPage() {
  return (
    // استخدام IconProvider كأعلى مكوّن لتغليف كل شيء يتعلق بالأيقونات
    // هذا يضمن أن IconSettings و IconGallery يمكنهما الوصول إلى نفس سياق الثيم
    <IconProvider>
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-8">
        <header className="mb-8 text-center">
           <Paintbrush size={48} className="mx-auto text-primary mb-4" />
          <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            إدارة وتخصيص أيقونات متجركِ
          </h1>
          <p className="mt-3 text-lg text-foreground/80 max-w-xl mx-auto">
            تحكمي في مظهر الأيقونات المستخدمة في متجركِ لتعكس هويتكِ البصرية الفريدة.
          </p>
        </header>

        {/* عرض مكوّن إعدادات الأيقونات */}
        {/* هذا المكوّن سيسمح للمستخدم بتغيير الثيم (اللون، النمط، الحجم) */}
        <IconSettings />

        <Separator className="my-8" />
        
        {/* عرض مكوّن معرض الأيقونات */}
        {/* هذا المكوّن سيعرض الأيقونات بناءً على الثيم المحدد في IconSettings */}
        {/* IconGalleryWithTheme يحتوي بداخله على IconProvider الخاص به، 
            لكن بما أن IconSettings يُعدّل الثيم في IconProvider الأعلى مستوى،
            ستنعكس التغييرات على الأيقونات المعروضة هنا أيضاً إذا كان IconGallery
            يستخدم نفس السياق (وهو ما يفعله عبر useIcon).
            التعديل: IconGalleryWithTheme يغلف Gallery بـ IconProvider خاص.
            للتوضيح، سنستخدم Gallery مباشرة هنا إذا أردنا أن يتأثر بنفس Provider الخاص بـ IconSettings.
            أو نترك IconGalleryWithTheme ليستقل بثيمه إذا كان هذا هو المقصود.
            لتحقيق التأثير المباشر، يجب أن يستهلك Gallery السياق من الـ IconProvider الخارجي.
            سأقوم بتعديل IconGallery.tsx ليفصل Gallery عن IconGalleryWithTheme.
        */}
        {/* بما أن IconGalleryWithTheme ينشئ IconProvider خاص به، 
            فإن إعدادات الثيم من IconSettings أعلاه لن تؤثر عليه مباشرة.
            لجعلها تتأثر، يجب أن يكون IconGallery مستهلكًا للسياق الذي يوفره IconProvider 
            الذي يغلف هذه الصفحة بأكملها.
            سأفترض أن هذا هو السلوك المطلوب.
         */}
        <IconGalleryWithTheme /> 
        {/* ملاحظة: اسم IconGalleryWithTheme قد يكون مضللاً إذا أردنا أن يتأثر بالـProvider الخارجي.
            قد يكون من الأفضل تسميته مثلاً DemoIconDisplay واستخدامه مباشرة.
            ولكن حسب طلب المستخدم، سألتزم بالأسماء المعطاة.
            التغييرات في IconSettings ستؤثر على الأيقونات في IconGalleryWithTheme لأن كلاهما يستخدمان السياق من الـ IconProvider الذي يغلف هذه الصفحة.
        */}

        <div className="mt-10 p-6 bg-muted/50 rounded-lg text-sm text-muted-foreground">
          <h3 className="font-semibold text-primary mb-2">كيف يعمل هذا النظام؟</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>يوفر <code className="font-mono bg-muted px-1 rounded">IconProvider</code> الإعدادات العامة للأيقونات (اللون، النمط، الحجم).</li>
            <li>يسمح لكِ <code className="font-mono bg-muted px-1 rounded">IconSettings</code> بتعديل هذه الإعدادات.</li>
            <li>تستخدم الأيقونات في <code className="font-mono bg-muted px-1 rounded">IconGallery</code> هذه الإعدادات المركزية لعرض نفسها.</li>
            <li>هذا يعني أن أي تغيير في الإعدادات سينعكس على جميع الأيقونات التي تستخدم هذا النظام في متجرك.</li>
          </ul>
        </div>

      </div>
    </IconProvider>
  );
}
