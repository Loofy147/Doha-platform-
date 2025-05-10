import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'منصة لمسة ضحى - أدوات وميزات',
  description: 'أدوات وميزات إضافية لمنصة لمسة ضحى.',
};

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/20">
      {/* Platform-specific header or navigation could go here if needed */}
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      {/* Platform-specific footer could go here if needed */}
    </div>
  );
}
