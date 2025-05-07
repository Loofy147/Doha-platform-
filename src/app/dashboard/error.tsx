'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Seller Dashboard Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] bg-muted/40 p-6 text-center">
      <AlertCircle className="w-12 h-12 text-destructive mb-4" />
      <h2 className="text-2xl font-semibold text-primary mb-3">خطأ في لوحة تحكم المبدعة</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        حدث خطأ غير متوقع أثناء عرض هذا الجزء من لوحة تحكم متجرك.
      </p>
      <pre className="text-xs bg-muted p-2 rounded-md max-w-full overflow-x-auto mb-6 text-left">
        {error.message}
        {error.digest && `\nDigest: ${error.digest}`}
      </pre>
      <div className="flex gap-4">
        <Button
          onClick={() => reset()}
          variant="outline"
           className="border-primary text-primary hover:bg-primary/10"
        >
          إعادة تحميل الجزء
        </Button>
         <Button asChild>
            <Link href="/dashboard">العودة للوحة التحكم</Link>
        </Button>
      </div>
    </div>
  );
}
