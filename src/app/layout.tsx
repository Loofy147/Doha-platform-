import type { Metadata } from 'next';
import { Noto_Kufi } from 'next/font/google'; // Using Noto Kufi for Arabic text
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

const notoKufi = Noto_Kufi({
  weight: ['400', '700'],
  subsets: ['arabic', 'latin'],
  variable: '--font-noto-kufi',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Hamid Merdj Bakery',
  description: 'Traditional bakery offering delicious baked goods.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${notoKufi.variable} font-sans antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}

