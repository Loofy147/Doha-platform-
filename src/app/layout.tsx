import type { Metadata, Viewport } from 'next';
import { Poppins, Merriweather, Noto_Sans_Arabic } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const merriweather = Merriweather({
  subsets: ['latin'],
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
  title: 'نساء كوميرس - تمكين رائدات الأعمال',
  description: 'منصة تجارة إلكترونية شاملة للمرأة تمكّنها من بيع، تأجير، وعرض منتجاتها وخدماتها. انضمي إلى مجتمعنا الداعم اليوم!',
  keywords: ['رائدات أعمال', 'تجارة إلكترونية', 'بيع عبر الإنترنت', 'تأجير منتجات', 'سوق خدمات', 'منتجات يدوية', 'المرأة في الأعمال', 'تمكين المرأة', 'نساء كوميرس'],
  authors: [{ name: 'فريق نساء كوميرس' }],
};

export const viewport: Viewport = {
  themeColor: '#EAA4C6', 
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
      <body className="font-arabic antialiased">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Toaster />
        <SpeedInsights/>
        <Analytics/>
      </body>
    </html>
  );
}

