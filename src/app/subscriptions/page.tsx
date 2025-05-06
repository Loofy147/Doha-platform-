'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Gift, Sparkles } from "lucide-react";
import Link from "next/link";

const subscriptionPlans = [
  {
    name: "البائعة الأساسية",
    price: "مجاني",
    features: [
      "عرض حتى 10 منتجات/خدمات",
      "تخصيص أساسي للمتجر",
      "عمولة قياسية (15%)",
      "الوصول إلى منتديات المجتمع",
    ],
    cta: "ابدئي البيع",
    href: "/auth/register?role=seller",
    popular: false,
  },
  {
    name: "البائعة المحترفة",
    price: "2,500 دج/شهريًا",
    features: [
      "عرض حتى 50 منتج/خدمة",
      "تخصيص متقدم للمتجر",
      "عمولة مخفضة (10%)",
      "دعم ذو أولوية",
      "فرص لعرض منتجات مميزة",
      "الوصول إلى ورش عمل حصرية",
    ],
    cta: "انتقلي للاحتراف",
    href: "/checkout?plan=pro",
    popular: true,
  },
  {
    name: "بائعة النخبة",
    price: "5,000 دج/شهريًا",
    features: [
      "عرض عدد غير محدود من المنتجات/الخدمات",
      "واجهات متجر متميزة وتحليلات متقدمة",
      "أقل نسبة عمولة (5%)",
      "مدير حساب مخصص",
      "ظهور بارز في نتائج البحث",
      "وصول مبكر للميزات الجديدة",
      "رؤى تسويقية مدعومة بالذكاء الاصطناعي",
    ],
    cta: "كوني من النخبة",
    href: "/checkout?plan=elite",
    popular: false,
  }
];

export default function SubscriptionsPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <Gift size={48} className="mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          باقات اشتراك نساء كوميرس
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          اختاري الباقة التي تناسب احتياجات عملكِ وافتحي أبواب أدوات قوية للنمو على نساء كوميرس. للمشترين، التصفح والشراء دائمًا مجاني!
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {subscriptionPlans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col shadow-lg rounded-lg overflow-hidden ${plan.popular ? 'border-2 border-accent-yellow ring-2 ring-accent-yellow/50' : 'border-primary/20'}`}>
            {plan.popular && (
              <div className="bg-accent-yellow text-accent-yellow-foreground text-center py-1.5 text-sm font-semibold">
                الأكثر رواجًا
              </div>
            )}
            <CardHeader className="p-6 bg-card/50">
              <CardTitle className="text-2xl font-semibold text-primary">{plan.name}</CardTitle>
              <CardDescription className="text-3xl font-bold text-accent-pink mt-2">{plan.price}</CardDescription>
               <p className="text-sm text-muted-foreground mt-1">{plan.name === "البائعة الأساسية" ? "مثالية للانطلاق" : (plan.name === "البائعة المحترفة" ? "للأعمال النامية" : "للبائعات المتمرسات الساعيات لأقصى نمو")}</p>
            </CardHeader>
            <CardContent className="p-6 flex-grow space-y-3">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle size={18} className="text-green-500 ml-2 mt-0.5 flex-shrink-0" /> {/* Changed mr-2 to ml-2 for RTL */}
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-6 mt-auto">
              <Button asChild className={`w-full ${plan.popular ? 'bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground' : 'bg-primary hover:bg-primary/90'}`} size="lg">
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center p-8 bg-secondary/20 rounded-lg">
        <Sparkles size={32} className="mx-auto text-accent mb-4" />
        <h2 className="text-2xl font-semibold text-primary mb-3">هل أنتِ مشترية؟</h2>
        <p className="text-foreground/80 mb-6 max-w-xl mx-auto">
          استمتعي بتصفح واكتشاف المنتجات الفريدة ودعم رائدات الأعمال على نساء كوميرس مجانًا! أنشئي حسابًا لحفظ مفضلاتكِ وإدارة مشترياتكِ.
        </p>
        <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
          <Link href="/auth/register?role=buyer">أنشئي حساب مشترية</Link>
        </Button>
      </div>
    </div>
  );
}
