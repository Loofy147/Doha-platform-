'use client'; // Error components must be Client Components

import type { ErrorProps } from 'next/error';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'; // Added icons
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Root Application Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 p-6 text-center">
      <Card className="w-full max-w-lg shadow-xl border border-destructive/50">
        <CardHeader className="bg-destructive/10 pb-4">
          <div className="flex flex-col items-center">
            <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
            <CardTitle className="text-3xl font-bold text-destructive mb-2">أوه لا! حدث خطأ غير متوقع</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <p className="text-lg text-muted-foreground leading-relaxed">
            نحن نعتذر بشدة، يبدو أن شيئًا ما لم يعمل كما ينبغي في منصة لمسة ضحى. فريقنا قد تم إبلاغه بالمشكلة.
          </p>
          <p className="text-muted-foreground">
            يمكنكِ محاولة إعادة تحميل الصفحة، أو العودة إلى الصفحة الرئيسية والمتابعة من هناك.
          </p>

          {/* Developer information - consider hiding in production */}
          {process.env.NODE_ENV === 'development' && error && (
            <details className="mt-4 p-3 bg-muted/50 rounded-md text-left text-xs">
              <summary className="cursor-pointer font-medium text-primary">تفاصيل الخطأ (للمطورين)</summary>
              <pre className="mt-2 whitespace-pre-wrap break-words text-foreground/70">
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
                {error.stack && `\n\nStack Trace:\n${error.stack}`}
              </pre>
            </details>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button
              onClick={() => reset()}
              variant="default"
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              حاولي مرة أخرى
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-primary text-primary hover:bg-primary/10 flex items-center gap-2"
            >
              <Link href="/">
                <Home className="w-5 h-5" /> العودة إلى الرئيسية
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
