
// الخطوة 1: تثبيت مكتبة Pexels (يتم عبر npm/yarn كما هو مذكور في package.json)
// npm install pexels --save
// أو
// yarn add pexels

// تحميل مكتبة Pexels للتعامل مع API
const { createClient } = require('pexels');
// تحميل مكتبة fs للتعامل مع نظام الملفات
const fs = require('fs');
// تحميل مكتبة path للتعامل مع مسارات الملفات
const path = require('path');
// تحميل متغيرات البيئة من ملف .env (مهم جداً لأمان مفتاح API)
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


// التحقق من وجود مفتاح PEXELS_API_KEY
if (!process.env.PEXELS_API_KEY || process.env.PEXELS_API_KEY === "YOUR_PEXELS_API_KEY_HERE") {
  console.error(" خطأ: متغير البيئة PEXELS_API_KEY غير معرف أو لم يتم تعيينه. يرجى إنشاء ملف .env في جذر المشروع وإضافة PEXELS_API_KEY=\"مفتاحك_هنا\" ");
  process.exit(1); // إنهاء السكربت إذا لم يتم العثور على المفتاح
}

// إنشاء عميل Pexels باستخدام مفتاح API من متغيرات البيئة
const client = createClient(process.env.PEXELS_API_KEY);

// مصفوفة فئات المنتجات المراد تحميل صور لها
const categories = ['shoes', 'bags', 'cosmetics'];
// عدد الصور المطلوبة لكل فئة
const imagesPerCategory = 5;

// دالة رئيسية غير متزامنة لتنفيذ عمليات التحميل
(async () => {
  console.log(' بدء عملية تحميل صور المنتجات... ');
  try {
    // المرور على كل فئة في مصفوفة الفئات
    for (const cat of categories) {
      console.log(` جاري معالجة الفئة: ${cat} `);
      // تحديد مسار المجلد الخاص بالفئة داخل public/assets/products
      // Next.js يخدم الملفات الثابتة من مجلد 'public'
      const dir = path.join(__dirname, '../public/assets/products/', cat);
      
      // إنشاء المجلد إذا لم يكن موجودًا بالفعل (recursive: true لإنشاء المجلدات الأصلية إذا لزم الأمر)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(` تم إنشاء المجلد: ${dir} `);
      } else {
        console.log(` المجلد ${dir} موجود بالفعل. `);
      }

      // البحث عن صور في Pexels للفئة الحالية
      console.log(` جاري البحث عن صور لـ "${cat}" في Pexels... `);
      const response = await client.photos.search({ query: cat, per_page: imagesPerCategory });

      // التحقق من وجود صور في الاستجابة
      if (response.photos && response.photos.length > 0) {
        console.log(` تم العثور على ${response.photos.length} صور للفئة ${cat}. جاري تحميلها... `);
        // المرور على الصور التي تم العثور عليها
        for (let i = 0; i < response.photos.length; i++) {
          const photo = response.photos[i];
          // استخدام الرابط الخاص بالصورة الكبيرة (يمكن اختيار أحجام أخرى مثل medium, original)
          const imageUrl = photo.src.large;
          // تحديد اسم ومسار الملف للصورة المحملة
          const filename = path.join(dir, `${cat}-${i + 1}.jpg`);

          try {
            // جلب بيانات الصورة من الرابط
            console.log(` جاري تحميل الصورة: ${imageUrl} `);
            const imageResponse = await fetch(imageUrl);
            // التأكد من أن الاستجابة ناجحة
            if (!imageResponse.ok) {
              console.error(` خطأ في تحميل الصورة ${imageUrl}: ${imageResponse.statusText} `);
              continue; // الانتقال إلى الصورة التالية في حال حدوث خطأ
            }
            // تحويل بيانات الصورة إلى ArrayBuffer
            const arrayBuffer = await imageResponse.arrayBuffer();
            // كتابة بيانات الصورة في الملف المحدد
            fs.writeFileSync(filename, Buffer.from(arrayBuffer));
            console.log(` ✅ تم تحميل وحفظ الصورة: ${filename} `);
          } catch (fetchError) {
            console.error(` خطأ أثناء جلب أو حفظ الصورة ${filename}: `, fetchError);
          }
        }
      } else {
        console.warn(` ⚠️ لم يتم العثور على صور للفئة: ${cat} `);
      }
      console.log(`----- انتهت معالجة الفئة: ${cat} -----`);
    }
    console.log(' 🎉 انتهت عملية تحميل جميع صور المنتجات بنجاح! ');
  } catch (error) {
    // معالجة الأخطاء العامة التي قد تحدث أثناء تنفيذ السكربت
    console.error(" ❌ حدث خطأ عام أثناء عملية تحميل الصور: ", error);
    if (error.message && error.message.includes('401')) {
      console.error(" قد يكون مفتاح PEXELS API غير صالح أو انتهت صلاحيته. يرجى التحقق منه في ملف .env. ");
    }
  }
})();

// لتشغيل هذا السكربت:
// 1. تأكد من تثبيت pexels و dotenv: npm install pexels dotenv أو yarn add pexels dotenv
// 2. أنشئ ملف .env في جذر المشروع وأضف PEXELS_API_KEY="YOUR_ACTUAL_API_KEY"
// 3. قم بتشغيل السكربت باستخدام: node scripts/download-products.js
// أو عبر السكربت المضاف في package.json: npm run download:products
