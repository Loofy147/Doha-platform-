'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SettingsForm() {
    const { toast } = useToast();
    // Add state management for form fields if needed for controlled components
    // e.g., const [platformName, setPlatformName] = useState("لمسة ضحى");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add form submission logic here
        const formData = new FormData(e.currentTarget);
        const platformName = formData.get('platformName');
        console.log("Saving settings (simulated):", { platformName });
        toast({
            title: "تم حفظ الإعدادات (محاكاة)",
            description: "تم تحديث إعدادات المنصة بنجاح.",
            variant: "default",
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>الإعدادات العامة</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="platformName">اسم المنصة</Label>
                            <Input id="platformName" name="platformName" defaultValue="لمسة ضحى" />
                        </div>
                        <div>
                            <Label htmlFor="platformDescription">شعار/وصف المنصة</Label>
                            <Textarea id="platformDescription" name="platformDescription" defaultValue="إبداع يلامس حياتك" rows={2}/>
                        </div>
                        <div>
                            <Label htmlFor="adminEmail">البريد الإلكتروني لجهة الاتصال الإدارية</Label>
                            <Input id="adminEmail" name="adminEmail" type="email" defaultValue="admin@lamsadoha.com" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>العمولة والرسوم</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="defaultCommission">نسبة العمولة الافتراضية (%)</Label>
                            <Input id="defaultCommission" name="defaultCommission" type="number" defaultValue="10" />
                        </div>
                        <div className="flex items-center space-x-2">
                            {/* Use name attribute if Switch is part of the form data */}
                            <Switch id="enableSubscriptionDiscounts" name="enableSubscriptionDiscounts" />
                            <Label htmlFor="enableSubscriptionDiscounts" className="text-sm">تفعيل خصومات العمولة للمبدعات المشتركات</Label>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>إدارة الميزات</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="enableLiveShopping" className="text-sm">تفعيل ميزة التسوق المباشر</Label>
                            <Switch id="enableLiveShopping" name="enableLiveShopping" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="enableAISuggestions" className="text-sm">تفعيل اقتراحات وصف المنتج بالذكاء الاصطناعي</Label>
                            <Switch id="enableAISuggestions" name="enableAISuggestions" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="maintenanceMode" className="text-sm">تفعيل وضع الصيانة</Label>
                            <Switch id="maintenanceMode" name="maintenanceMode" />
                        </div>
                    </CardContent>
                </Card>

                <CardFooter className="border-t pt-6 flex justify-end">
                    <Button type="submit">
                        <Save className="mr-2 h-4 w-4" /> حفظ الإعدادات
                    </Button>
                </CardFooter>
            </div>
        </form>
    );
}
