'use client';

import React from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Keep for non-RHF labels if any
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const settingsFormSchema = z.object({
  platformName: z.string().min(3, { message: "اسم المنصة يجب ألا يقل عن 3 أحرف." }).max(50, { message: "اسم المنصة طويل جدًا." }),
  platformDescription: z.string().max(250, { message: "الوصف طويل جدًا." }).optional(),
  adminEmail: z.string().email({ message: "الرجاء إدخال بريد إلكتروني صالح." }),
  defaultCommission: z.coerce.number().min(0, { message: "العمولة لا يمكن أن تكون سالبة."}).max(100, { message: "العمولة لا يمكن أن تتجاوز 100%."}),
  enableSubscriptionDiscounts: z.boolean().optional(),
  enableLiveShopping: z.boolean().optional(),
  enableAISuggestions: z.boolean().optional(),
  maintenanceMode: z.boolean().optional(),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export function SettingsForm() {
    const { toast } = useToast();
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(settingsFormSchema),
        defaultValues: { // Fetch these from backend in a real app
            platformName: "لمسة ضحى",
            platformDescription: "إبداع يلامس حياتك",
            adminEmail: "admin@lamsadoha.com",
            defaultCommission: 10,
            enableSubscriptionDiscounts: false,
            enableLiveShopping: true,
            enableAISuggestions: true,
            maintenanceMode: false,
        },
    });

    const { handleSubmit, control, formState: { isSubmitting, errors } } = form;

    const onSubmit: SubmitHandler<SettingsFormValues> = async (data) => {
        try {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
          console.log("Saving settings (simulated):", data);
          toast({
              title: "تم حفظ الإعدادات بنجاح (محاكاة)",
              description: "تم تحديث إعدادات المنصة بنجاح.",
              variant: "default",
          });
        } catch (error) {
            console.error("Failed to save settings:", error);
            toast({
              title: "فشل حفظ الإعدادات",
              description: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
              variant: "destructive",
            });
        }
    };

    return (
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
                <Card className="shadow-lg border border-primary/10">
                    <CardHeader className="bg-primary/5">
                        <CardTitle className="text-primary">الإعدادات العامة</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                        <FormField
                            control={control}
                            name="platformName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>اسم المنصة</FormLabel>
                                    <FormControl><Input {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="platformDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>شعار/وصف المنصة</FormLabel>
                                    <FormControl><Textarea {...field} rows={2} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="adminEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>البريد الإلكتروني لجهة الاتصال الإدارية</FormLabel>
                                    <FormControl><Input type="email" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card className="shadow-lg border border-primary/10">
                    <CardHeader className="bg-primary/5">
                        <CardTitle className="text-primary">العمولة والرسوم</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                         <FormField
                            control={control}
                            name="defaultCommission"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>نسبة العمولة الافتراضية (%)</FormLabel>
                                    <FormControl><Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))}/></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="enableSubscriptionDiscounts"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-muted/30">
                                    <div className="space-y-0.5">
                                        <FormLabel>تفعيل خصومات العمولة للمبدعات المشتركات</FormLabel>
                                    </div>
                                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <Card className="shadow-lg border border-primary/10">
                    <CardHeader className="bg-primary/5">
                        <CardTitle className="text-primary">إدارة الميزات</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-6">
                       <FormField
                            control={control}
                            name="enableLiveShopping"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-muted/30">
                                    <FormLabel>تفعيل ميزة التسوق المباشر</FormLabel>
                                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="enableAISuggestions"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-muted/30">
                                    <FormLabel>تفعيل اقتراحات وصف المنتج بالذكاء الاصطناعي</FormLabel>
                                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="maintenanceMode"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-muted/30">
                                    <FormLabel>تفعيل وضع الصيانة</FormLabel>
                                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>

                <CardFooter className="border-t pt-6 flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                جاري الحفظ...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" /> حفظ الإعدادات
                            </>
                        )}
                    </Button>
                </CardFooter>
            </div>
        </form>
      </Form>
    );
}
