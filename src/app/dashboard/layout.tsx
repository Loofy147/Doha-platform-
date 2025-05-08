import type { Metadata } from 'next/server';
import React from 'react'; // Import React
import { SellerDashboardHeader } from '@/components/dashboard/seller-dashboard-header';
import { SellerDashboardSidebar } from '@/components/dashboard/seller-dashboard-sidebar';
import { Skeleton } from '@/components/ui/skeleton'; // For Suspense fallback

export const metadata: Metadata = {
  title: 'لوحة تحكم المبدعة - لمسة ضحى',
  description: 'إدارة متجرك ومنتجاتك على منصة لمسة ضحى.',
};

// Define a simple loading skeleton for the main content area
const DashboardLoadingSkeleton = () => (
  <div className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8 space-y-6">
    <Skeleton className="h-16 w-full" />
    <Skeleton className="h-64 w-full" />
    <Skeleton className="h-32 w-full" />
  </div>
);

export default function SellerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      {/* Sidebar is likely client-side due to interactivity/state */}
      <SellerDashboardSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:mr-14 flex-1"> {/* Keep RTL margin */}
        {/* Header might also be client-side */}
        <SellerDashboardHeader />
        <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {/* Wrap children in Suspense for better loading feedback */}
          <React.Suspense fallback={<DashboardLoadingSkeleton />}>
            {children}
          </React.Suspense>
        </main>
      </div>
    </div>
  );
}
