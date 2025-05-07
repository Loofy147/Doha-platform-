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
import { Settings, Store, Palette, FileText, ShieldCheck, Save, UploadCloud, Info, LinkIcon, Eye, MessageSquare, Percent, Truck, Repeat, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const storeCategories = [
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

const accentColorOptions = [
    { label: "وردي دافئ (افتراضي)", value: "default-pink", hsl: "hsl(var(--accent-pink))" },
    { label: "بنفسجي أنيق", value: "elegant-purple", hsl: "hsl(var(--accent-purple))" },
    { label: "أصفر مشرق", value: "bright-yellow", hsl: "hsl(var(--accent-yellow))" },
    { label: "أخضر زمردي", value: "emerald-green", hsl: "hsl(145 63% 49%)" },
    { label: "أزرق سماوي", value: "sky-blue", hsl: "hsl(202 80% 55%)" },
];

export default function SellerStoreSettingsPage() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [storeData, setStoreData] = useState({
    storeName: "متجر لمسات ضحى النموذجي",
    storeSlug: "lamsat-doha-creations",
    storeCategory: "حرف يدوية إبداعية",
    storeSlogan: "حيث يلتقي الإبداع بالأصالة",
    storeStory: "بدأت رحلتي بشغف صغير في تحويل المواد البسيطة إلى قطع فنية فريدة. كل قطعة في متجري تحمل جزءًا من قلبي وقصتي. أهدف إلى إدخال البهجة والجمال إلى منازلكم من خلال إبداعاتي.",
    logoFile: null as File | null,
    logoPreview: "https://picsum.photos/seed/logo/200/100", // Placeholder
    bannerFile: null as File | null,
    bannerPreview: "https://picsum.photos/seed/banner/1200/300", // Placeholder
    accentColor: "default-pink",
    instagramHandle: "lamsat_doha_official",
    facebookPage: "LamsaDohaPage",
    returnPolicy: "يمكن إرجاع المنتجات خلال 7 أيام من الاستلام بحالتها الأصلية. المنتجات المخصصة غير قابلة للإرجاع.",
    shippingPolicy: "الشحن خلال 3-5 أيام عمل داخل المدينة. تكلفة الشحن تعتمد على المنطقة.",
    rentalTerms: "مدة الإيجار القياسية 3 أيام. يتطلب تأمين مسترد. تطبق رسوم على التأخير أو التلف.",
    customerServiceInfo: "للاستفسارات، يرجى التواصل عبر البريد الإلكتروني support@lamsatdoha.com أو عبر رسائل المنصة.",
    enableOnlineBooking: true,
    showStockLevels: false,
    acceptCustomOrders: true,
    baseCurrency: "DZD",
    defaultCommissionRate: 12, // Example
  });

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setStoreData(prev => ({ ...prev, [name]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        if (name === 'logoFile') setStoreData(prev => ({ ...prev, logoPreview: reader.result as string }));
        if (name === 'bannerFile') setStoreData(prev => ({ ...prev, bannerPreview: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setStoreData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate saving data
    console.log("Store Settings Submitted:", storeData);
    toast({
      title: "تم حفظ إعدادات المتجر بنجاح!",
      description: "لقد تم تحديث تفاصيل متجركِ. قد يستغرق ظهور بعض التغييرات بضع دقائق.",
      variant: 'default',
      className: 'bg-green-500 text-white',
    });
  };

  if (!isClient) {
    // Basic skeleton or loading state for SSR
    return <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 animate-pulse"><div className="h-10 bg-muted rounded w-1/3 mb-8"></div><div className="space-y-8"><div className="h-64 bg-muted rounded-lg"></div><div className="h-80 bg-muted rounded-lg"></div><div className="h-40 bg-muted rounded-lg"></div></div></div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl flex items-center">
            <Settings size={36} className="ml-3 text-accent-pink" /> إعدادات متجركِ الإبداعي
          </h1>
          <p className="mt-2 text-lg text-foreground/80">
            هنا يمكنكِ التحكم في كل تفاصيل متجركِ، من الاسم والشعار إلى السياسات والمظهر العام. اجعليه يعكس لمستكِ الفريدة!
          </p>
        </div>
        <Link href={`/store/${storeData.storeSlug || 'my-mock-store'}`} passHref target="_blank">
          <Button variant="outline" className="border-accent-yellow text-accent-yellow hover:bg-accent-yellow/10">
            <Eye size={18} className="ml-2"/> معاينة المتجر
          </Button>
        </Link>
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
              <Label htmlFor="storeCategory">فئة المتجر الرئيسية</Label>
              <Select name="storeCategory" value={storeData.storeCategory} onValueChange={(value) => handleSelectChange('storeCategory', value)}>
                <SelectTrigger id="storeCategory" className="mt-1">
                  <SelectValue placeholder="اختاري الفئة التي تمثل نشاطكِ" />
                </SelectTrigger>
                <SelectContent>
                  {storeCategories.map(category => (
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

        {/* Store Appearance */}
        <Card id="appearance" className="shadow-xl transition-all hover:shadow-2xl">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-2xl text-primary flex items-center"><Palette className="ml-2 text-accent-yellow" /> مظهر المتجر وهوية العلامة التجارية</CardTitle>
            <CardDescription>اجعلي متجركِ جذابًا بصريًا ويعكس علامتكِ التجارية الفريدة.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div>
                <Label htmlFor="logoFile">شعار المتجر (اختياري)</Label>
                <Input id="logoFile" name="logoFile" type="file" accept="image/*" onChange={handleFileChange} className="mt-1" />
                <p className="text-xs text-muted-foreground mt-1">الأبعاد الموصى بها: 200x200 بكسل. يدعم PNG, JPG.</p>
                {storeData.logoPreview && <img data-ai-hint="store logo" src={storeData.logoPreview} alt="معاينة الشعار" className="mt-2 h-20 w-auto object-contain border rounded-md p-1"/>}
              </div>
              <div>
                <Label htmlFor="bannerFile">بانر المتجر (اختياري)</Label>
                <Input id="bannerFile" name="bannerFile" type="file" accept="image/*" onChange={handleFileChange} className="mt-1" />
                <p className="text-xs text-muted-foreground mt-1">الأبعاد الموصى بها: 1200x300 بكسل. يظهر في أعلى صفحة متجركِ.</p>
                {storeData.bannerPreview && <img data-ai-hint="store banner" src={storeData.bannerPreview} alt="معاينة البانر" className="mt-2 h-20 w-full object-cover border rounded-md p-1"/>}
              </div>
            </div>
            
             <div>
              <Label htmlFor="accentColor">اللون المميز لمتجركِ</Label>
              <Select name="accentColor" value={storeData.accentColor} onValueChange={(value) => handleSelectChange('accentColor', value)}>
                <SelectTrigger id="accentColor" className="mt-1">
                  <SelectValue placeholder="اختاري لونًا يمثل علامتكِ" />
                </SelectTrigger>
                <SelectContent>
                  {accentColorOptions.map(color => (
                    <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                            <span style={{backgroundColor: color.hsl}} className="w-4 h-4 rounded-full border"/>
                            {color.label}
                        </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">سيتم استخدام هذا اللون لتخصيص بعض عناصر واجهة متجركِ.</p>
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
              <Label htmlFor="rentalTerms" className="flex items-center gap-1"><CalendarClock size={16} className="text-muted-foreground"/>شروط تأجير المنتجات (إن وجدت)</Label>
              <Textarea id="rentalTerms" name="rentalTerms" value={storeData.rentalTerms} onChange={handleInputChange} placeholder="مدة الإيجار، مبلغ التأمين، مسؤولية التلف، إجراءات الاستلام والتسليم..." rows={4} className="mt-1"/>
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
                <Label htmlFor="enableOnlineBooking" className="text-sm font-medium flex items-center">
                    <CalendarClock size={18} className="ml-2 text-muted-foreground" /> تفعيل الحجز المباشر للخدمات/الإيجار
                </Label>
                <Switch 
                    id="enableOnlineBooking" 
                    checked={storeData.enableOnlineBooking} 
                    onCheckedChange={(checked) => handleSwitchChange('enableOnlineBooking', checked)}
                />
            </div>
             <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg">
                <Label htmlFor="showStockLevels" className="text-sm font-medium flex items-center">
                    <Info size={18} className="ml-2 text-muted-foreground" /> عرض مستويات المخزون للعملاء
                </Label>
                <Switch 
                    id="showStockLevels" 
                    checked={storeData.showStockLevels} 
                    onCheckedChange={(checked) => handleSwitchChange('showStockLevels', checked)}
                />
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg">
                <Label htmlFor="acceptCustomOrders" className="text-sm font-medium flex items-center">
                    <Sparkles size={18} className="ml-2 text-muted-foreground" /> قبول الطلبات المخصصة
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
                            {/* Add more currencies as needed */}
                        </SelectContent>
                    </Select>
                </div>
                 <div>
                    <Label htmlFor="defaultCommissionRate" className="flex items-center gap-1"><Percent size={16} className="text-muted-foreground"/>العمولة القياسية (للعلم فقط)</Label>
                    <Input id="defaultCommissionRate" name="defaultCommissionRate" type="number" value={storeData.defaultCommissionRate} className="mt-1" disabled />
                     <p className="text-xs text-muted-foreground mt-1">هذه هي نسبة العمولة التي تطبقها المنصة. قد تختلف باختلاف باقة اشتراككِ.</p>
                </div>
            </div>
             <p className="text-sm text-muted-foreground pt-4">سيتم إضافة المزيد من الخيارات المتقدمة قريبًا مثل إدارة فريق العمل وتكاملات إضافية.</p>
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
              <Save className="ml-2 h-5 w-5" /> حفظ كل التغييرات
            </Button>
          </div>
        </CardFooter>
      </form>
    </div>
  );
}
