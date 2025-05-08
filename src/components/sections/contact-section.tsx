// src/components/sections/contact-section.tsx
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'الاسم يجب أن يتكون من حرفين على الأقل.' }),
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح.' }),
  subject: z.string().min(5, { message: 'الموضوع يجب أن يتكون من 5 أحرف على الأقل.' }),
  message: z.string().min(10, { message: 'الرسالة يجب أن تتكون من 10 أحرف على الأقل.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.1 } }
};


export function ContactSection() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form data submitted:', data);
    toast({
      title: 'تم إرسال رسالتكِ بنجاح!',
      description: "شكراً لتواصلكِ مع لمسة ضحى. سنقوم بالرد في أقرب وقت ممكن.",
      variant: 'default',
    });
    reset();
  };

  return (
    <motion.section
      id="contact"
      className="py-16 lg:py-24 bg-background"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }} // Trigger animation when 15% visible
      variants={sectionVariants} // Apply container variants
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          variants={itemVariants} // Animate header block
        >
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            تواصلي معنا
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            هل لديكِ أي أسئلة أو اقتراحات تخص منصة لمسة ضحى؟ نسعد دائمًا بسماع صوتكِ!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <motion.div variants={sectionVariants}>
            <Card className="shadow-lg">
              <CardHeader>
                <motion.div variants={itemVariants}>
                  <CardTitle className="text-2xl text-primary flex items-center gap-2">
                    <MessageSquare size={24} className="text-accent-pink" /> أرسلي لنا رسالة
                  </CardTitle>
                </motion.div>
              </CardHeader>
              <CardContent>
                 <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                    variants={sectionVariants} // Stagger form items
                  >
                  <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground">الاسم الكامل</label>
                    <Input
                      type="text"
                      id="name"
                      autoComplete="name"
                      className={`mt-1 ${errors.name ? 'border-destructive' : ''}`}
                      {...register('name')}
                      placeholder="اسمكِ الكريم"
                    />
                    {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground">البريد الإلكتروني</label>
                    <Input
                      type="email"
                      id="email"
                      autoComplete="email"
                      className={`mt-1 ${errors.email ? 'border-destructive' : ''}`}
                      {...register('email')}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground">الموضوع</label>
                    <Input
                      type="text"
                      id="subject"
                      className={`mt-1 ${errors.subject ? 'border-destructive' : ''}`}
                      {...register('subject')}
                      placeholder="عن ماذا تتمحور رسالتكِ؟"
                    />
                    {errors.subject && <p className="mt-1 text-sm text-destructive">{errors.subject.message}</p>}
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground">الرسالة</label>
                    <Textarea
                      id="message"
                      rows={4}
                      className={`mt-1 ${errors.message ? 'border-destructive' : ''}`}
                      {...register('message')}
                      placeholder="اكتبي رسالتكِ هنا..."
                    />
                    {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>}
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Button type="submit" className="w-full bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground" disabled={isSubmitting}>
                      {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                    </Button>
                  </motion.div>
                </motion.form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Section */}
          <motion.div className="space-y-8" variants={sectionVariants}>
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
    </motion.section>
  );
}
