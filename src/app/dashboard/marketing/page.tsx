// src/app/dashboard/marketing/page.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Megaphone, Tag, Percent, CalendarPlus, Sparkles, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function SellerMarketingPage() {
  const { toast } = useToast();

  const handleCreateCoupon = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const couponCode = formData.get('couponCode');
    toast({
      title: "تم إنشاء كوبون جديد (محاكاة)",
      description: `تم إنشاء الكوبون "${couponCode}" بنجاح.`,
    });
    e.currentTarget.reset();
  };
  
  const handleCreateSale = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const saleName = formData.get('saleName');
    toast({
      title: "تم إنشاء تخفيض جديد (محاكاة)",
      description: `تم إنشاء التخفيض "${saleName}" بنجاح.`,
    });
     e.currentTarget.reset();
  };


  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl flex items-center">
          <Megaphone size={36} className="ml-3 text-accent-yellow" /> التسويق والعروض الترويجية
        </h1>
        <p className="mt-2 text-lg text-foreground/80">
          عززي مبيعاتكِ واجذبي المزيد من العملاء من خلال إنشاء كوبونات خصم وعروض خاصة لمنتجاتكِ وخدماتكِ.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Create Coupon Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-center"><Tag className="ml-2 text-accent-pink"/> إنشاء كوبون خصم جديد</CardTitle>
            <CardDescription>قدمي خصومات خاصة لعملائكِ باستخدام أكواد فريدة.</CardDescription>
          </CardHeader>
          <form onSubmit={handleCreateCoupon}>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="couponCode">رمز الكوبون</Label>
                <Input id="couponCode" name="couponCode" placeholder="مثال: LAMSA20" required />
              </div>
              <div>
                <Label htmlFor="discountType">نوع الخصم</Label>
                <select id="discountType" name="discountType" className="w-full mt-1 p-2 border rounded-md bg-input">
                    <option value="percentage">نسبة مئوية (%)</option>
                    <option value="fixed">مبلغ ثابت (دج)</option>
                </select>
              </div>
              <div>
                <Label htmlFor="discountValue">قيمة الخصم</Label>
                <Input id="discountValue" name="discountValue" type="number" placeholder="مثال: 10 أو 500" required />
              </div>
              <div>
                <Label htmlFor="couponExpiry">تاريخ انتهاء صلاحية الكوبون (اختياري)</Label>
                <Input id="couponExpiry" name="couponExpiry" type="date" />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch id="couponIsActive" name="couponIsActive" defaultChecked/>
                <Label htmlFor="couponIsActive" className="text-sm">تفعيل الكوبون فوراً</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-accent-pink hover:bg-accent-pink/90 text-accent-pink-foreground">
                <PlusCircle size={18} className="ml-2" /> إنشاء الكوبون
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Create Sale/Promotion Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-center"><Percent className="ml-2 text-green-500"/> إنشاء تخفيض على منتجات/خدمات</CardTitle>
            <CardDescription>حددي منتجات أو فئات معينة لتطبيق تخفيض عليها لفترة محدودة.</CardDescription>
          </CardHeader>
           <form onSubmit={handleCreateSale}>
            <CardContent className="space-y-4">
               <div>
                <Label htmlFor="saleName">اسم العرض/التخفيض</Label>
                <Input id="saleName" name="saleName" placeholder="مثال: تخفيضات نهاية الأسبوع" required />
              </div>
              <div>
                <Label htmlFor="saleDiscountPercentage">نسبة الخصم (%)</Label>
                <Input id="saleDiscountPercentage" name="saleDiscountPercentage" type="number" placeholder="مثال: 15" required />
              </div>
              <div>
                <Label htmlFor="saleProducts">المنتجات/الفئات المستهدفة (قيد التطوير)</Label>
                <Input id="saleProducts" name="saleProducts" placeholder="اختاري منتجات أو فئات محددة" disabled />
                 <p className="text-xs text-muted-foreground mt-1">سيتم توفير خيار تحديد المنتجات/الفئات قريباً.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="saleStartDate">تاريخ بدء العرض</Label>
                    <Input id="saleStartDate" name="saleStartDate" type="date" />
                </div>
                <div>
                    <Label htmlFor="saleEndDate">تاريخ انتهاء العرض</Label>
                    <Input id="saleEndDate" name="saleEndDate" type="date" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                <CalendarPlus size={18} className="ml-2" /> إطلاق التخفيض
              </Button>
            </CardFooter>
           </form>
        </Card>
      </div>

      {/* List of Active Promotions/Coupons (Placeholder) */}
      <Card className="mt-12 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center"><Sparkles className="ml-2 text-accent-purple"/> العروض والكوبونات النشطة حالياً</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40 flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg">
            <p className="text-muted-foreground">لا توجد عروض أو كوبونات نشطة حالياً (عرض تجريبي). قومي بإنشاء واحدة!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}