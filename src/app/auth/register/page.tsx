'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
// Use Form components from ShadCN for react-hook-form integration
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Mail, KeyRound, User, LogIn, Briefcase, ShoppingBag, Loader2 } from 'lucide-react'; 
import { WomenCommerceLogo } from '@/components/icons/logo';
import { useRouter } from 'next/navigation';

const registrationFormSchema = z.object({
  fullName: z.string().min(2, { message: "الاسم الكامل يجب أن يتكون من حرفين على الأقل." }),
  email: z.string().email({ message: "الرجاء إدخال عنوان بريد إلكتروني صالح." }),
  password: z.string().min(8, { message: "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل." })
    .regex(/[a-z]/, { message: "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل."})
    .regex(/[A-Z]/, { message: "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل."})
    .regex(/[0-9]/, { message: "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل."})
    .regex(/[^a-zA-Z0-9]/, { message: "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل."}),
  confirmPassword: z.string().min(1, { message: "الرجاء تأكيد كلمة المرور." }),
  accountType: z.enum(['customer', 'seller'], { required_error: "الرجاء تحديد نوع الحساب."}),
  agreeToTerms: z.boolean().refine(val => val === true, { message: "يجب الموافقة على الشروط والأحكام للتسجيل." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "كلمتا المرور غير متطابقتين.",
  path: ["confirmPassword"],
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
      accountType: 'customer', 
    }
  });

  const { handleSubmit, control, formState: { errors, isSubmitting } } = form;

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
      console.log('Registration Attempt:', data);
      
      const welcomeMessage = data.accountType === 'seller'
        ? "مرحبًا بكِ كمبدعة في لمسة ضحى! يرجى التحقق من بريدك الإلكتروني لخطوات تفعيل متجرك."
        : "أهلاً بك في لمسة ضحى! يرجى التحقق من بريدك الإلكتروني لتأكيد حسابك.";

      toast({
        title: 'تم التسجيل بنجاح (محاكاة)',
        description: welcomeMessage,
        variant: 'default',
      });
      form.reset();
      router.push('/auth/login'); // Redirect to login after successful registration
    } catch (error) {
        console.error("Registration error:", error);
        toast({
            title: 'فشل التسجيل',
            description: "حدث خطأ أثناء محاولة إنشاء الحساب. يرجى المحاولة مرة أخرى.",
            variant: 'destructive',
        });
    }
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
      <Card className="w-full max-w-lg shadow-xl border border-primary/20"> {/* Increased max-width for better spacing */}
        <CardHeader className="items-center text-center p-6 sm:p-8 bg-primary/5 rounded-t-lg">
           <Link href="/" className="mb-4 inline-block">
            <WomenCommerceLogo className="h-16 w-auto" />
          </Link>
          <CardTitle className="text-3xl font-bold text-primary">أنشئي حسابكِ في لمسة ضحى</CardTitle>
          <CardDescription className="text-foreground/80">
            انضمي إلى مجتمعنا من المبدعات والمتسوقات الداعمات.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="p-6 sm:p-8 space-y-6">
              <FormField
                control={control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center mb-1"><User size={16} className="mr-2 text-accent-pink" /> الاسم الكامل</FormLabel>
                    <FormControl><Input placeholder="اسمكِ الكامل" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center mb-1"><Mail size={16} className="mr-2 text-accent-pink" /> عنوان البريد الإلكتروني</FormLabel>
                    <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center mb-1"><KeyRound size={16} className="mr-2 text-accent-pink" /> كلمة المرور</FormLabel>
                    <FormControl><Input type="password" placeholder="اختاري كلمة مرور قوية" {...field} /></FormControl>
                    <FormDescription className="text-xs">يجب أن تحتوي على حروف كبيرة وصغيرة وأرقام ورموز.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center mb-1"><KeyRound size={16} className="mr-2 text-accent-pink" /> تأكيد كلمة المرور</FormLabel>
                    <FormControl><Input type="password" placeholder="أعيدي إدخال كلمة المرور" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="accountType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="flex items-center"><UserPlus size={16} className="mr-2 text-accent-purple" /> نوع الحساب</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0 p-3 border rounded-md cursor-pointer hover:bg-primary/5 flex-1">
                          <FormControl><RadioGroupItem value="customer" id="customer" /></FormControl>
                          <FormLabel htmlFor="customer" className="font-normal flex items-center gap-2 cursor-pointer">
                            <ShoppingBag size={18} className="text-accent-yellow" /> متسوقة (أريد الشراء والاكتشاف)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0 p-3 border rounded-md cursor-pointer hover:bg-primary/5 flex-1">
                          <FormControl><RadioGroupItem value="seller" id="seller" /></FormControl>
                          <FormLabel htmlFor="seller" className="font-normal flex items-center gap-2 cursor-pointer">
                            <Briefcase size={18} className="text-accent-pink"/> مبدعة (أريد البيع/التأجير/تقديم خدمة)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-muted/30">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer">
                        أوافق على شروط الخدمة وسياسة الخصوصية لمنصة لمسة ضحى.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري إنشاء الحساب...
                    </>
                ) : (
                    <>
                        <UserPlus size={18} className="mr-2" /> إنشاء حساب
                    </>
                )}
              </Button>
            </CardContent>
          </form>
        </Form>
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
