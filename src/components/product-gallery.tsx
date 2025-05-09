
// الخطوة 5: إنشاء مكون React لعرض الصور
// src/components/ProductGallery.tsx

'use client'; // تحديد أن هذا المكون هو مكون عميل

import React from 'react';
import Image from 'next/image'; // استيراد مكون Image من Next.js لتحسين أداء الصور

// مصفوفة الفئات (يجب أن تتطابق مع الفئات المستخدمة في سكربت التحميل)
const categories = ['shoes', 'bags', 'cosmetics'];
// عدد الصور المفترض لكل فئة (يجب أن يتطابق مع per_page في سكربت التحميل)
const imagesPerCategory = 5; 

export default function ProductGallery() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center"> معرض المنتجات </h1>
      {/* المرور على كل فئة لإنشاء قسم خاص بها */}
      {categories.map(cat => (
        <div key={cat} className="mb-12">
          {/* عنوان الفئة */}
          <h2 className="text-2xl font-semibold text-primary mb-4 capitalize border-b-2 border-primary pb-2">{cat}</h2>
          {/* شبكة لعرض صور الفئة */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* إنشاء مصفوفة بعدد الصور المفترض لكل فئة (0 إلى imagesPerCategory - 1) */}
            {Array.from({ length: imagesPerCategory }).map((_, i) => {
              // بناء مسار الصورة المتوقع داخل مجلد public
              // يتم خدمة مجلد public مباشرة من خلال الجذر /
              const imagePath = `/assets/products/${cat}/${cat}-${i + 1}.jpg`;
              return (
                <div key={`${cat}-${i}`} className="aspect-square relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group">
                  {/* استخدام مكون Image من Next.js */}
                  <Image
                    src={imagePath} // المسار العام للصورة
                    alt={`${cat} ${i + 1}`} // نص بديل وصفي للصورة
                    fill // لجعل الصورة تملأ العنصر الحاوي مع الحفاظ على نسبة العرض إلى الارتفاع
                    className="object-cover group-hover:scale-105 transition-transform duration-500" // لتغطية المساحة المتاحة وتأثير عند التحويم
                    // data-ai-hint للتعرف على الصورة بواسطة الذكاء الاصطناعي لاحقًا
                    data-ai-hint={`${cat} product image`} 
                    // معالجة الأخطاء في حال لم يتم العثور على الصورة
                    onError={(e) => {
                        // يمكنك إضافة سلوك بديل هنا، مثل عرض صورة افتراضية
                        // (e.target as HTMLImageElement).src = '/placeholder-image.jpg'; 
                        console.warn(` لم يتم العثور على الصورة: ${imagePath} `);
                        // لإخفاء الصورة المكسورة، يمكنك ضبط العرض على none
                        // (e.target as HTMLImageElement).style.display = 'none';
                      }}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-sm font-semibold capitalize">{`${cat} ${i + 1}`}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// كيفية استخدام هذا المكون:
// 1. تأكد أن سكربت download-products.js قد تم تشغيله وأن الصور موجودة في public/assets/products/{category}/
// 2. قم باستيراد هذا المكون في أي صفحة أو مكون آخر في تطبيق Next.js الخاص بك:
//    import ProductGallery from '@/components/ProductGallery';
// 3. ثم قم بعرضه:
//    <ProductGallery />
