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
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Mail, KeyRound, User, LogIn } from 'lucide-react';
import { AlNisaaMarketLogo } from '@/components/icons/logo';

const registrationFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter."})
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter."})
    .regex(/[0-9]/, { message: "Password must contain at least one number."})
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character."}),
  confirmPassword: z.string().min(1, { message: "Please confirm your password." }),
  agreeToTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions to register." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Set error on confirmPassword field
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
    // Simulate API call for registration
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Registration Attempt:', data);
    // In a real app, handle successful registration or show errors
    toast({
      title: 'Registration Successful (Simulated)',
      description: "Welcome to AlNisaaMarket! Please check your email to verify your account.",
      variant: 'default',
    });
    // router.push('/auth/login'); // Example redirect
    reset();
  };

  if (!isClient) {
     return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-50 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="items-center text-center p-8 bg-primary/10">
             <UserPlus size={32} className="mb-2 text-accent-pink" />
            <CardTitle className="text-2xl font-bold text-primary">Loading Registration...</CardTitle>
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
            <AlNisaaMarketLogo className="h-16 w-auto" />
          </Link>
          <CardTitle className="text-3xl font-bold text-primary">Create Your Account</CardTitle>
          <CardDescription className="text-foreground/80">
            Join our community of talented women and supportive shoppers.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div>
              <Label htmlFor="fullName" className="flex items-center mb-1">
                <User size={16} className="mr-2 text-accent-pink" /> Full Name
              </Label>
              <Input 
                id="fullName" 
                {...register('fullName')} 
                placeholder="Your full name" 
                className={errors.fullName ? 'border-destructive' : ''}
              />
              {errors.fullName && <p className="mt-1 text-sm text-destructive">{errors.fullName.message}</p>}
            </div>
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
              <Label htmlFor="password" className="flex items-center mb-1">
                <KeyRound size={16} className="mr-2 text-accent-pink" /> Password
              </Label>
              <Input 
                id="password" 
                type="password" 
                {...register('password')} 
                placeholder="Choose a strong password" 
                className={errors.password ? 'border-destructive' : ''}
              />
              {errors.password && <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>}
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="flex items-center mb-1">
                <KeyRound size={16} className="mr-2 text-accent-pink" /> Confirm Password
              </Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                {...register('confirmPassword')} 
                placeholder="Re-enter your password" 
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
                  I agree to the AlNisaaMarket Terms of Service and Privacy Policy.
                </label>
                 {errors.agreeToTerms && <p className="text-sm text-destructive">{errors.agreeToTerms.message}</p>}
              </div>
            </div>
            <Button type="submit" className="w-full bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground" disabled={isSubmitting}>
              <UserPlus size={18} className="mr-2" /> {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </CardContent>
        </form>
        <CardFooter className="p-6 sm:p-8 border-t bg-secondary/10 rounded-b-lg">
          <p className="text-sm text-center w-full text-foreground/80">
            Already have an account?{' '}
            <Link href="/auth/login" passHref>
               <Button variant="link" className="p-0 h-auto font-semibold text-accent-purple hover:underline">
                <LogIn size={16} className="mr-1" />Sign In
              </Button>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}