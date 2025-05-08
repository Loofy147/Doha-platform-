import type { Metadata, Viewport } from 'next';
import { Poppins, Merriweather, Noto_Sans_Arabic } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
// Removed unused Vercel imports: SpeedInsights and Analytics

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const merriweather = Merriweather({
  subsets: ['latin', 'latin-ext'], // Added latin-ext for broader character support if needed
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
  manifest: '/manifest.json', // Added for PWA support
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
    // creator: '@YourTwitterHandle', // Add your Twitter handle
    images: ['https://lamsadoha.vercel.app/twitter-image.png'], // Replace with actual Twitter image URL
  },
};

export const viewport: Viewport = {
  themeColor: [ // Added light/dark theme colors
    { media: '(prefers-color-scheme: light)', color: '#EAA4C6' }, // Primary Pink
    { media: '(prefers-color-scheme: dark)', color: '#3A1E35' }, // Dark Purple-Pink from dark theme background/card
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // Keep maximumScale=1 to prevent zooming, common for web apps
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
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />
        {/* Add Vercel Analytics and Speed Insights here if/when installed */}
        {/* <Analytics /> */}
        {/* <SpeedInsights /> */}
      </body>
    </html>
  );
}
