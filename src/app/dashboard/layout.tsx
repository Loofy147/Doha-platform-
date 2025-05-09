
import type { Metadata } from 'next/server';
import React from 'react'; 
import { SellerDashboardHeader } from '@/components/dashboard/seller-dashboard-header';
import { SellerDashboardSidebar } from '@/components/dashboard/seller-dashboard-sidebar';
import { Skeleton } from '@/components/ui/skeleton'; 

export const metadata: Metadata = {
  title: 'لوحة تحكم المبدعة - لمسة ضحى',
  description: 'إدارة متجرك ومنتجاتك على منصة لمسة ضحى.',
};

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
    <div dir="rtl" className="flex min-h-screen w-full bg-muted/40"> {/* Ensure RTL direction for the dashboard layout */}
      <SellerDashboardSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:mr-14 flex-1"> {/* Sidebar is on the right, main content needs margin-right */}
        <SellerDashboardHeader />
        <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <React.Suspense fallback={<DashboardLoadingSkeleton />}>
            {children}
          </React.Suspense>
        </main>
      </div>
    </div>
  );
}
