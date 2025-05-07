'use client'; // Error components must be Client Components

import type { ErrorProps } from 'next/error';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6 text-center">
      <AlertTriangle className="w-16 h-16 text-destructive mb-6" />
      <h2 className="text-3xl font-bold text-primary mb-4">عفوًا، حدث خطأ ما!</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        نحن آسفون، يبدو أن شيئًا ما لم يعمل كما هو متوقع. يمكنك محاولة تحديث الصفحة أو العودة لاحقًا.
      </p>
      <p className="text-sm text-foreground/60 mb-2"> تفاصيل الخطأ (للمطورين):</p>
      <pre className="text-xs bg-muted/50 p-3 rounded-md max-w-full overflow-x-auto mb-8 text-left">
        {error.message}
        {error.digest && `\nDigest: ${error.digest}`}
      </pre>
      <div className="flex gap-4">
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          variant="default"
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          حاول مرة أخرى
        </Button>
        <Button
            variant="outline"
            size="lg"
            asChild
        >
           <Link href="/">العودة إلى الرئيسية</Link>
        </Button>
      </div>
    </div>
  );
}
