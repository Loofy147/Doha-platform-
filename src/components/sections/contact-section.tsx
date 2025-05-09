// src/components/sections/contact-section.tsx
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label'; 
import { z } from 'zod';
import { motion } from 'framer-motion';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'الاسم يجب أن يتكون من حرفين على الأقل.' }),
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح.' }),
  subject: z.string().min(5, { message: 'الموضوع يجب أن يتكون من 5 أحرف على الأقل.' }),
  message: z.string().min(10, { message: 'الرسالة يجب أن تتكون من 10 أحرف على الأقل.' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.1 } }
};

interface ContactSectionProps {}

export function ContactSection({ }: ContactSectionProps) {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submit called (placeholder)");
        // In real usage, parent component would handle this with react-hook-form and toast.
        // For now, directly using toast here for demonstration if it were a client component.
        // toast({ title: "تم إرسال رسالتك بنجاح!", description: "سنتواصل معكِ قريبًا." });
    };

  return (
    <section 
      id="contact"
      className="py-16 lg:py-24 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          variants={itemVariants} 
        >
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            تواصلي معنا
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            هل لديكِ أي أسئلة أو اقتراحات تخص منصة لمسة ضحى؟ نسعد دائمًا بسماع صوتكِ!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div variants={itemVariants}> 
            <Card className="shadow-lg">
              <CardHeader>
                <motion.div variants={itemVariants}>
                  <CardTitle className="text-2xl text-primary flex items-center gap-2">
                    <MessageSquare size={24} className="text-accent-pink" /> أرسلي لنا رسالة
                  </CardTitle>
                </motion.div>
              </CardHeader>
              <CardContent>
                 <form
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name" 
                      autoComplete="name"
                      className="mt-1" 
                      placeholder="اسمكِ الكريم"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      className="mt-1"
                      placeholder="your.email@example.com"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="subject">الموضوع</Label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      className="mt-1"
                      placeholder="عن ماذا تتمحور رسالتكِ؟"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="message">الرسالة</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="mt-1"
                      placeholder="اكتبي رسالتكِ هنا..."
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Button type="submit" className="w-full bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground">
                      إرسال الرسالة (قيد التطوير)
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div className="space-y-8" variants={itemVariants}> 
            <Card className="shadow-lg">
              <CardHeader>
                <motion.div variants={itemVariants}>
                    <CardTitle className="text-2xl text-primary flex items-center gap-2">
                    <Info size={24} className="text-accent-purple" /> معلومات المنصة
                    </CardTitle>
                </motion.div>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.p className="text-foreground/80" variants={itemVariants}>
                  لمسة ضحى هي منصة إلكترونية تجمع رائدات الأعمال الموهوبات بالباحثات عن الإبداع. نعمل بشغف لتمكين المرأة اقتصاديًا.
                </motion.p>
                 <motion.div className="aspect-video rounded-md overflow-hidden border" variants={imageVariants}>
                  <Image
                    src="https://picsum.photos/800/450?random=15"
                    alt="صورة تعبر عن التعاون النسائي والإبداع عبر الإنترنت"
                    width={800}
                    height={450}
                    className="object-cover w-full h-full"
                    data-ai-hint="women online business"
                  />
                </motion.div>
                <motion.p className="flex items-center gap-3 text-foreground/80" variants={itemVariants}>
                  <Mail size={20} className="text-accent-pink" />
                  <span>support@lamsadoha.com</span>
                </motion.p>
                 <motion.p className="text-sm text-muted-foreground" variants={itemVariants}>
                  للتواصل مع مبدعات محددات، يرجى الرجوع إلى صفحات متاجرهن بعد تسجيل الدخول.
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
