import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Sparkles, Store, ArrowLeft } from 'lucide-react'; 

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-50 py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 opacity-25">
        <Image
          src="https://picsum.photos/seed/hero-bg2/1920/1080" 
          alt="خلفية مجردة بألوان الباستيل الناعمة ترمز للإبداع والأنوثة"
          fill
          className="object-cover" // Ensure object-cover is used
          data-ai-hint="abstract pastel background"
          priority
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <Sparkles className="mx-auto h-16 w-16 text-accent-yellow mb-6 animate-pulse" />
        <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl drop-shadow-md">
          مرحباً بكِ في عالم <span className="text-accent-pink">لمسة ضحى</span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg text-foreground/90 sm:text-xl md:text-2xl leading-relaxed">
          بوابتكِ لاكتشاف إبداعات نسائية فريدة، ودعم رائدات أعمال طموحات. هنا، كل لمسة تحكي قصة، وكل منتج يحمل شغفًا.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <Button size="lg" asChild className="bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out px-8 py-3 text-base rounded-full group">
            <Link href="/products">
              <ShoppingBag className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-[360deg]" /> اكتشفي كنوز الإبداع
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-base rounded-full group">
            <Link href="/sell-with-us">
               انضمي لمبدعاتنا <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" /> 
            </Link>
          </Button>
        </div>
      </div>
      {/* Subtle decorative elements */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent-pink/20 rounded-full filter blur-2xl opacity-50 animate-pulse"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-purple/20 rounded-full filter blur-2xl opacity-50 animate-pulse delay-1000"></div>
    </section>
  );
}
