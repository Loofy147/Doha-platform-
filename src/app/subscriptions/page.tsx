
'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from '@/hooks/use-toast';
import { CalendarPlus, Repeat, User, Mail, Phone, MapPinIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Dummy subscription items - replace with actual items
const subscriptionItems = [
  { id: 'khobz_dar_daily', name: 'Daily Khobz Dar Loaf', description: 'Fresh Khobz Dar delivered to your door every day.' },
  { id: 'pastry_box_weekly', name: 'Weekly Assorted Pastry Box', description: 'A curated selection of our best pastries, delivered weekly.' },
  { id: 'baguette_duo_thrice_weekly', name: 'Baguette Duo (3 times/week)', description: 'Two artisan baguettes delivered Monday, Wednesday, and Friday.' },
  { id: 'weekend_treat_box', name: 'Weekend Treat Box', description: 'Special selection for your weekend indulgence, delivered every Friday.'},
];

const subscriptionFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().regex(/^\+?[0-9\s-]{7,15}$/, { message: 'Please enter a valid phone number.' }),
  deliveryAddress: z.string().min(10, { message: "Delivery address must be at least 10 characters." }),
  selectedPlanId: z.string({ required_error: "Please select a subscription plan." }),
  frequency: z.enum(['daily', 'weekly', 'custom'], { required_error: "Please select a frequency." }),
  customFrequencyDetails: z.string().optional(),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {message: 'Please select a valid start date.'}),
  paymentMethod: z.enum(['cash_on_delivery', 'online_payment'], {required_error: "Please select a payment method."}),
  agreeToTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions." }),
  notes: z.string().optional(),
}).refine(data => data.frequency !== 'custom' || (data.frequency === 'custom' && data.customFrequencyDetails && data.customFrequencyDetails.length > 5), {
  message: "Please provide details for custom frequency.",
  path: ["customFrequencyDetails"],
});

type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;

export default function SubscriptionsPage() {
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
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      agreeToTerms: false,
    }
  });

  const selectedFrequency = watch('frequency');

  const onSubmit: SubmitHandler<SubscriptionFormValues> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Subscription Request Submitted:', data);
    toast({
      title: 'Subscription Request Sent!',
      description: "Thank you! We've received your subscription request and will contact you soon to confirm details and payment.",
      variant: 'default',
    });
    reset();
  };

  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader className="bg-primary/10">
            <CardTitle className="text-3xl font-bold text-primary flex items-center justify-center">
              <CalendarPlus size={32} className="mr-3 text-accent" /> Loading Subscription Form...
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="h-10 bg-muted rounded animate-pulse w-full"></div>
            <div className="h-10 bg-muted rounded animate-pulse w-full"></div>
            <div className="h-20 bg-muted rounded animate-pulse w-full"></div>
            <div className="h-12 bg-muted rounded animate-pulse w-1/2 mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader className="bg-primary/10">
          <CardTitle className="text-3xl font-bold text-primary flex items-center justify-center">
            <CalendarPlus size={32} className="mr-3 text-accent" /> Subscribe to Fresh Bakes
          </CardTitle>
          <CardDescription className="text-center text-lg text-foreground/80 pt-2">
            Never run out of your favorite treats! Set up a recurring order and enjoy fresh bakes delivered to your schedule.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-8 space-y-8">
            {/* Personal Information */}
            <section>
              <h3 className="text-xl font-semibold text-primary mb-4">Your Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" className="flex items-center mb-1"><User size={16} className="mr-2 text-accent" /> Full Name</Label>
                  <Input id="fullName" {...register('fullName')} placeholder="Your full name" />
                  {errors.fullName && <p className="mt-1 text-sm text-destructive">{errors.fullName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="flex items-center mb-1"><Mail size={16} className="mr-2 text-accent" /> Email Address</Label>
                  <Input id="email" type="email" {...register('email')} placeholder="your@email.com" />
                  {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="flex items-center mb-1"><Phone size={16} className="mr-2 text-accent" /> Phone Number</Label>
                  <Input id="phoneNumber" type="tel" {...register('phoneNumber')} placeholder="+213 XXX XX XX XX" />
                  {errors.phoneNumber && <p className="mt-1 text-sm text-destructive">{errors.phoneNumber.message}</p>}
                </div>
                <div>
                  <Label htmlFor="deliveryAddress" className="flex items-center mb-1"><MapPinIcon size={16} className="mr-2 text-accent" /> Delivery Address</Label>
                  <Input id="deliveryAddress" {...register('deliveryAddress')} placeholder="Your full delivery address" />
                  {errors.deliveryAddress && <p className="mt-1 text-sm text-destructive">{errors.deliveryAddress.message}</p>}
                </div>
              </div>
            </section>

            {/* Subscription Plan */}
            <section>
              <h3 className="text-xl font-semibold text-primary mb-4">Choose Your Plan</h3>
              <Controller
                name="selectedPlanId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="selectedPlanId">
                      <SelectValue placeholder="Select a subscription plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {subscriptionItems.map(item => (
                        <SelectItem key={item.id} value={item.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-xs text-muted-foreground">{item.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.selectedPlanId && <p className="mt-1 text-sm text-destructive">{errors.selectedPlanId.message}</p>}
            </section>

            {/* Frequency and Start Date */}
            <section>
              <h3 className="text-xl font-semibold text-primary mb-4">Frequency & Start Date</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="frequency" className="flex items-center mb-1"><Repeat size={16} className="mr-2 text-accent" /> Delivery Frequency</Label>
                  <Controller
                    name="frequency"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="frequency">
                            <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly (e.g., every Monday)</SelectItem>
                            <SelectItem value="custom">Custom (Specify below)</SelectItem>
                        </SelectContent>
                        </Select>
                    )}
                    />
                  {errors.frequency && <p className="mt-1 text-sm text-destructive">{errors.frequency.message}</p>}
                </div>
                <div>
                  <Label htmlFor="startDate" className="flex items-center mb-1"><CalendarDays size={16} className="mr-2 text-accent" /> Preferred Start Date</Label>
                  <Input id="startDate" type="date" {...register('startDate')} min={new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]} />
                  {errors.startDate && <p className="mt-1 text-sm text-destructive">{errors.startDate.message}</p>}
                </div>
              </div>
              {selectedFrequency === 'custom' && (
                <div className="mt-4">
                  <Label htmlFor="customFrequencyDetails">Custom Frequency Details</Label>
                  <Textarea id="customFrequencyDetails" {...register('customFrequencyDetails')} placeholder="e.g., Every Tuesday and Friday, or first Sunday of the month" />
                  {errors.customFrequencyDetails && <p className="mt-1 text-sm text-destructive">{errors.customFrequencyDetails.message}</p>}
                </div>
              )}
            </section>

            {/* Payment Method */}
            <section>
              <h3 className="text-xl font-semibold text-primary mb-4">Payment Method</h3>
               <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                    <Label htmlFor="cash_on_delivery" className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-accent/10 data-[state=checked]:bg-accent/20 data-[state=checked]:border-accent">
                      <RadioGroupItem value="cash_on_delivery" id="cash_on_delivery" className="mr-2" />
                      Cash on Delivery
                    </Label>
                    <Label htmlFor="online_payment" className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-accent/10 data-[state=checked]:bg-accent/20 data-[state=checked]:border-accent">
                      <RadioGroupItem value="online_payment" id="online_payment" className="mr-2" />
                      Online Payment (Coming Soon)
                    </Label>
                  </RadioGroup>
                )}
              />
              {errors.paymentMethod && <p className="mt-1 text-sm text-destructive">{errors.paymentMethod.message}</p>}
            </section>
            
            {/* Notes and Terms */}
            <section>
                <Label htmlFor="notes" className="text-lg font-medium text-primary mb-1">Additional Notes (Optional)</Label>
                <Textarea id="notes" {...register('notes')} placeholder="Any allergies, preferences, or delivery notes?"/>
            </section>

            <div className="items-top flex space-x-2">
               <Controller
                name="agreeToTerms"
                control={control}
                render={({ field }) => (
                    <Checkbox
                        id="agreeToTerms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                )}
                />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="agreeToTerms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the subscription terms and conditions. (Details will be provided upon confirmation.)
                </label>
                {errors.agreeToTerms && <p className="text-sm text-destructive">{errors.agreeToTerms.message}</p>}
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-8 border-t">
            <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting}>
              {isSubmitting ? 'Sending Request...' : 'Request Subscription'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
