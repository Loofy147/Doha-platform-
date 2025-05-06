'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { WomenCommerceLogo } from '@/components/icons/logo';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address to reset your password." }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Password Reset Request:', data.email);
    toast({
      title: 'Password Reset Email Sent (Simulated)',
      description: "If an account exists for this email on WomenCommerce, you'll receive instructions to reset your password shortly.",
      variant: 'default',
    });
    reset();
  };

   if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-50 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="items-center text-center p-8 bg-primary/10">
             <Mail size={32} className="mb-2 text-accent-pink" />
            <CardTitle className="text-2xl font-bold text-primary">Loading Form...</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
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
          <CardTitle className="text-3xl font-bold text-primary">Forgot Your Password?</CardTitle>
          <CardDescription className="text-foreground/80">
            No worries! Enter your email below and we'll send you a link to reset it for your WomenCommerce account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div>
              <Label htmlFor="email" className="flex items-center mb-1">
                <Mail size={16} className="mr-2 text-accent-pink" /> Email Address
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
            <Button type="submit" className="w-full bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground" disabled={isSubmitting}>
              <Send size={18} className="mr-2" /> {isSubmitting ? 'Sending Link...' : 'Send Reset Link'}
            </Button>
          </CardContent>
        </form>
        <CardFooter className="p-6 sm:p-8 border-t bg-secondary/10 rounded-b-lg">
          <Link href="/auth/login" passHref>
            <Button variant="link" className="p-0 h-auto text-sm text-accent-purple hover:underline w-full justify-center">
              <ArrowLeft size={16} className="mr-1" /> Back to Login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
