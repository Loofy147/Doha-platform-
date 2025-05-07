// src/app/dashboard/settings/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Settings, Store, Palette, FileText, ShieldCheck, Save, UploadCloud, Info, LinkIcon, Eye, MessageSquare, Percent, Truck, Repeat, Users, DollarSign, Briefcase } from 'lucide-react'; // Removed CalendarClock, Sparkles
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import type { StoreType } from '@/app/store/[storeId]/page'; // Import StoreType

const platformCategories = [ // General categories for the platform, not store-specific
  "أزياء وإكسسوارات",
  "مستلزمات منزلية وديكور",
  "جمال وعناية شخصية",
  "فن ومقتنيات",
  "حلويات ومأكولات شهية",
  "حرف يدوية إبداعية",
  "منتجات للإيجار (فساتين، معدات)",
  "خدمات (ورش عمل، استشارات، تصميم)",
  "أخرى - حددي بنفسك",
];

// Default store type, in a real app, this would be fetched or set during store creation
const initialStoreType: StoreType = 'general'; 

export default function SellerStoreSettingsPage() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Potentially fetch store type here if it can change or is stored per user
  }, []);

  const [storeData, setStoreData] = useState({
    storeName: "متجر لمسات ضحى النموذجي",
    storeSlug: "lamsat-doha-creations",
    storePlatformCategory: "حرف يدوية إبداعية", // Category on the main platform
    storeSlogan: "حيث يلتقي الإبداع بالأصالة",
    storeStory: "بدأت رحلتي بشغف صغير في تحويل المواد البسيطة إلى قطع فنية فريدة. كل قطعة في متجري تحمل جزءًا من قلبي وقصتي. أهدف إلى إدخال البهجة والجمال إلى منازلكم من خلال إبداعاتي.",
    contactEmail: "contact@lamsatdoha.com",
    contactPhone: "+213555123456",
    instagramHandle: "lamsat_doha_official",
    facebookPage: "LamsaDohaPage",
    returnPolicy: "يمكن إرجاع المنتجات خلال 7 أيام من الاستلام بحالتها الأصلية. المنتجات المخصصة غير قابلة للإرجاع.",
    shippingPolicy: "الشحن خلال 3-5 أيام عمل داخل المدينة. تكلفة الشحن تعتمد على المنطقة.",
    customerServiceInfo: "للاستفسارات، يرجى التواصل عبر البريد الإلكتروني support@lamsatdoha.com أو عبر رسائل المنصة.",
    enableCustomerReviews: true,
    showStockLevels: false,
    acceptCustomOrders: true,
    baseCurrency: "DZD",
    defaultCommissionRate: 12, 
  });
  
  // This state now refers to the chosen template, not managed here directly
  const [currentStoreType, setCurrentStoreType] = useState<StoreType>(initialStoreType);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoreData(prev => ({ ...prev, [name]: value }));
    if (name === "storeName") {
      setStoreData(prev => ({ ...prev, storeSlug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') }));
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setStoreData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setStoreData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("General Store Settings Submitted:", storeData);
    toast({
      title: "تم حفظ إعدادات المتجر العامة بنجاح!",
      description: "لقد تم تحديث التفاصيل العامة لمتجركِ.",
      variant: 'default',
    });
  };

  if (!isClient) {
    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <header className="mb-10">
                <Skeleton className="h-10 w-1/2 mb-2" />
                <Skeleton className="h-6 w-3/4" />
            </header>
            <div className="space-y-10">
                <Card className="shadow-xl">
                    <CardHeader className="bg-primary/5 p-6"><Skeleton className="h-8 w-1/3" /></CardHeader>
                    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full md:col-span-2" />
                        <Skeleton className="h-24 w-full md:col-span-2" />
                    </CardContent>
                </Card>
                 <Card className="shadow-xl">
                    <CardHeader className="bg-primary/5 p-6"><Skeleton className="h-8 w-1/3" /></CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </CardContent>
                </Card>
            </div>
             <CardFooter className="border-t pt-8 mt-10 pb-8 flex justify-end">
                <Skeleton className="h-12 w-32" />
            </CardFooter>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl flex items-center">
            <Settings size={36} className="ml-3 text-accent-pink" /> إعدادات المتجر العامة
          </h1>
          <p className="mt-2 text-lg text-foreground/80">
            هنا يمكنكِ التحكم في المعلومات الأساسية، التواصل، والسياسات العامة لمتجركِ.
          </p>
        </div>
         <Button variant="outline" asChild className="border-accent-purple text-accent-purple hover:bg-accent-purple/10">
            <Link href="/dashboard/store-template">
                <Palette size={18} className="ml-2"/> تخصيص تصميم وقالب المتجر
            </Link>
        </Button>
      </header>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Basic Store Info */}
        <Card id="basic-info" className="shadow-xl transition-all hover:shadow-2xl">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-2xl text-primary flex items-center"><Store className="ml-2 text-accent-purple" /> معلومات المتجر الأساسية</CardTitle>
            <CardDescription>الاسم، الفئة الرئيسية، وكل ما يعرّف الناس بمتجركِ.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            <div>
              <Label htmlFor="storeName">اسم متجركِ (سيظهر للعملاء)</Label>
              <Input id="storeName" name="storeName" value={storeData.storeName} onChange={handleInputChange} placeholder="مثال: إبداعات فنية من القلب" className="mt-1" />
            </div>
             <div>
              <Label htmlFor="storeSlug">رابط المتجر (Slug)</Label>
              <Input id="storeSlug" name="storeSlug" value={storeData.storeSlug} onChange={handleInputChange} placeholder="مثال: ibda3at-faniya" className="mt-1" disabled/>
              <p className="text-xs text-muted-foreground mt-1">يتم إنشاؤه تلقائياً من اسم المتجر. يجب أن يكون فريداً باللغة الإنجليزية.</p>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="storePlatformCategory">فئة المتجر الرئيسية (على المنصة)</Label>
              <Select name="storePlatformCategory" value={storeData.storePlatformCategory} onValueChange={(value) => handleSelectChange('storePlatformCategory', value)}>
                <SelectTrigger id="storePlatformCategory" className="mt-1">
                  <SelectValue placeholder="اختاري الفئة التي تمثل نشاطكِ" />
                </SelectTrigger>
                <SelectContent>
                  {platformCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="storeSlogan">شعار أو نبذة تعريفية قصيرة (Tagline)</Label>
              <Input id="storeSlogan" name="storeSlogan" value={storeData.storeSlogan} onChange={handleInputChange} placeholder="مثال: فن يدوم، جودة تستحقها" maxLength={100} className="mt-1" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="storeStory">قصة متجركِ / نبذة عنا (اختياري)</Label>
              <Textarea id="storeStory" name="storeStory" value={storeData.storeStory} onChange={handleInputChange} placeholder="شاركي العملاء قصتكِ، مصدر إلهامكِ، وما يميز منتجاتكِ أو خدماتكِ..." rows={5} className="mt-1" />
            </div>
          </CardContent>
        </Card>
        
        {/* Contact and Social Media */}
        <Card id="contact-social" className="shadow-xl transition-all hover:shadow-2xl">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-2xl text-primary flex items-center"><MessageSquare className="ml-2 text-accent-yellow" /> معلومات التواصل وحسابات التواصل الاجتماعي</CardTitle>
             <CardDescription>ساعدي عملائكِ على الوصول إليكِ بسهولة.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="contactEmail">البريد الإلكتروني للتواصل</Label>
                    <Input id="contactEmail" name="contactEmail" type="email" value={storeData.contactEmail} onChange={handleInputChange} placeholder="yourstore@example.com" className="mt-1"/>
                </div>
                <div>
                    <Label htmlFor="contactPhone">رقم الهاتف للتواصل (اختياري)</Label>
                    <Input id="contactPhone" name="contactPhone" type="tel" value={storeData.contactPhone} onChange={handleInputChange} placeholder="+213 XXX XXXXXX" className="mt-1"/>
                </div>
            </div>
            <Separator/>
            <div>
              <Label className="text-md font-medium text-foreground">روابط التواصل الاجتماعي (اختياري)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <Label htmlFor="instagramHandle" className="text-xs">حساب إنستغرام</Label>
                  <Input id="instagramHandle" name="instagramHandle" value={storeData.instagramHandle} onChange={handleInputChange} placeholder="YourInstagramHandle" className="mt-1" />
                </div>
                 <div>
                  <Label htmlFor="facebookPage" className="text-xs">صفحة فيسبوك</Label>
                  <Input id="facebookPage" name="facebookPage" value={storeData.facebookPage} onChange={handleInputChange} placeholder="YourFacebookPage" className="mt-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Store Policies */}
        <Card id="policies" className="shadow-xl transition-all hover:shadow-2xl">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-2xl text-primary flex items-center"><FileText className="ml-2 text-accent-pink" /> سياسات المتجر وشروطه</CardTitle>
            <CardDescription>حددي سياسات واضحة لبناء الثقة مع عملائكِ وتجنب أي سوء فهم.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <Label htmlFor="returnPolicy" className="flex items-center gap-1"><Repeat size={16} className="text-muted-foreground"/>سياسة الإرجاع والاستبدال</Label>
              <Textarea id="returnPolicy" name="returnPolicy" value={storeData.returnPolicy} onChange={handleInputChange} placeholder="وضحي شروط الإرجاع، المدة المسموحة، وحالات الاستثناء..." rows={4} className="mt-1"/>
            </div>
            <div>
              <Label htmlFor="shippingPolicy" className="flex items-center gap-1"><Truck size={16} className="text-muted-foreground"/>سياسة الشحن والتوصيل</Label>
              <Textarea id="shippingPolicy" name="shippingPolicy" value={storeData.shippingPolicy} onChange={handleInputChange} placeholder="تكاليف الشحن، المناطق المغطاة، مدة التوصيل المتوقعة..." rows={4} className="mt-1"/>
            </div>
            <div>
              <Label htmlFor="customerServiceInfo" className="flex items-center gap-1"><MessageSquare size={16} className="text-muted-foreground"/>معلومات خدمة العملاء</Label>
              <Textarea id="customerServiceInfo" name="customerServiceInfo" value={storeData.customerServiceInfo} onChange={handleInputChange} placeholder="كيف يمكن للعملاء التواصل معك للاستفسارات والدعم؟" rows={3} className="mt-1"/>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Settings */}
        <Card id="advanced" className="shadow-xl transition-all hover:shadow-2xl">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-2xl text-primary flex items-center"><ShieldCheck className="ml-2 text-green-500" /> إعدادات إضافية وتفضيلات</CardTitle>
            <CardDescription>خيارات إضافية لتخصيص تجربة متجركِ وعملياتك.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
             <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg">
                <Label htmlFor="enableCustomerReviews" className="text-sm font-medium flex items-center">
                    <Star size={18} className="ml-2 text-muted-foreground" /> تفعيل تقييمات العملاء للمنتجات/الخدمات
                </Label>
                <Switch 
                    id="enableCustomerReviews" 
                    checked={storeData.enableCustomerReviews} 
                    onCheckedChange={(checked) => handleSwitchChange('enableCustomerReviews', checked)}
                />
            </div>
             <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg">
                <Label htmlFor="showStockLevels" className="text-sm font-medium flex items-center">
                    <Info size={18} className="ml-2 text-muted-foreground" /> عرض مستويات المخزون للعملاء (للمنتجات المباعة)
                </Label>
                <Switch 
                    id="showStockLevels" 
                    checked={storeData.showStockLevels} 
                    onCheckedChange={(checked) => handleSwitchChange('showStockLevels', checked)}
                />
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg">
                <Label htmlFor="acceptCustomOrders" className="text-sm font-medium flex items-center">
                    <Briefcase size={18} className="ml-2 text-muted-foreground" /> قبول الطلبات المخصصة (إن أمكن لنشاطك)
                </Label>
                <Switch 
                    id="acceptCustomOrders" 
                    checked={storeData.acceptCustomOrders} 
                    onCheckedChange={(checked) => handleSwitchChange('acceptCustomOrders', checked)}
                />
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="baseCurrency" className="flex items-center gap-1"><DollarSign size={16} className="text-muted-foreground"/>العملة الأساسية للمتجر</Label>
                    <Select name="baseCurrency" value={storeData.baseCurrency} onValueChange={(value) => handleSelectChange('baseCurrency', value)}>
                        <SelectTrigger id="baseCurrency" className="mt-1"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="DZD">دينار جزائري (DZD)</SelectItem>
                            <SelectItem value="SAR">ريال سعودي (SAR)</SelectItem>
                            <SelectItem value="AED">درهم إماراتي (AED)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div>
                    <Label htmlFor="defaultCommissionRate" className="flex items-center gap-1"><Percent size={16} className="text-muted-foreground"/>العمولة القياسية (للعلم فقط)</Label>
                    <Input id="defaultCommissionRate" name="defaultCommissionRate" type="number" value={storeData.defaultCommissionRate} className="mt-1" disabled />
                     <p className="text-xs text-muted-foreground mt-1">هذه هي نسبة العمولة التي تطبقها المنصة. قد تختلف باختلاف باقة اشتراككِ.</p>
                </div>
            </div>
          </CardContent>
        </Card>

        <CardFooter className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-card mt-10 pb-8">
            <p className="text-sm text-muted-foreground">
                <Info size={16} className="inline ml-1" /> تذكري أن التحديثات قد تستغرق بضع دقائق لتظهر في متجركِ العام.
            </p>
          <div className="flex gap-3">
            <Button variant="outline" type="button" size="lg" asChild>
                <Link href="/dashboard">إلغاء</Link>
            </Button>
            <Button type="submit" size="lg" className="bg-accent-pink hover:bg-accent-pink/90 text-accent-pink-foreground shadow-md hover:shadow-lg transition-shadow">
              <Save className="ml-2 h-5 w-5" /> حفظ الإعدادات العامة
            </Button>
          </div>
        </CardFooter>
      </form>
    </div>
  );
}
