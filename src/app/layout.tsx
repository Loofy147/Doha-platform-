
import type { Metadata, Viewport } from 'next/server';
import React from 'react'; // Ensure React is imported for Suspense
import Script from 'next/script';
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
  icons: {
    icon: '/favicon.ico', 
    apple: '/apple-touch-icon.png', 
  },
  openGraph: {
    title: 'لمسة ضحى - إبداع يلامس حياتكِ',
    description: 'اكتشفي إبداعات نسائية فريدة وادعمي رائدات الأعمال.',
    url: 'https://lamsadoha.vercel.app', 
    siteName: 'لمسة ضحى',
    images: [
      {
        url: 'https://lamsadoha.vercel.app/og-image.png', 
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
    images: ['https://lamsadoha.vercel.app/twitter-image.png'], 
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
      <head>
        {/* الخطوة 4: إضافة CSS لتغيير لون الأيقونات عند التحويم */}
        {/* هذا النمط سيجعل أيقونات Ionicons يتغير لونها إلى #DB2777 عند مرور المؤشر فوقها */}
        <style>
          {`
            ion-icon:hover {
              color: #DB2777 !important; /* استخدم important للتأكيد على الأولوية إذا لزم الأمر */
            }
          `}
        </style>
      </head>
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
        
        {/* الخطوة 3: إضافة أيقونات Ionicons داخل <body> */}
        <div style={{ position: 'fixed', bottom: '10px', left: '10px', display: 'flex', gap: '10px', zIndex: 1000, background: 'rgba(255,255,255,0.8)', padding: '5px', borderRadius: '5px' }}>
          <ion-icon name="shopping-cart-outline" style={{ fontSize: '24px', color: '#FF69B4' }}></ion-icon>
          <ion-icon name="heart-sharp" style={{ fontSize: '24px', color: '#FF69B4' }}></ion-icon>
        </div>

        {/* الخطوة 2: إضافة سكربتات Ionicons CDN */}
        <Script
          type="module"
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
          strategy="beforeInteractive" 
        />
        <Script
          nomodule
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
          strategy="beforeInteractive" 
        />
      </body>
    </html>
  );
}
