
import type { Metadata, Viewport } from 'next/server';
import React from 'react'; // Ensure React is imported for Suspense
// import Script from 'next/script'; // Removed as Ionicons scripts are removed
import { Poppins, Merriweather, Noto_Sans_Arabic } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { WishlistProvider } from '@/context/wishlist-context';
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
  icons: {
    icon: '/favicon.ico', 
    apple: '/apple-touch-icon.png', 
  },
  openGraph: {
    title: 'لمسة ضحى - إبداع يلامس حياتكِ',
    description: 'اكتشفي إبداعات نسائية فريدة وادعمي رائدات الأعمال.',
    url: 'https://lamsadoha.vercel.app', // Replace with your actual production URL
    siteName: 'لمسة ضحى',
    images: [
      {
        url: 'https://lamsadoha.vercel.app/og-image.png', // Replace with your actual OG image URL
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
    images: ['https://lamsadoha.vercel.app/twitter-image.png'], // Replace with your actual Twitter image URL
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#EAA4C6' },
    { media: '(prefers-color-scheme: dark)', color: '#3A1E35' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // Consider if maximum-scale=1 is truly necessary, it can affect accessibility.
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${poppins.variable} ${merriweather.variable} ${notoSansArabic.variable}`}>
      <head>
        {/* Removed direct Ionicons style tag */}
      </head>
      <body className="font-arabic antialiased bg-background text-foreground">
        <WishlistProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <React.Suspense fallback={<div className="flex-grow flex items-center justify-center"><p>جاري التحميل...</p></div>}>
              <main className="flex-grow">{children}</main>
            </React.Suspense>
            <Footer />
          </div>
          <Toaster />
        </WishlistProvider>
        {/* Removed direct Ionicons div and script tags */}
      </body>
    </html>
  );
}
