// src/components/icons/icon-usage-example.tsx
'use client';

import React from 'react';
// استيراد الأيقونات المطلوبة من مكتبة lucide-react
import { Home, UserCheck } from 'lucide-react';

/**
 * IconUsageExample component
 * 
 * هذا المكون يوضح كيفية استخدام أيقونات lucide-react
 * مع أحجام وألوان مخصصة.
 */
export function IconUsageExample() {
  return (
    <div className="p-8 bg-card rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-primary mb-6">مثال على استخدام الأيقونات</h2>
      
      <div className="space-y-4">
        <div>
          <p className="text-foreground mb-2">أيقونة "الرئيسية" بحجم ولون افتراضي:</p>
          {/* عرض أيقونة Home بالحجم واللون الافتراضي */}
          <Home /> 
        </div>

        <div>
          <p className="text-foreground mb-2">أيقونة "الرئيسية" بحجم 32 بكسل ولون مخصص (وردي):</p>
          {/* عرض أيقونة Home بحجم 32 ولون وردي مخصص */}
          <Home size={32} className="text-accent-pink" />
        </div>

        <div>
          <p className="text-foreground mb-2">أيقونة "الرئيسية" بحجم 48 بكسل ولون مخصص (أصفر):</p>
          {/*  عرض أيقونة Home بحجم 48 ولون أصفر مخصص */}
          <Home size={48} style={{ color: 'hsl(var(--accent-yellow))' }} />
        </div>
        
        <hr className="my-6 border-border" />

        <div>
          <p className="text-foreground mb-2">أيقونة "تدقيق المستخدم" بحجم ولون افتراضي:</p>
          {/*  عرض أيقونة UserCheck بالحجم واللون الافتراضي */}
          <UserCheck />
        </div>

        <div>
          <p className="text-foreground mb-2">أيقونة "تدقيق المستخدم" بحجم 32 بكسل ولون مخصص (بنفسجي):</p>
          {/*  عرض أيقونة UserCheck بحجم 32 ولون بنفسجي مخصص */}
          <UserCheck size={32} className="text-accent-purple" />
        </div>

        <div>
          <p className="text-foreground mb-2">أيقونة "تدقيق المستخدم" بحجم 48 بكسل ولون مخصص (أخضر):</p>
          {/*  عرض أيقونة UserCheck بحجم 48 ولون أخضر مخصص */}
          <UserCheck size={48} style={{ color: 'hsl(145 63% 49%)' }} />
        </div>
      </div>

      <div className="mt-8 text-sm text-muted-foreground">
        <p>
          لإضافة الأيقونات، يمكنك استخدام الأمر التالي (إذا لم تكن مثبتة بالفعل):
        </p>
        <pre className="mt-2 p-2 bg-muted rounded-md text-xs">
          <code>npm install lucide-react</code>
          <br />
          <code>yarn add lucide-react</code>
        </pre>
        <p className="mt-4">
          يمكنك استيراد أي أيقونة من مكتبة 
          <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"> Lucide Icons </a>
          واستخدامها كمكون React.
          الخصائص <code>size</code> و <code>className</code> (لألوان Tailwind) أو <code>style</code> (لألوان مخصصة) تسمح بتعديل مظهر الأيقونة.
        </p>
      </div>
    </div>
  );
}
