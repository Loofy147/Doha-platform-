import type { Metadata } from 'next';
import { Poppins, Merriweather } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

const poppins = Poppins({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const merriweather = Merriweather({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WomenCommerce - Empowering Women Economically',
  description: 'A comprehensive e-commerce platform for women to create virtual stores, sell or rent products and services, and build a supportive community.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${poppins.variable} ${merriweather.variable}`}>
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
