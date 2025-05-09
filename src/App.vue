
<template>
  <div id="app">
    <!-- استخدام مكون TablerIcons الذي يعرض الأيقونات المستوردة -->
    <TablerIcons />
  </div>
</template>

<script>
// استيراد مكون TablerIcons من المسار النسبي
import TablerIcons from './components/TablerIcons.vue';

export default {
  name: 'App',
  components: {
    // تسجيل مكون TablerIcons ليصبح متاحًا للاستخدام في قالب هذا المكون (App.vue)
    TablerIcons
  }
}
</script>

<style>
/* يمكنك إضافة بعض التنسيقات الأساسية هنا إذا أردت */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
