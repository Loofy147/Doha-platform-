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
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, Store, Tag, FileText, Sparkles, Handshake } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const productCategories = [
  "أزياء وإكسسوارات",
  "مستلزمات منزلية وديكور",
  "جمال وعناية شخصية",
  "فن ومقتنيات",
  "حلويات ومأكولات شهية",
  "حرف يدوية إبداعية",
  "منتجات للإيجار",
  "خدمات (ورش عمل، استشارات، إلخ)",
  "أخرى",
];

const sellerApplicationSchema = z.object({
  fullName: z.string().min(2, { message: "يجب أن يتكون الاسم الكامل من حرفين على الأقل." }),
  email: z.string().email({ message: "الرجاء إدخال عنوان بريد إلكتروني صالح." }),
  phoneNumber: z.string().regex(/^\+?[0-9\s-]{7,15}$/, { message: 'الرجاء إدخال رقم هاتف صحيح.' }),
  businessName: z.string().min(2, { message: "يجب أن يتكون اسم النشاط التجاري من حرفين على الأقل." }),
  productCategory: z.string({ required_error: "الرجاء اختيار فئة المنتج/الخدمة الرئيسية." }),
  businessDescription: z.string().min(20, { message: "يجب ألا يقل الوصف عن 20 حرفًا." }).max(500, {message: "يجب ألا يتجاوز الوصف 500 حرف."}),
  agreeToTerms: z.boolean().refine(val => val === true, { message: "يجب الموافقة على الشروط والأحكام للمتابعة." }),
});

type SellerApplicationValues = z.infer<typeof sellerApplicationSchema>;

export default function SellWithUsPage() {
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
  } = useForm<SellerApplicationValues>({
    resolver: zodResolver(sellerApplicationSchema),
    defaultValues: {
      agreeToTerms: false,
    }
  });

  const onSubmit: SubmitHandler<SellerApplicationValues> = async (data) => {
    // Simulate API call for application submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Seller Application Submitted:', data);
    toast({
      title: 'تم تقديم طلبك بنجاح!',
      description: "شكرًا لاهتمامك بالبيع على لمسة ضحى. لقد استلمنا طلبك وسنقوم بمراجعته قريبًا. سنتواصل معكِ في أقرب وقت!",
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
              <Store size={32} className="mr-3 text-accent-pink" /> جاري تحميل نموذج التقديم...
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
      <Card className="max-w-2xl mx-auto shadow-xl border border-primary/20">
        <CardHeader className="bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-50 p-8 rounded-t-lg">
          <div className="flex justify-center mb-4">
            <Sparkles size={48} className="text-accent-pink" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary text-center">
            انضمي إلى مبدعات لمسة ضحى!
          </CardTitle>
          <CardDescription className="text-center text-lg text-foreground/80 pt-2">
            اعرضي منتجاتكِ الفريدة، خدماتكِ، أو مقتنياتكِ للإيجار أمام مجتمع داعم. متحمسون لمساعدتكِ في تنمية عملكِ وإبراز لمستكِ الخاصة.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-8 space-y-8">
            {/* Personal Information */}
            <section>
              <h3 className="text-xl font-semibold text-primary mb-4 flex items-center"><User size={22} className="mr-2 text-accent-pink" /> معلوماتكِ الشخصية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName">الاسم الكامل</Label>
                  <Input id="fullName" {...register('fullName')} placeholder="مثال: ضحى الأحمد" />
                  {errors.fullName && <p className="mt-1 text-sm text-destructive">{errors.fullName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">عنوان البريد الإلكتروني</Label>
                  <Input id="email" type="email" {...register('email')} placeholder="you@example.com" />
                  {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phoneNumber">رقم الهاتف</Label>
                  <Input id="phoneNumber" type="tel" {...register('phoneNumber')} placeholder="مثال: 0550123456" />
                  {errors.phoneNumber && <p className="mt-1 text-sm text-destructive">{errors.phoneNumber.message}</p>}
                </div>
              </div>
            </section>

            {/* Business Information */}
            <section>
              <h3 className="text-xl font-semibold text-primary mb-4 flex items-center"><Store size={22} className="mr-2 text-accent-purple" /> تفاصيل لمستكِ الإبداعية</h3>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="businessName">اسم متجركِ / علامتكِ التجارية</Label>
                  <Input id="businessName" {...register('businessName')} placeholder="مثال: لمسات ضحى الفنية" />
                  {errors.businessName && <p className="mt-1 text-sm text-destructive">{errors.businessName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="productCategory" className="flex items-center mb-1"><Tag size={16} className="mr-2 text-accent-yellow" /> فئة المنتج/الخدمة الرئيسية</Label>
                  <Controller
                    name="productCategory"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="productCategory">
                          <SelectValue placeholder="اختاري فئتك الرئيسية" />
                        </SelectTrigger>
                        <SelectContent>
                          {productCategories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.productCategory && <p className="mt-1 text-sm text-destructive">{errors.productCategory.message}</p>}
                </div>
                <div>
                  <Label htmlFor="businessDescription" className="flex items-center mb-1"><FileText size={16} className="mr-2 text-accent-pink" /> أخبرينا عن إبداعكِ، منتجاتكِ، أو خدماتكِ</Label>
                  <Textarea 
                    id="businessDescription" 
                    {...register('businessDescription')} 
                    placeholder="صفي ما تقدمينه من إبداعات/خدمات، مصدر إلهامك، المواد المستخدمة، تفاصيل الخدمة، إلخ. (بحد أقصى 500 حرف)" 
                    rows={5}
                  />
                  {errors.businessDescription && <p className="mt-1 text-sm text-destructive">{errors.businessDescription.message}</p>}
                </div>
              </div>
            </section>
            
            {/* Terms and Conditions */}
            <div className="items-top flex space-x-2 pt-4 border-t">
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
                  لقد قرأت وأوافق على شروط وأحكام البيع في منصة لمسة ضحى.
                </label>
                <p className="text-xs text-muted-foreground">
                  (سيتم توفير رابط لوثيقة الشروط والأحكام هنا في التطبيق الفعلي.)
                </p>
                {errors.agreeToTerms && <p className="text-sm text-destructive">{errors.agreeToTerms.message}</p>}
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-8 border-t bg-secondary/20 rounded-b-lg">
            <Button type="submit" size="lg" className="w-full bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground flex items-center gap-2" disabled={isSubmitting}>
              <Handshake size={20} /> {isSubmitting ? 'جاري تقديم الطلب...' : 'قدمي طلبكِ الآن'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
