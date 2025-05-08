import type { Metadata } from 'next/server';
import { SellerDashboardHeader } from '@/components/dashboard/seller-dashboard-header';
import { SellerDashboardSidebar } from '@/components/dashboard/seller-dashboard-sidebar';

export const metadata: Metadata = {
  title: 'لوحة تحكم المبدعة - لمسة ضحى',
  description: 'إدارة متجرك ومنتجاتك على منصة لمسة ضحى.',
};

export default function SellerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <SellerDashboardSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:mr-14 flex-1"> {/* Changed sm:pl-14 to sm:mr-14 */}
        <SellerDashboardHeader />
        <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
