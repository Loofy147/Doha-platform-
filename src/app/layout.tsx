import type { Metadata, Viewport } from 'next/server';
import React from 'react';
import { Poppins, Merriweather, Noto_Sans_Arabic } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
// Removed Vercel Analytics and SpeedInsights imports as they were causing errors and not installed/configured.

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const merriweather = Merriweather({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-merriweather',
  weight: ['300', '400', '700', '900'],
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-noto-sans-arabic',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | لمسة ضحى',
    default: 'لمسة ضحى - إبداع يلامس حياتكِ',
  },
  description: 'منصة لمسة ضحى: سوقكِ الشامل لاكتشاف، بيع، أو تأجير المنتجات والخدمات من رائدات أعمال موهوبات. انضمي إلى مجتمعنا الداعم اليوم!',
  keywords: ['لمسة ضحى', 'رائدات أعمال', 'تجارة إلكترونية', 'بيع عبر الإنترنت', 'تأجير منتجات', 'سوق خدمات', 'منتجات يدوية', 'المرأة في الأعمال', 'تمكين المرأة', 'الجزائر'],
  authors: [{ name: 'فريق لمسة ضحى' }],
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'لمسة ضحى - إبداع يلامس حياتكِ',
    description: 'اكتشفي إبداعات نسائية فريدة وادعمي رائدات الأعمال.',
    url: 'https://lamsadoha.vercel.app', // Replace with actual production URL
    siteName: 'لمسة ضحى',
    images: [
      {
        url: 'https://lamsadoha.vercel.app/og-image.png', // Replace with actual OG image URL
        width: 1200,
        height: 630,
        alt: 'شعار منصة لمسة ضحى',
      },
    ],
    locale: 'ar_DZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'لمسة ضحى - إبداع يلامس حياتكِ',
    description: 'اكتشفي إبداعات نسائية فريدة وادعمي رائدات الأعمال.',
    images: ['https://lamsadoha.vercel.app/twitter-image.png'], // Replace with actual Twitter image URL
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#EAA4C6' },
    { media: '(prefers-color-scheme: dark)', color: '#3A1E35' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${poppins.variable} ${merriweather.variable} ${notoSansArabic.variable}`}>
      <body className="font-arabic antialiased bg-background text-foreground">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          {/* Using React.Suspense for potentially lazy-loaded components */}
          <React.Suspense fallback={<div className="flex-grow flex items-center justify-center"><p>جاري التحميل...</p></div>}>
            <main className="flex-grow">{children}</main>
          </React.Suspense>
          <Footer />
        </div>
        <Toaster />
        {/* Vercel Analytics and Speed Insights can be re-added here if installed */}
      </body>
    </html>
  );
}
