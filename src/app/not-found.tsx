// src/app/not-found.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PackageSearch, Home } from 'lucide-react'; // Using PackageSearch for a "not found" vibe

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 text-center p-8">
      <PackageSearch className="w-24 h-24 text-destructive mb-8 animate-bounce" style={{animationDuration: '2s'}} />
      <h1 className="text-5xl font-extrabold text-primary mb-4">عفوًا، الصفحة غير موجودة!</h1>
      <p className="text-xl text-foreground/80 mb-10 max-w-md">
        الصفحة التي تبحثين عنها قد تكون حُذفت، تغير اسمها، أو أنها غير متاحة مؤقتًا.
      </p>
      <div className="flex gap-4">
        <Button asChild size="lg" className="bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground shadow-lg transform hover:scale-105 transition-transform">
          <Link href="/">
            <Home className="ml-2 h-5 w-5" /> العودة إلى الصفحة الرئيسية
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild className="border-primary text-primary hover:bg-primary/10 transform hover:scale-105 transition-transform">
          <Link href="/contact">
            التواصل مع الدعم
          </Link>
        </Button>
      </div>
    </div>
  );
}
