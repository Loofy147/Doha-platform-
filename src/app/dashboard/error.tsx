'use client'; 

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Home, FileText } from 'lucide-react'; 
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { toast } = useToast();

  useEffect(() => {
    console.error("Seller Dashboard Error:", error);
  }, [error]);

  const handleReportError = () => {
    console.log("Simulated seller dashboard error report:", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      area: 'Seller Dashboard',
    });
    toast({
      title: "تم إرسال تقرير الخطأ (محاكاة)",
      description: "شكرًا لمساعدتك في تحسين لوحة تحكم متجرك!",
      variant: "default",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] bg-muted/20 p-6 text-center">
      <Card className="w-full max-w-md shadow-xl border-destructive/50 bg-card">
        <CardHeader className="bg-destructive/10 p-6 rounded-t-lg">
          <div className="flex flex-col items-center">
            <AlertCircle className="w-12 h-12 text-destructive mb-3" />
            <CardTitle className="text-2xl font-semibold text-destructive">خطأ في لوحة تحكم المبدعة</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <CardDescription className="text-md text-muted-foreground">
            نأسف، حدث خطأ غير متوقع أثناء عرض هذا الجزء من لوحة تحكم متجرك.
          </CardDescription>
          
          {process.env.NODE_ENV === 'development' && error?.message && (
            <details className="mt-3 p-3 bg-muted/50 rounded-md text-left text-xs border border-border">
              <summary className="cursor-pointer font-medium text-primary hover:underline">تفاصيل الخطأ</summary>
              <pre className="mt-2 whitespace-pre-wrap break-words text-foreground/70 text-xs max-h-28 overflow-y-auto p-2 bg-background rounded">
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
              </pre>
            </details>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4 border-t border-border/50">
            <Button
              onClick={() => reset()}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> إعادة تحميل الجزء
            </Button>
            <Button asChild>
                <Link href="/dashboard" className="flex items-center gap-2"> <Home className="h-4 w-4" /> العودة للوحة التحكم</Link>
            </Button>
          </div>
           <Button
              variant="link"
              size="sm"
              onClick={handleReportError}
              className="text-muted-foreground hover:text-destructive mt-3 text-xs flex items-center gap-1"
            >
              <FileText className="w-3 h-3" /> الإبلاغ عن هذا الخطأ
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
