'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label'; // Label for direct use
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'; // For RHF
import { useToast } from '@/hooks/use-toast';
import { LogIn, Mail, KeyRound, UserPlus, Loader2 } from 'lucide-react';
import { WomenCommerceLogo } from '@/components/icons/logo'; 
import { useRouter } from 'next/navigation';

const loginFormSchema = z.object({
  email: z.string().email({ message: "الرجاء إدخال عنوان بريد إلكتروني صالح." }),
  password: z.string().min(6, { message: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const { handleSubmit, control, formState: { errors, isSubmitting } } = form;

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      // Simulate API call for login
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simulate login success/failure
      if (data.email === "user@example.com" && data.password === "password123") {
        toast({
          title: 'تم تسجيل الدخول بنجاح!',
          description: "أهلاً بكِ مجددًا في لمسة ضحى! جاري توجيهك...",
          variant: 'default',
        });
        // Redirect to dashboard or home page on success
        router.push('/'); 
      } else if (data.email === "admin@example.com" && data.password === "password123") {
        toast({
          title: 'تم تسجيل دخول المسؤول بنجاح!',
          description: "أهلاً بكِ في لوحة تحكم لمسة ضحى! جاري توجيهك...",
          variant: 'default',
        });
        router.push('/admin');
      } else if (data.email === "seller@example.com" && data.password === "password123") {
        toast({
          title: 'تم تسجيل دخول المبدعة بنجاح!',
          description: "أهلاً بكِ في لوحة تحكم متجرك! جاري توجيهك...",
          variant: 'default',
        });
        router.push('/dashboard');
      } else {
        toast({
          title: 'فشل تسجيل الدخول',
          description: "البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.",
          variant: 'destructive',
        });
      }
      // form.reset(); // Reset only on success or if you want to clear fields on error too
    } catch (error) {
        console.error("Login error:", error);
        toast({
            title: 'خطأ في النظام',
            description: "حدث خطأ غير متوقع. يرجى المحاولة لاحقًا.",
            variant: 'destructive',
        });
    }
  };

  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-50 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="items-center text-center p-8 bg-primary/10">
             <LogIn size={32} className="mb-2 text-accent-pink" />
            <CardTitle className="text-2xl font-bold text-primary">جاري تحميل صفحة الدخول...</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
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
          <CardTitle className="text-3xl font-bold text-primary">أهلاً بعودتكِ!</CardTitle>
          <CardDescription className="text-foreground/80">
            سجلي دخولك للمتابعة إلى حسابك في لمسة ضحى.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="p-6 sm:p-8 space-y-6">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center mb-1">
                      <Mail size={16} className="mr-2 text-accent-pink" /> عنوان البريد الإلكتروني
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center mb-1">
                      <FormLabel className="flex items-center">
                        <KeyRound size={16} className="mr-2 text-accent-pink" /> كلمة المرور
                      </FormLabel>
                      <Link href="/auth/forgot-password" passHref>
                        <Button variant="link" size="sm" className="p-0 h-auto text-xs text-accent-purple hover:underline">
                          هل نسيت كلمة المرور؟
                        </Button>
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        جاري تسجيل الدخول...
                    </>
                ) : (
                    <>
                        <LogIn size={18} className="mr-2" /> تسجيل الدخول
                    </>
                )}
              </Button>
            </CardContent>
          </form>
        </Form>
        <CardFooter className="p-6 sm:p-8 border-t bg-secondary/10 rounded-b-lg">
          <p className="text-sm text-center w-full text-foreground/80">
            ليس لديك حساب؟{' '}
            <Link href="/auth/register" passHref>
              <Button variant="link" className="p-0 h-auto font-semibold text-accent-purple hover:underline">
                <UserPlus size={16} className="mr-1" />إنشاء حساب جديد
              </Button>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
