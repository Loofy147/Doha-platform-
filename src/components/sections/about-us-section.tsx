// src/components/sections/about-us-section.tsx
'use client';

import Image from 'next/image';
import { Users, Lightbulb, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion'; // Ensure framer-motion is imported
import { Card, CardContent } from '@/components/ui/card';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.1 } }
};


export function AboutUsSection() {
  return (
    <motion.section
      id="about"
      className="py-16 lg:py-24 bg-secondary/20 overflow-hidden" // Added overflow hidden
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="order-2 lg:order-1"
            variants={sectionVariants} // Use section variant for the container
          >
            <motion.h2
              className="text-3xl font-bold tracking-tight text-primary sm:text-4xl mb-6"
              variants={itemVariants} // Animate header
            >
              لمسة ضحى: إبداع يلامس حياتك، معًا نصنع الفرق
            </motion.h2>
            <motion.p
                className="text-lg text-foreground/80 mb-4"
                variants={itemVariants} // Animate paragraph
            >
              "لمسة ضحى" هي أكثر من مجرد منصة؛ إنها مساحة نابضة بالحياة حيث تلتقي الموهبة بالفرصة. نوفر لكل امرأة الأدوات والدعم اللازمين لتحويل شغفها إلى مشروع مزدهر، سواء كان ذلك عبر بيع منتجات فريدة، تأجير مقتنيات قيمة، أو تقديم خدمات مبتكرة.
            </motion.p>
            <motion.p
                className="text-lg text-foreground/80 mb-6"
                variants={itemVariants} // Animate paragraph
            >
              رؤيتنا هي بناء مجتمع نسائي قوي ومتكاتف، يحقق الاستقلال المالي والتمكين الذاتي من خلال بيئة رقمية آمنة، ملهمة، ومصممة خصيصًا لتطلعات المرأة العصرية. نهدف إلى أن تكون "لمسة ضحى" الشرارة التي تشعل الإبداع وتحول الأحلام إلى واقع ملموس.
            </motion.p>
            {/* Stagger animation for list items */}
            <motion.div className="space-y-4" variants={sectionVariants}>
              <motion.div className="flex items-start gap-3" variants={itemVariants}>
                <Users size={24} className="text-accent-pink mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary">مجتمع قوي وملهم</h3>
                  <p className="text-sm text-foreground/70">نلتقي لنتعاون، نبتكر، وننمو معًا كشبكة من رائدات الأعمال الطموحات.</p>
                </div>
              </motion.div>
              <motion.div className="flex items-start gap-3" variants={itemVariants}>
                <Lightbulb size={24} className="text-accent-yellow mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary">منصة للمواهب المتألقـة</h3>
                  <p className="text-sm text-foreground/70">نعرض بفخر المنتجات اليدوية الفريدة، المقتنيات القابلة للتأجير، والخدمات الاحترافية المبتكرة.</p>
                </div>
              </motion.div>
              <motion.div className="flex items-start gap-3" variants={itemVariants}>
                <Briefcase size={24} className="text-accent-purple mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary">أدوات لنمو وازدهار الأعمال</h3>
                  <p className="text-sm text-foreground/70">ندعمكِ بأدوات ذكاء اصطناعي، تحليلات متقدمة، وميزات تسويقية لمساعدة عملكِ على التألق.</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div
            className="order-1 lg:order-2 rounded-lg overflow-hidden shadow-xl"
            variants={imageVariants} // Animate image separately
          >
             <Card className="overflow-hidden"> {/* Wrap Image in a Card for potential background/border */}
                <CardContent className="p-0 aspect-video"> {/* Maintain aspect ratio */}
                    <Image
                    src="https://picsum.photos/600/338?random=20"
                    alt="مجموعة متنوعة من رائدات الأعمال يتعاونّ بحماس في مساحة عمل مشرقة"
                    width={600}
                    height={338}
                    className="object-cover w-full h-full transform transition-transform duration-500 hover:scale-105" // Add hover effect
                    data-ai-hint="women collaboration business"
                    />
                </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
