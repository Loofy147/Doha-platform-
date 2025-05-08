import type { Metadata } from 'next';
import React from 'react'; // Import React
import { AdminHeader } from '@/components/admin/admin-header';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { Skeleton } from '@/components/ui/skeleton'; // For Suspense fallback

export const metadata: Metadata = {
  title: 'لوحة تحكم لمسة ضحى',
  description: 'لوحة التحكم الإدارية لمنصة لمسة ضحى.',
};

// Define a simple loading skeleton for the main content area
const AdminLoadingSkeleton = () => (
  <div className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8 space-y-6">
    <Skeleton className="h-16 w-full" />
    <Skeleton className="h-64 w-full" />
    <Skeleton className="h-32 w-full" />
  </div>
);


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <AdminSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 flex-1"> {/* Keep LTR padding */}
        <AdminHeader />
        <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
           {/* Wrap children in Suspense for better loading feedback */}
          <React.Suspense fallback={<AdminLoadingSkeleton />}>
            {children}
          </React.Suspense>
        </main>
      </div>
    </div>
  );
}
