'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home, FileText } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { toast } = useToast();

  useEffect(() => {
    console.error("Root Application Error:", error);
  }, [error]);

  const handleReportError = () => {
    // In a real app, this would send error details to a reporting service
    console.log("Simulated error report:", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
    toast({
      title: "تم إرسال تقرير الخطأ (محاكاة)",
      description: "شكرًا لمساعدتك في تحسين لمسة ضحى!",
      variant: "default",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-50 p-6 text-center">
      <Card className="w-full max-w-lg shadow-2xl border-2 border-destructive/30 bg-card">
        <CardHeader className="bg-destructive/10 p-8 rounded-t-lg">
          <div className="flex flex-col items-center">
            <AlertTriangle className="w-20 h-20 text-destructive mb-4 animate-pulse" style={{ animationDuration: '1.5s' }} />
            <CardTitle className="text-3xl font-bold text-destructive mb-2">أوه لا! خطأ غير متوقع</CardTitle>
            <CardDescription className="text-destructive/80 text-md">نأسف، حدث خلل ما في نظام لمسة ضحى.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-6">
          <p className="text-lg text-foreground/80 leading-relaxed">
            نحن نعتذر بشدة، يبدو أن شيئًا ما لم يعمل كما ينبغي. فريقنا التقني قد تم إبلاغه بالمشكلة وسيعمل على إصلاحها في أقرب وقت.
          </p>
          
          {process.env.NODE_ENV === 'development' && error && (
            <details className="mt-4 p-4 bg-muted/50 rounded-md text-left text-xs border border-border">
              <summary className="cursor-pointer font-medium text-primary hover:underline">تفاصيل الخطأ (للمطورين فقط)</summary>
              <pre className="mt-3 whitespace-pre-wrap break-words text-foreground/70 text-xs max-h-32 overflow-y-auto p-2 bg-background rounded">
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
                {error.stack && `\n\nStack Trace:\n${error.stack}`}
              </pre>
            </details>
          )}

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6 border-t border-border/50">
            <Button
              onClick={() => reset()}
              variant="default"
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 px-8 py-3 text-base rounded-full shadow-md hover:shadow-lg transition-all"
            >
              <RefreshCw className="w-5 h-5" />
              إعادة تحميل الصفحة
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-primary text-primary hover:bg-primary/10 flex items-center gap-2 px-8 py-3 text-base rounded-full shadow-md hover:shadow-lg transition-all"
            >
              <Link href="/">
                <Home className="w-5 h-5" /> العودة إلى الرئيسية
              </Link>
            </Button>
          </div>
          <Button
              variant="link"
              size="sm"
              onClick={handleReportError}
              className="text-muted-foreground hover:text-destructive mt-4 flex items-center gap-1 text-xs"
            >
              <FileText className="w-3 h-3" /> الإبلاغ عن هذا الخطأ
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
