// src/components/sections/contact-section.tsx
'use client'; 

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label'; 
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'الاسم يجب أن يتكون من حرفين على الأقل.' }),
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح.' }),
  subject: z.string().min(5, { message: 'الموضوع يجب أن يتكون من 5 أحرف على الأقل.' }),
  message: z.string().min(10, { message: 'الرسالة يجب أن تتكون من 10 أحرف على الأقل.' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

const sectionEntryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.15 } } 
};

const itemVariants = { 
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const formItemVariants = { 
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
};

const imageVariants = { 
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.1 } }
};

interface ContactSectionProps {}

export function ContactSection({ }: ContactSectionProps) {
    const { toast } = useToast();
    const { register, handleSubmit: handleFormSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
    });

    const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
        console.log("Contact Form Submitted:", data);
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast({ title: "تم إرسال رسالتكِ بنجاح!", description: "سنتواصل معكِ قريبًا.", variant: "default" });
        reset();
    };

  return (
    <motion.section 
      id="contact"
      className="py-16 lg:py-24 bg-background"
      variants={sectionEntryVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
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

        <motion.div 
            className="grid lg:grid-cols-2 gap-12"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }} 
        >
          <motion.div variants={itemVariants}> 
            <Card className="shadow-lg h-full">
              <CardHeader>
                <motion.div variants={formItemVariants}>
                  <CardTitle className="text-2xl text-primary flex items-center gap-2">
                    <MessageSquare size={24} className="text-accent-pink" /> أرسلي لنا رسالة
                  </CardTitle>
                </motion.div>
              </CardHeader>
              <CardContent>
                 <motion.form
                    onSubmit={handleFormSubmit(onSubmit)} 
                    className="space-y-6"
                    variants={{ visible: { transition: { staggerChildren: 0.1 }}}} 
                  >
                  <motion.div variants={formItemVariants}>
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input
                      type="text"
                      id="name"
                      autoComplete="name"
                      className="mt-1" 
                      placeholder="اسمكِ الكريم"
                      {...register('name')}
                    />
                     {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
                  </motion.div>
                  <motion.div variants={formItemVariants}>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      type="email"
                      id="email"
                      autoComplete="email"
                      className="mt-1"
                      placeholder="your.email@example.com"
                      {...register('email')}
                    />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                  </motion.div>
                  <motion.div variants={formItemVariants}>
                    <Label htmlFor="subject">الموضوع</Label>
                    <Input
                      type="text"
                      id="subject"
                      className="mt-1"
                      placeholder="عن ماذا تتمحور رسالتكِ؟"
                      {...register('subject')}
                    />
                    {errors.subject && <p className="text-destructive text-sm mt-1">{errors.subject.message}</p>}
                  </motion.div>
                  <motion.div variants={formItemVariants}>
                    <Label htmlFor="message">الرسالة</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      className="mt-1"
                      placeholder="اكتبي رسالتكِ هنا..."
                      {...register('message')}
                    />
                    {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
                  </motion.div>
                  <motion.div variants={formItemVariants}>
                    <Button type="submit" className="w-full bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground" disabled={isSubmitting}>
                      {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                    </Button>
                  </motion.div>
                </motion.form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div className="space-y-8" variants={itemVariants}> 
            <Card className="shadow-lg h-full">
              <CardHeader>
                <motion.div variants={formItemVariants}>
                    <CardTitle className="text-2xl text-primary flex items-center gap-2">
                    <Info size={24} className="text-accent-purple" /> معلومات المنصة
                    </CardTitle>
                </motion.div>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.p className="text-foreground/80" variants={formItemVariants}>
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
                <motion.p className="flex items-center gap-3 text-foreground/80" variants={formItemVariants}>
                  <Mail size={20} className="text-accent-pink" />
                  <span>support@lamsadoha.com</span>
                </motion.p>
                 <motion.p className="text-sm text-muted-foreground" variants={formItemVariants}>
                  للتواصل مع مبدعات محددات، يرجى الرجوع إلى صفحات متاجرهن بعد تسجيل الدخول.
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
