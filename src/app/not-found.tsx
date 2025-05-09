// src/app/not-found.tsx
import { NotFound } from '@/components/layout/not-found';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - الصفحة غير موجودة | لمسة ضحى',
  description: 'عذرًا، لم نتمكن من العثور على الصفحة التي تبحثين عنها في منصة لمسة ضحى.',
};

export default function RootNotFound() {
  return (
    <NotFound
      title="404 - الصفحة غير موجودة"
      message="عذرًا، لم نتمكن من العثور على الصفحة التي تبحثين عنها. قد يكون الرابط خاطئًا أو تم نقل الصفحة."
      showBackButton={false} // Explicitly false for the root 404
    />
  );
}