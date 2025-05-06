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
import { LogIn, Mail, KeyRound, UserPlus } from 'lucide-react';
import { WomenCommerceLogo } from '@/components/icons/logo';

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
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
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    // Simulate API call for login
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Login Attempt:', data);
    toast({
      title: 'Login Successful (Simulated)',
      description: "Welcome back to WomenCommerce!",
      variant: 'default',
    });
    reset();
  };

  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-50 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="items-center text-center p-8 bg-primary/10">
             <LogIn size={32} className="mb-2 text-accent-pink" />
            <CardTitle className="text-2xl font-bold text-primary">Loading Login...</CardTitle>
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
          <CardTitle className="text-3xl font-bold text-primary">Welcome Back!</CardTitle>
          <CardDescription className="text-foreground/80">
            Sign in to continue to your WomenCommerce account.
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
            <div>
              <div className="flex justify-between items-center mb-1">
                <Label htmlFor="password" className="flex items-center">
                  <KeyRound size={16} className="mr-2 text-accent-pink" /> Password
                </Label>
                <Link href="/auth/forgot-password" passHref>
                  <Button variant="link" size="sm" className="p-0 h-auto text-xs text-accent-purple hover:underline">
                    Forgot Password?
                  </Button>
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                {...register('password')} 
                placeholder="••••••••" 
                className={errors.password ? 'border-destructive' : ''}
              />
              {errors.password && <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground" disabled={isSubmitting}>
              <LogIn size={18} className="mr-2" /> {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </CardContent>
        </form>
        <CardFooter className="p-6 sm:p-8 border-t bg-secondary/10 rounded-b-lg">
          <p className="text-sm text-center w-full text-foreground/80">
            Don't have an account?{' '}
            <Link href="/auth/register" passHref>
              <Button variant="link" className="p-0 h-auto font-semibold text-accent-purple hover:underline">
                <UserPlus size={16} className="mr-1" />Sign Up
              </Button>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
