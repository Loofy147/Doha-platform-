import Image from 'next/image';
import { Users, Lightbulb, Handshake, Briefcase } from 'lucide-react';

export function AboutUsSection() {
  return (
    <section id="about" className="py-16 lg:py-24 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-6">
              نُمكّن المرأة اقتصاديًا، معًا وبإبداع
            </h2>
            <p className="text-lg text-foreground/80 mb-4">
              نساء كوميرس هي منصة تجارة إلكترونية مُصممة خصيصًا لتمكين المرأة، حيث توفر لها مساحة لإنشاء متاجر افتراضية، بيع أو تأجير منتجاتها، وتقديم خدماتها. نحن نرعى مجتمعًا داعمًا يعزز خبراتها التجارية ويطلق العنان لإمكاناتها.
            </p>
            <p className="text-lg text-foreground/80 mb-6">
              رؤيتنا هي تحقيق الاستقلال الاقتصادي للمرأة من خلال بيئة رقمية آمنة، سهلة الاستخدام، ومُفصلة لتلبية احتياجاتها وطموحاتها. نهدف إلى توفير مصدر دخل إضافي أو أساسي للبائعات، وتسهيل وصول العميلات إلى منتجات وخدمات عالية الجودة بلمسة إبداعية.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Users size={24} className="text-accent-pink mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary">مجتمع داعم وملهم</h3>
                  <p className="text-sm text-foreground/70">شبكة للتعاون، الابتكار، والنمو المشترك بين رائدات الأعمال الطموحات.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb size={24} className="text-accent-yellow mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary">منصة لعرض المواهب المتنوعة</h3>
                  <p className="text-sm text-foreground/70">مساحة للمنتجات اليدوية الفريدة، المقتنيات القابلة للتأجير، والخدمات الاحترافية المبتكرة.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Briefcase size={24} className="text-accent-purple mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary">أدوات لنمو الأعمال</h3>
                  <p className="text-sm text-foreground/70">نوفر أدوات مدعومة بالذكاء الاصطناعي، تحليلات متقدمة، وميزات تسويقية لمساعدة الأعمال على الازدهار.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 rounded-lg overflow-hidden shadow-xl aspect-video">
            <Image
              src="https://picsum.photos/600/338?random=20"
              alt="مجموعة متنوعة من رائدات الأعمال يتعاونّ بحماس"
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
