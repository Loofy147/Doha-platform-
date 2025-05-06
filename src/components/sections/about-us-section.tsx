import Image from 'next/image';
import { Users, Lightbulb, Handshake, Briefcase } from 'lucide-react';

export function AboutUsSection() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-6">
              لمسة ضحى: إبداع يلامس حياتك، معًا نصنع الفرق
            </h2>
            <p className="text-lg text-foreground/80 mb-4">
              "لمسة ضحى" هي أكثر من مجرد منصة؛ إنها مساحة نابضة بالحياة حيث تلتقي الموهبة بالفرصة. نوفر لكل امرأة الأدوات والدعم اللازمين لتحويل شغفها إلى مشروع مزدهر، سواء كان ذلك عبر بيع منتجات فريدة، تأجير مقتنيات قيمة، أو تقديم خدمات مبتكرة.
            </p>
            <p className="text-lg text-foreground/80 mb-6">
              رؤيتنا هي بناء مجتمع نسائي قوي ومتكاتف، يحقق الاستقلال المالي والتمكين الذاتي من خلال بيئة رقمية آمنة، ملهمة، ومصممة خصيصًا لتطلعات المرأة العصرية. نهدف إلى أن تكون "لمسة ضحى" الشرارة التي تشعل الإبداع وتحول الأحلام إلى واقع ملموس.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Users size={24} className="text-accent-pink mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary">مجتمع قوي وملهم</h3>
                  <p className="text-sm text-foreground/70">نلتقي لنتعاون، نبتكر، وننمو معًا كشبكة من رائدات الأعمال الطموحات.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb size={24} className="text-accent-yellow mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary">منصة للمواهب المتألقـة</h3>
                  <p className="text-sm text-foreground/70">نعرض بفخر المنتجات اليدوية الفريدة، المقتنيات القابلة للتأجير، والخدمات الاحترافية المبتكرة.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Briefcase size={24} className="text-accent-purple mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary">أدوات لنمو وازدهار الأعمال</h3>
                  <p className="text-sm text-foreground/70">ندعمكِ بأدوات ذكاء اصطناعي، تحليلات متقدمة، وميزات تسويقية لمساعدة عملكِ على التألق.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 rounded-lg overflow-hidden shadow-xl aspect-video">
            <Image
              src="https://picsum.photos/600/338?random=20"
              alt="مجموعة متنوعة من رائدات الأعمال يتعاونّ بحماس في مساحة عمل مشرقة"
              width={600}
              height={338}
              className="object-cover w-full h-full"
              data-ai-hint="women collaboration business"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
