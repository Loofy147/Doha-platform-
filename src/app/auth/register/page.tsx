'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Mail, KeyRound, User, LogIn } from 'lucide-react';
import { WomenCommerceLogo } from '@/components/icons/logo'; // Will be LamsaDohaLogo

const registrationFormSchema = z.object({
  fullName: z.string().min(2, { message: "يجب أن يتكون الاسم الكامل من حرفين على الأقل." }),
  email: z.string().email({ message: "الرجاء إدخال عنوان بريد إلكتروني صالح." }),
  password: z.string().min(8, { message: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل." })
    .regex(/[a-z]/, { message: "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل."})
    .regex(/[A-Z]/, { message: "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل."})
    .regex(/[0-9]/, { message: "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل."})
    .regex(/[^a-zA-Z0-9]/, { message: "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل."}),
  confirmPassword: z.string().min(1, { message: "الرجاء تأكيد كلمة المرور." }),
  agreeToTerms: z.boolean().refine(val => val === true, { message: "يجب الموافقة على الشروط والأحكام للتسجيل." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "كلمتا المرور غير متطابقتين.",
  path: ["confirmPassword"], 
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

export default function RegisterPage() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      agreeToTerms: false,
    }
  });

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Registration Attempt:', data);
    toast({
      title: 'تم التسجيل بنجاح (محاكاة)',
      description: "أهلاً بك في لمسة ضحى! يرجى التحقق من بريدك الإلكتروني لتأكيد حسابك.",
      variant: 'default',
    });
    reset();
  };

  if (!isClient) {
     return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-50 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="items-center text-center p-8 bg-primary/10">
             <UserPlus size={32} className="mb-2 text-accent-pink" />
            <CardTitle className="text-2xl font-bold text-primary">جاري تحميل نموذج التسجيل...</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="h-10 bg-muted rounded animate-pulse w-full"></div>
            <div className="h-10 bg-muted rounded animate-pulse w-full"></div>
            <div className="h-10 bg-muted rounded animate-pulse w-full"></div>
            <div className="h-10 bg-muted rounded animate-pulse w-full mt-4"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-50 p-4">
      <Card className="w-full max-w-md shadow-xl border border-primary/20">
        <CardHeader className="items-center text-center p-6 sm:p-8 bg-primary/5 rounded-t-lg">
           <Link href="/" className="mb-4 inline-block">
            <WomenCommerceLogo className="h-16 w-auto" />
          </Link>
          <CardTitle className="text-3xl font-bold text-primary">أنشئي حسابكِ</CardTitle>
          <CardDescription className="text-foreground/80">
            انضمي إلى مجتمعنا من المبدعات والمتسوقات الداعمات في لمسة ضحى.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div>
              <Label htmlFor="fullName" className="flex items-center mb-1">
                <User size={16} className="mr-2 text-accent-pink" /> الاسم الكامل
              </Label>
              <Input 
                id="fullName" 
                {...register('fullName')} 
                placeholder="اسمك الكامل" 
                className={errors.fullName ? 'border-destructive' : ''}
              />
              {errors.fullName && <p className="mt-1 text-sm text-destructive">{errors.fullName.message}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="flex items-center mb-1">
                <Mail size={16} className="mr-2 text-accent-pink" /> عنوان البريد الإلكتروني
              </Label>
              <Input 
                id="email" 
                type="email" 
                {...register('email')} 
                placeholder="you@example.com" 
                className={errors.email ? 'border-destructive' : ''}
              />
              {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password" className="flex items-center mb-1">
                <KeyRound size={16} className="mr-2 text-accent-pink" /> كلمة المرور
              </Label>
              <Input 
                id="password" 
                type="password" 
                {...register('password')} 
                placeholder="اختاري كلمة مرور قوية" 
                className={errors.password ? 'border-destructive' : ''}
              />
              {errors.password && <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>}
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="flex items-center mb-1">
                <KeyRound size={16} className="mr-2 text-accent-pink" /> تأكيد كلمة المرور
              </Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                {...register('confirmPassword')} 
                placeholder="أعيدي إدخال كلمة المرور" 
                className={errors.confirmPassword ? 'border-destructive' : ''}
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-destructive">{errors.confirmPassword.message}</p>}
            </div>
            <div className="items-top flex space-x-2">
               <Controller
                name="agreeToTerms"
                control={control}
                render={({ field }) => (
                    <Checkbox
                        id="agreeToTerms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-0.5"
                    />
                )}
                />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="agreeToTerms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  أوافق على شروط الخدمة وسياسة الخصوصية لمنصة لمسة ضحى.
                </label>
                 {errors.agreeToTerms && <p className="text-sm text-destructive">{errors.agreeToTerms.message}</p>}
              </div>
            </div>
            <Button type="submit" className="w-full bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground" disabled={isSubmitting}>
              <UserPlus size={18} className="mr-2" /> {isSubmitting ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
            </Button>
          </CardContent>
        </form>
        <CardFooter className="p-6 sm:p-8 border-t bg-secondary/10 rounded-b-lg">
          <p className="text-sm text-center w-full text-foreground/80">
            لديك حساب بالفعل؟{' '}
            <Link href="/auth/login" passHref>
               <Button variant="link" className="p-0 h-auto font-semibold text-accent-purple hover:underline">
                <LogIn size={16} className="mr-1" />تسجيل الدخول
              </Button>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
