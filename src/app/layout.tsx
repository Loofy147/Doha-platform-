import type { Metadata } from 'next';
import { Noto_Sans_Arabic } from 'next/font/google'; // Switched to Noto_Sans_Arabic
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

const notoSansArabic = Noto_Sans_Arabic({ // Updated font loader
  weight: ['400', '700'],
  subsets: ['arabic'],
  variable: '--font-noto-sans-arabic', // Updated CSS variable name
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
    <html lang="en" dir="ltr" className={notoSansArabic.variable}>
      <body className={`font-sans antialiased`}>
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
