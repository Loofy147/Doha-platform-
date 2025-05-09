
<template>
  <div>
    <!-- عرض أيقونة academic-cap بحجم محدد (32x32) وعرض خط (stroke-width) بمقدار 2 -->
    <component :is="AcademicIcon" :stroke-width="2" :width="32" :height="32"/>
    <!-- عرض أيقونة shopping-cart بحجم محدد (32x32) وعرض خط (stroke-width) بمقدار 2 -->
    <component :is="ShoppingIcon" :stroke-width="2" :width="32" :height="32"/>
  </div>
</template>

<script>
// استيراد أيقونة academic-cap كـ مكون Vue من مجلد assets/icons
// يتوقع أن يكون هذا الملف (academic-cap.svg) موجودًا في المسار المحدد
import AcademicIcon from '@/assets/icons/academic-cap.svg';

// استيراد أيقونة shopping-cart كـ مكون Vue من مجلد assets/icons
// يتوقع أن يكون هذا الملف (shopping-cart.svg) موجودًا في المسار المحدد
import ShoppingIcon from '@/assets/icons/shopping-cart.svg';

export default {
  components: {
    // تسجيل المكونات للاستخدام في القالب (template) الخاص بهذا المكون
    AcademicIcon,
    ShoppingIcon
  }
}
</script>
