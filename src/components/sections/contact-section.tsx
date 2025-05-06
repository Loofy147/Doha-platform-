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

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'الاسم يجب أن يتكون من حرفين على الأقل.' }),
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح.' }),
  subject: z.string().min(5, { message: 'الموضوع يجب أن يتكون من 5 أحرف على الأقل.' }),
  message: z.string().min(10, { message: 'الرسالة يجب أن تتكون من 10 أحرف على الأقل.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

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
    // Simulate API call
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
    <section id="contact" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            تواصلي معنا
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            هل لديكِ أي أسئلة أو اقتراحات تخص منصة لمسة ضحى؟ نسعد دائمًا بسماع صوتكِ!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2">
                <MessageSquare size={24} className="text-accent-pink" /> أرسلي لنا رسالة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
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
                </div>
                <div>
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
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground">الموضوع</label>
                  <Input
                    type="text"
                    id="subject"
                    className={`mt-1 ${errors.subject ? 'border-destructive' : ''}`}
                    {...register('subject')}
                    placeholder="عن ماذا تتمحور رسالتكِ؟"
                  />
                  {errors.subject && <p className="mt-1 text-sm text-destructive">{errors.subject.message}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground">الرسالة</label>
                  <Textarea
                    id="message"
                    rows={4}
                    className={`mt-1 ${errors.message ? 'border-destructive' : ''}`}
                    {...register('message')}
                    placeholder="اكتبي رسالتكِ هنا..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>}
                </div>
                <div>
                  <Button type="submit" className="w-full bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground" disabled={isSubmitting}>
                    {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-primary flex items-center gap-2">
                  <Info size={24} className="text-accent-purple" /> معلومات المنصة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground/80">
                  لمسة ضحى هي منصة إلكترونية تجمع رائدات الأعمال الموهوبات بالباحثات عن الإبداع. نعمل بشغف لتمكين المرأة اقتصاديًا.
                </p>
                 <div className="aspect-video rounded-md overflow-hidden border">
                  <Image
                    src="https://picsum.photos/800/450?random=15"
                    alt="صورة تعبر عن التعاون النسائي والإبداع عبر الإنترنت"
                    width={800}
                    height={450}
                    className="object-cover w-full h-full"
                    data-ai-hint="women online business"
                  />
                </div>
                <p className="flex items-center gap-3 text-foreground/80">
                  <Mail size={20} className="text-accent-pink" />
                  <span>support@lamsadoha.com</span>
                </p>
                 <p className="text-sm text-muted-foreground">
                  للتواصل مع مبدعات محددات، يرجى الرجوع إلى صفحات متاجرهن بعد تسجيل الدخول.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
