'use client';

import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; 
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, PackagePlus } from "lucide-react";
import { MOCK_CATEGORIES_FOR_FORMS } from '@/lib/constants/categories';

const productFormSchema = z.object({
  productName: z.string().min(3, { message: "اسم المنتج يجب أن يتكون من 3 أحرف على الأقل." }).max(100, { message: "اسم المنتج طويل جدًا." }),
  productDescription: z.string().min(10, { message: "الوصف يجب أن يكون 10 أحرف على الأقل." }).max(1000, { message: "الوصف طويل جدًا." }).optional(),
  productPrice: z.coerce.number({ invalid_type_error: "السعر يجب أن يكون رقمًا." }).positive({ message: "السعر يجب أن يكون إيجابيًا." }).optional(),
  productCategory: z.string({ required_error: "يرجى تحديد فئة المنتج." }),
  productImages: z.any().optional(), 
});

type ProductFormValues = z.infer<typeof productFormSchema>;

export function NewProductForm() {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            productName: "",
            productDescription: "",
            productCategory: undefined,
        },
    });

    const { handleSubmit, control, formState: { isSubmitting, errors } } = form;

    const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            console.log("Saving new product (simulated):", data);
            toast({
                title: "تم إضافة المنتج بنجاح (محاكاة)",
                description: `تمت إضافة المنتج "${data.productName}" وجاري توجيهك لقائمة المنتجات.`,
                variant: "default",
            });
            router.push('/admin/products');
        } catch (error) {
            console.error("Failed to save product:", error);
            toast({
                title: "فشل حفظ المنتج",
                description: "حدث خطأ أثناء محاولة حفظ المنتج. يرجى المحاولة مرة أخرى.",
                variant: "destructive",
            });
        }
    };

    return (
        <Card className="shadow-xl border border-primary/10">
            <CardHeader className="bg-primary/5">
                <CardTitle className="text-primary flex items-center">
                  <PackagePlus className="mr-2 h-6 w-6 text-accent-pink" /> تفاصيل المنتج/الخدمة الجديدة
                </CardTitle>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-8 pt-6">
                        <FormField
                            control={control}
                            name="productName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>اسم المنتج/الخدمة</FormLabel>
                                    <FormControl>
                                        <Input placeholder="مثال: مزهرية سيراميك مصنوعة يدوياً" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="productDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>الوصف</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="وصف تفصيلي للمنتج/الخدمة، يسلط الضوء على مميزاته..." {...field} rows={4} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <FormField
                                control={control}
                                name="productPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>السعر (دج)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="مثال: 2500" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="productCategory"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>الفئة</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="اختر الفئة المناسبة" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {MOCK_CATEGORIES_FOR_FORMS.map(cat => (
                                                    <SelectItem key={cat.id} value={cat.id}>
                                                        {cat.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={control}
                            name="productImages"
                            render={({ field }) => ( 
                                <FormItem>
                                    <FormLabel>صور المنتج/الخدمة</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="file" 
                                            multiple 
                                            accept="image/*"
                                            onChange={(e) => field.onChange(e.target.files)} 
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        قم بتحميل صورة واحدة أو أكثر للمنتج (بحد أقصى 5 صور).
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="border-t pt-6 flex justify-end gap-3">
                        <Button variant="outline" asChild type="button" disabled={isSubmitting}>
                            <Link href="/admin/products">إلغاء</Link>
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    جاري الحفظ...
                                </>
                            ) : (
                                'حفظ المنتج'
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}
