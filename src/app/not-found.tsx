// src/app/not-found.tsx
import { NotFound } from '@/components/layout/not-found';

export default function RootNotFound() {
  return (
    <NotFound
      title="404 - الصفحة غير موجودة"
      message="عذرًا، لم نتمكن من العثور على الصفحة التي تبحثين عنها. قد يكون الرابط خاطئًا أو تم نقل الصفحة."
      showBackButton={false} // Don't show back button on root 404
    />
  );
}
