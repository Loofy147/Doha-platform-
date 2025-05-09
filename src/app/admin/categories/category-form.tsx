'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PlusCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categoryFormSchema = z.object({
  categoryName: z.string().min(2, { message: "اسم الفئة يجب أن يتكون من حرفين على الأقل." }).max(50, { message: "اسم الفئة يجب ألا يتجاوز 50 حرفًا." }),
  categorySlug: z.string().optional().refine(slug => !slug || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug), {
    message: "المعرف يجب أن يحتوي فقط على أحرف إنجليزية صغيرة وأرقام وفواصل (-)."
  }),
  categoryDescription: z.string().max(200, { message: "الوصف يجب ألا يتجاوز 200 حرف." }).optional(),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export function CategoryForm() {
  const { toast } = useToast();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      categoryName: "",
      categorySlug: "",
      categoryDescription: "",
    },
  });

  const { handleSubmit, control, formState: { isSubmitting, errors } } = form;

  const onSubmit: SubmitHandler<CategoryFormValues> = async (data) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Adding category (simulated):", data);
      toast({
        title: "تم إضافة الفئة بنجاح (محاكاة)",
        description: `تمت إضافة الفئة "${data.categoryName}" بنجاح.`,
        variant: "default",
      });
      form.reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Failed to add category:", error);
      toast({
        title: "فشل إضافة الفئة",
        description: "حدث خطأ ما أثناء محاولة إضافة الفئة. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-lg border border-primary/10">
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex items-center text-primary">
          <PlusCircle className="mr-2 h-5 w-5 text-accent-pink" /> إضافة فئة جديدة
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-6">
            <FormField
              control={control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم الفئة</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: مشغولات يدوية فنية" {...field} />
                  </FormControl>
                  <FormDescription>
                    اسم وصفي وواضح للفئة.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="categorySlug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المعرف (صديق لمحركات البحث - اختياري)</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: handicrafts-art" {...field} />
                  </FormControl>
                  <FormDescription>
                    إذا ترك فارغًا، سيتم إنشاؤه تلقائيًا من اسم الفئة.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="categoryDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الوصف (اختياري)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="وصف موجز وجذاب للفئة..." {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري الإضافة...
                </>
              ) : (
                'إضافة الفئة'
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
