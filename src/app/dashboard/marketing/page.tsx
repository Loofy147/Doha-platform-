// src/app/dashboard/marketing/page.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Megaphone, Tag, Percent, CalendarPlus, Sparkles, PlusCircle, Edit, Trash2, BarChart2, Mail, Share2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge'; // Added import for Badge

interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minimumSpend?: number;
  usageLimitTotal?: number;
  usageLimitPerUser?: number;
  applicableTo: 'all' | 'specific_products' | 'specific_categories';
  selectedItems?: string; // Placeholder for product/category IDs/names
  expiryDate?: string;
  isActive: boolean;
  timesUsed: number;
}

interface Sale {
  id: string;
  name: string;
  discountPercentage: number;
  productsOrCategories?: string; // Placeholder
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  totalSalesGenerated: number; // Mock data
}

const initialCoupons: Coupon[] = [
  { id: 'c1', code: 'RAMADAN20', discountType: 'percentage', discountValue: 20, expiryDate: '2024-07-30', isActive: true, timesUsed: 15, applicableTo: 'all', minimumSpend: 1000 },
  { id: 'c2', code: 'NEWUSER500', discountType: 'fixed', discountValue: 500, isActive: true, timesUsed: 25, applicableTo: 'all', usageLimitTotal: 100 },
];

const initialSales: Sale[] = [
  { id: 's1', name: 'تخفيضات نهاية الموسم', discountPercentage: 30, startDate: '2024-06-01', endDate: '2024-06-15', isActive: false, totalSalesGenerated: 150000 },
  { id: 's2', name: 'عروض العيد', discountPercentage: 15, startDate: '2024-06-28', endDate: '2024-07-05', isActive: true, totalSalesGenerated: 0, productsOrCategories: 'فئة الحلويات' },
];


export default function SellerMarketingPage() {
  const { toast } = useToast();
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [sales, setSales] = useState<Sale[]>(initialSales);
  const [isSubmittingCoupon, setIsSubmittingCoupon] = useState(false);
  const [isSubmittingSale, setIsSubmittingSale] = useState(false);

  const handleCreateCoupon = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingCoupon(true);
    const formData = new FormData(e.currentTarget);
    const newCoupon: Coupon = {
      id: `c${coupons.length + 1}`,
      code: formData.get('couponCode') as string,
      discountType: formData.get('discountType') as 'percentage' | 'fixed',
      discountValue: parseFloat(formData.get('discountValue') as string),
      minimumSpend: formData.get('minimumSpend') ? parseFloat(formData.get('minimumSpend') as string) : undefined,
      usageLimitTotal: formData.get('usageLimitTotal') ? parseInt(formData.get('usageLimitTotal') as string) : undefined,
      applicableTo: formData.get('applicableTo') as 'all' | 'specific_products' | 'specific_categories',
      selectedItems: formData.get('selectedItems') as string || undefined,
      expiryDate: formData.get('couponExpiry') as string || undefined,
      isActive: formData.get('couponIsActive') === 'on',
      timesUsed: 0,
    };
    setTimeout(() => {
      setCoupons(prev => [newCoupon, ...prev]);
      toast({
        title: "تم إنشاء كوبون جديد بنجاح (محاكاة)",
        description: `تم إنشاء الكوبون "${newCoupon.code}".`,
      });
      e.currentTarget.reset();
      setIsSubmittingCoupon(false);
    }, 1000);
  };
  
  const handleCreateSale = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingSale(true);
    const formData = new FormData(e.currentTarget);
    const newSale: Sale = {
      id: `s${sales.length + 1}`,
      name: formData.get('saleName') as string,
      discountPercentage: parseFloat(formData.get('saleDiscountPercentage') as string),
      productsOrCategories: formData.get('saleProductsOrCategories') as string || undefined,
      startDate: formData.get('saleStartDate') as string || undefined,
      endDate: formData.get('saleEndDate') as string || undefined,
      isActive: true, 
      totalSalesGenerated: 0,
    };
    setTimeout(() => {
      setSales(prev => [newSale, ...prev]);
      toast({
        title: "تم إنشاء تخفيض جديد بنجاح (محاكاة)",
        description: `تم إنشاء التخفيض "${newSale.name}".`,
      });
      e.currentTarget.reset();
      setIsSubmittingSale(false);
    }, 1000);
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
    toast({ title: "تم حذف الكوبون (محاكاة)", variant: "destructive" });
  }

  const deleteSale = (id: string) => {
    setSales(prev => prev.filter(s => s.id !== id));
    toast({ title: "تم حذف التخفيض (محاكاة)", variant: "destructive" });
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl flex items-center">
          <Megaphone size={36} className="ml-3 text-accent-yellow" /> التسويق والعروض الترويجية
        </h1>
        <p className="mt-2 text-lg text-foreground/80 max-w-2xl">
          عززي مبيعاتكِ واجذبي المزيد من العملاء من خلال إنشاء كوبونات خصم، تخفيضات موسمية، واستخدام أدوات تسويقية فعالة.
        </p>
      </header>

      <Tabs defaultValue="coupons" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-8">
          <TabsTrigger value="coupons" className="text-sm sm:text-base">إدارة الكوبونات</TabsTrigger>
          <TabsTrigger value="sales" className="text-sm sm:text-base">إدارة التخفيضات</TabsTrigger>
          <TabsTrigger value="other-tools" className="text-sm sm:text-base">أدوات تسويقية أخرى</TabsTrigger>
        </TabsList>

        <TabsContent value="coupons">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="shadow-lg sticky top-24">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-xl text-primary flex items-center"><Tag className="ml-2 text-accent-pink"/> إنشاء كوبون خصم جديد</CardTitle>
                  <CardDescription>قدمي خصومات خاصة لعملائكِ باستخدام أكواد فريدة.</CardDescription>
                </CardHeader>
                <form onSubmit={handleCreateCoupon}>
                  <CardContent className="space-y-5 pt-5 max-h-[60vh] overflow-y-auto pr-2">
                    <div><Label htmlFor="couponCode">رمز الكوبون</Label><Input id="couponCode" name="couponCode" placeholder="مثال: LAMSA25" required /></div>
                    <div><Label htmlFor="discountType">نوع الخصم</Label>
                      <Select name="discountType" defaultValue="percentage">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="percentage">نسبة مئوية (%)</SelectItem><SelectItem value="fixed">مبلغ ثابت (دج)</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div><Label htmlFor="discountValue">قيمة الخصم</Label><Input id="discountValue" name="discountValue" type="number" placeholder="مثال: 10 أو 500" required /></div>
                    <div><Label htmlFor="minimumSpend">الحد الأدنى للإنفاق (اختياري - دج)</Label><Input id="minimumSpend" name="minimumSpend" type="number" placeholder="مثال: 5000" /></div>
                    <div><Label htmlFor="usageLimitTotal">إجمالي عدد مرات استخدام الكوبون (اختياري)</Label><Input id="usageLimitTotal" name="usageLimitTotal" type="number" placeholder="مثال: 100" /></div>
                    <div><Label htmlFor="applicableTo">نطاق تطبيق الكوبون</Label>
                      <Select name="applicableTo" defaultValue="all">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">كل المنتجات/الخدمات</SelectItem>
                          <SelectItem value="specific_products">منتجات محددة</SelectItem>
                          <SelectItem value="specific_categories">فئات محددة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div><Label htmlFor="selectedItems">المنتجات/الفئات المحددة (إذا لزم الأمر)</Label><Input id="selectedItems" name="selectedItems" placeholder="أدخلي أسماء أو رموز المنتجات/الفئات مفصولة بفاصلة" /><p className="text-xs text-muted-foreground mt-1">هذه الميزة قيد التطوير الكامل.</p></div>
                    <div><Label htmlFor="couponExpiry">تاريخ انتهاء صلاحية الكوبون (اختياري)</Label><Input id="couponExpiry" name="couponExpiry" type="date" /></div>
                    <div className="flex items-center space-x-2 pt-2"><Switch id="couponIsActive" name="couponIsActive" defaultChecked/><Label htmlFor="couponIsActive" className="text-sm">تفعيل الكوبون فوراً</Label></div>
                  </CardContent>
                  <CardFooter className="border-t pt-5">
                    <Button type="submit" className="w-full bg-accent-pink hover:bg-accent-pink/90 text-accent-pink-foreground" disabled={isSubmittingCoupon}>
                       {isSubmittingCoupon ? <Loader2 className="animate-spin ml-2" size={18}/> : <PlusCircle size={18} className="ml-2" />}
                      {isSubmittingCoupon ? 'جاري الإنشاء...' : 'إنشاء الكوبون'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader><CardTitle className="text-xl text-primary">الكوبونات الحالية ({coupons.length})</CardTitle></CardHeader>
                <CardContent className="max-h-[75vh] overflow-y-auto pr-1">
                  {coupons.length > 0 ? (
                    <ul className="space-y-4">
                      {coupons.map(c => (
                        <li key={c.id} className="p-4 border rounded-md bg-muted/30 hover:bg-muted/50">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-primary">{c.code} <Badge variant={c.isActive ? "default" : "outline"} className={c.isActive ? "bg-green-500 text-white" : ""}>{c.isActive ? 'نشط' : 'غير نشط'}</Badge></p>
                              <p className="text-sm text-muted-foreground">
                                {c.discountType === 'percentage' ? `${c.discountValue}% خصم` : `${c.discountValue} دج خصم`}
                                {c.minimumSpend && ` (عند إنفاق ${c.minimumSpend} دج على الأقل)`}
                              </p>
                              {c.expiryDate && <p className="text-xs text-muted-foreground">ينتهي في: {new Date(c.expiryDate).toLocaleDateString('ar-EG')}</p>}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700"><Edit size={16} /></Button>
                              <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" onClick={() => deleteCoupon(c.id)}><Trash2 size={16} /></Button>
                            </div>
                          </div>
                           <p className="text-xs text-muted-foreground mt-1">مرات الاستخدام: {c.timesUsed} {c.usageLimitTotal && `/ ${c.usageLimitTotal}`}</p>
                        </li>
                      ))}
                    </ul>
                  ) : <p className="text-center text-muted-foreground py-5">لا توجد كوبونات حالياً. ابدئي بإنشاء واحد!</p>}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sales">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="shadow-lg sticky top-24">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="text-xl text-primary flex items-center"><Percent className="ml-2 text-green-500"/> إنشاء تخفيض جديد</CardTitle>
                  <CardDescription>حددي منتجات أو فئات معينة لتطبيق تخفيض عليها لفترة محدودة.</CardDescription>
                </CardHeader>
                <form onSubmit={handleCreateSale}>
                  <CardContent className="space-y-5 pt-5 max-h-[60vh] overflow-y-auto pr-2">
                    <div><Label htmlFor="saleName">اسم العرض/التخفيض</Label><Input id="saleName" name="saleName" placeholder="مثال: تخفيضات نهاية الأسبوع" required /></div>
                    <div><Label htmlFor="saleDiscountPercentage">نسبة الخصم (%)</Label><Input id="saleDiscountPercentage" name="saleDiscountPercentage" type="number" placeholder="مثال: 15" required /></div>
                    <div><Label htmlFor="saleProductsOrCategories">المنتجات/الفئات المستهدفة</Label><Textarea id="saleProductsOrCategories" name="saleProductsOrCategories" placeholder="مثال: كل فئة الأزياء، أو منتجات محددة (قيد التطوير لاختيار مرئي)" rows={2}/><p className="text-xs text-muted-foreground mt-1">سيتم توفير خيار تحديد مرئي للمنتجات/الفئات قريباً.</p></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><Label htmlFor="saleStartDate">تاريخ بدء العرض</Label><Input id="saleStartDate" name="saleStartDate" type="date" /></div>
                      <div><Label htmlFor="saleEndDate">تاريخ انتهاء العرض</Label><Input id="saleEndDate" name="saleEndDate" type="date" /></div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-5">
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isSubmittingSale}>
                      {isSubmittingSale ? <Loader2 className="animate-spin ml-2" size={18}/> : <CalendarPlus size={18} className="ml-2" />}
                      {isSubmittingSale ? 'جاري الإطلاق...' : 'إطلاق التخفيض'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader><CardTitle className="text-xl text-primary">التخفيضات الحالية والمجدولة ({sales.length})</CardTitle></CardHeader>
                <CardContent className="max-h-[75vh] overflow-y-auto pr-1">
                   {sales.length > 0 ? (
                    <ul className="space-y-4">
                      {sales.map(s => (
                        <li key={s.id} className="p-4 border rounded-md bg-muted/30 hover:bg-muted/50">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold text-primary">{s.name} <Badge variant={s.isActive ? "default" : "outline"} className={s.isActive ? "bg-green-500 text-white" : ""}>{s.isActive ? 'نشط' : 'غير نشط/منتهي'}</Badge></p>
                              <p className="text-sm text-muted-foreground">{s.discountPercentage}% خصم</p>
                              {s.startDate && s.endDate && <p className="text-xs text-muted-foreground">من {new Date(s.startDate).toLocaleDateString('ar-EG')} إلى {new Date(s.endDate).toLocaleDateString('ar-EG')}</p>}
                              {s.productsOrCategories && <p className="text-xs text-muted-foreground">يشمل: {s.productsOrCategories}</p>}
                            </div>
                             <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700"><Edit size={16} /></Button>
                              <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700" onClick={() => deleteSale(s.id)}><Trash2 size={16} /></Button>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">إجمالي المبيعات المحققة: {s.totalSalesGenerated.toLocaleString()} دج (محاكاة)</p>
                        </li>
                      ))}
                    </ul>
                  ) : <p className="text-center text-muted-foreground py-5">لا توجد تخفيضات حالياً. ابدئي بإنشاء واحد!</p>}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="other-tools">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-primary flex items-center"><Sparkles className="ml-2 text-accent-purple"/> أدوات تسويقية إضافية لنمو متجركِ</CardTitle>
              <CardDescription>استكشفي طرقًا أخرى لزيادة وصولك وتفاعلك مع العملاء.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card className="p-4 bg-muted/30">
                <div className="flex items-center gap-3">
                    <Mail size={24} className="text-accent-teal"/>
                    <div>
                        <h3 className="font-semibold text-primary">التسويق عبر البريد الإلكتروني (قريباً)</h3>
                        <p className="text-sm text-muted-foreground">أدوات لإنشاء حملات بريدية وإرسال نشرات إخبارية لعملائكِ المشتركين.</p>
                    </div>
                </div>
              </Card>
              <Card className="p-4 bg-muted/30">
                <div className="flex items-center gap-3">
                    <Share2 size={24} className="text-accent-pink"/>
                    <div>
                        <h3 className="font-semibold text-primary">أدوات مشاركة عبر وسائل التواصل (قريباً)</h3>
                        <p className="text-sm text-muted-foreground">سهولة مشاركة منتجاتك وعروضك مباشرة على منصات التواصل الاجتماعي.</p>
                    </div>
                </div>
              </Card>
              <Card className="p-4 bg-muted/30">
                 <div className="flex items-center gap-3">
                    <BarChart2 size={24} className="text-accent-yellow"/>
                    <div>
                        <h3 className="font-semibold text-primary">تحليلات تسويقية متقدمة (قريباً)</h3>
                        <p className="text-sm text-muted-foreground">تقارير مفصلة حول أداء حملاتك التسويقية ومصادر الزيارات.</p>
                    </div>
                </div>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
