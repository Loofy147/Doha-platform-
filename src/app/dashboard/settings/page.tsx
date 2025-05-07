'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Settings, Store, Palette, FileText, ShieldCheck, Save, UploadCloud, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

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
    { label: "وردي دافئ (افتراضي)", value: "default-pink" },
    { label: "بنفسجي أنيق", value: "elegant-purple" },
    { label: "أصفر مشرق", value: "bright-yellow" },
    { label: "أخضر طبيعي", value: "natural-green" },
    { label: "أزرق هادئ", value: "calm-blue" },
];

export default function SellerStoreSettingsPage() {
  const { toast } = useToast();
  // Mock initial store data - in a real app, this would be fetched
  const [storeData, setStoreData] = useState({
    storeName: "متجر لمسات ضحى النموذجي",
    storeCategory: "حرف يدوية إبداعية",
    storeSlogan: "حيث يلتقي الإبداع بالأصالة",
    storeStory: "بدأت رحلتي بشغف صغير في تحويل المواد البسيطة إلى قطع فنية فريدة. كل قطعة في متجري تحمل جزءًا من قلبي وقصتي. أهدف إلى إدخال البهجة والجمال إلى منازلكم من خلال إبداعاتي.",
    logoFile: null as File | null,
    bannerFile: null as File | null,
    accentColor: "default-pink",
    returnPolicy: "يمكن إرجاع المنتجات خلال 7 أيام من الاستلام بحالتها الأصلية. المنتجات المخصصة غير قابلة للإرجاع.",
    shippingPolicy: "الشحن خلال 3-5 أيام عمل داخل المدينة. تكلفة الشحن تعتمد على المنطقة.",
    rentalTerms: "مدة الإيجار القياسية 3 أيام. يتطلب تأمين مسترد. تطبق رسوم على التأخير أو التلف.",
    enableOnlineBooking: true,
    showStockLevels: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement; // Type assertion
    const { name, value } = target;
    setStoreData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setStoreData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setStoreData(prev => ({ ...prev, [name]: files[0] }));
    }
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setStoreData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Store Settings Submitted:", storeData);
    toast({
      title: "تم حفظ إعدادات المتجر بنجاح!",
      description: "لقد تم تحديث تفاصيل متجركِ. قد يستغرق ظهور بعض التغييرات بضع دقائق.",
      variant: 'default',
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl flex items-center">
          <Settings size={36} className="ml-3 text-accent-pink" /> إعدادات متجركِ الإبداعي
        </h1>
        <p className="mt-2 text-lg text-foreground/80">
          هنا يمكنكِ التحكم في كل تفاصيل متجركِ، من الاسم والشعار إلى السياسات والمظهر العام. اجعليه يعكس لمستكِ الفريدة!
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Store Info */}
        <Card id="basic-info" className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-center"><Store className="ml-2 text-accent-purple" /> معلومات المتجر الأساسية</CardTitle>
            <CardDescription>الاسم، الفئة الرئيسية، وكل ما يعرف الناس بمتجركِ.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="storeName">اسم متجركِ (سيظهر للعملاء)</Label>
              <Input id="storeName" name="storeName" value={storeData.storeName} onChange={handleInputChange} placeholder="مثال: إبداعات فنية من القلب" />
            </div>
            <div>
              <Label htmlFor="storeCategory">فئة المتجر الرئيسية</Label>
              <Select name="storeCategory" value={storeData.storeCategory} onValueChange={(value) => handleSelectChange('storeCategory', value)}>
                <SelectTrigger id="storeCategory">
                  <SelectValue placeholder="اختاري الفئة التي تمثل نشاطكِ" />
                </SelectTrigger>
                <SelectContent>
                  {storeCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Store Appearance */}
        <Card id="appearance" className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-center"><Palette className="ml-2 text-accent-yellow" /> مظهر المتجر وهوية العلامة التجارية</CardTitle>
            <CardDescription>اجعلي متجركِ جذابًا بصريًا ويعكس علامتكِ التجارية الفريدة.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="logoFile">شعار المتجر (اختياري)</Label>
                <Input id="logoFile" name="logoFile" type="file" accept="image/*" onChange={handleFileChange} />
                <p className="text-xs text-muted-foreground mt-1">الأبعاد الموصى بها: 200x200 بكسل. يدعم PNG, JPG.</p>
                {storeData.logoFile && <p className="text-xs text-green-600 mt-1">تم اختيار: {storeData.logoFile.name}</p>}
              </div>
              <div>
                <Label htmlFor="bannerFile">بانر المتجر (اختياري)</Label>
                <Input id="bannerFile" name="bannerFile" type="file" accept="image/*" onChange={handleFileChange} />
                <p className="text-xs text-muted-foreground mt-1">الأبعاد الموصى بها: 1200x300 بكسل. يظهر في أعلى صفحة متجركِ.</p>
                 {storeData.bannerFile && <p className="text-xs text-green-600 mt-1">تم اختيار: {storeData.bannerFile.name}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="storeSlogan">شعار أو نبذة تعريفية قصيرة (Tagline)</Label>
              <Input id="storeSlogan" name="storeSlogan" value={storeData.storeSlogan} onChange={handleInputChange} placeholder="مثال: فن يدوم، جودة تستحقها" maxLength={100} />
            </div>
            <div>
              <Label htmlFor="storeStory">قصة متجركِ / نبذة عنا (اختياري)</Label>
              <Textarea id="storeStory" name="storeStory" value={storeData.storeStory} onChange={handleInputChange} placeholder="شاركي العملاء قصتكِ، مصدر إلهامكِ، وما يميز منتجاتكِ أو خدماتكِ..." rows={5} />
            </div>
             <div>
              <Label htmlFor="accentColor">اللون المميز لمتجركِ (لتخصيص بعض العناصر)</Label>
              <Select name="accentColor" value={storeData.accentColor} onValueChange={(value) => handleSelectChange('accentColor', value)}>
                <SelectTrigger id="accentColor">
                  <SelectValue placeholder="اختاري لونًا يمثل علامتكِ" />
                </SelectTrigger>
                <SelectContent>
                  {accentColorOptions.map(color => (
                    <SelectItem key={color.value} value={color.value}>{color.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Store Policies */}
        <Card id="policies" className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-center"><FileText className="ml-2 text-accent-pink" /> سياسات المتجر وشروطه</CardTitle>
            <CardDescription>حددي سياسات واضحة لبناء الثقة مع عملائكِ وتجنب أي سوء فهم.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="returnPolicy">سياسة الإرجاع والاستبدال</Label>
              <Textarea id="returnPolicy" name="returnPolicy" value={storeData.returnPolicy} onChange={handleInputChange} placeholder="وضحي شروط الإرجاع، المدة المسموحة، وحالات الاستثناء..." rows={4} />
            </div>
            <div>
              <Label htmlFor="shippingPolicy">سياسة الشحن والتوصيل</Label>
              <Textarea id="shippingPolicy" name="shippingPolicy" value={storeData.shippingPolicy} onChange={handleInputChange} placeholder="تكاليف الشحن، المناطق المغطاة، مدة التوصيل المتوقعة..." rows={4} />
            </div>
            <div>
              <Label htmlFor="rentalTerms">شروط تأجير المنتجات (إن وجدت)</Label>
              <Textarea id="rentalTerms" name="rentalTerms" value={storeData.rentalTerms} onChange={handleInputChange} placeholder="مدة الإيجار، مبلغ التأمين، مسؤولية التلف، إجراءات الاستلام والتسليم..." rows={4} />
            </div>
          </CardContent>
        </Card>

        {/* Advanced Settings */}
        <Card id="advanced" className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-center"><ShieldCheck className="ml-2 text-green-500" /> إعدادات متقدمة وتفضيلات</CardTitle>
            <CardDescription>خيارات إضافية لتخصيص تجربة متجركِ وعملياتك.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                <Label htmlFor="enableOnlineBooking" className="text-sm font-medium flex items-center">
                    <Info size={16} className="ml-2 text-muted-foreground" /> تفعيل الحجز المباشر للخدمات/الإيجار (قيد التطوير)
                </Label>
                <Switch 
                    id="enableOnlineBooking" 
                    checked={storeData.enableOnlineBooking} 
                    onCheckedChange={(checked) => handleSwitchChange('enableOnlineBooking', checked)}
                />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                <Label htmlFor="showStockLevels" className="text-sm font-medium flex items-center">
                    <Info size={16} className="ml-2 text-muted-foreground" /> عرض مستويات المخزون للعملاء (قيد التطوير)
                </Label>
                <Switch 
                    id="showStockLevels" 
                    checked={storeData.showStockLevels} 
                    onCheckedChange={(checked) => handleSwitchChange('showStockLevels', checked)}
                />
            </div>
             <p className="text-xs text-muted-foreground p-3">سيتم إضافة المزيد من الخيارات المتقدمة قريبًا مثل تكامل أدوات التحليل الخارجية وإدارة فريق العمل.</p>
          </CardContent>
        </Card>

        <CardFooter className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
                تذكري أن التحديثات قد تستغرق بضع دقائق لتظهر في متجركِ العام.
            </p>
          <div className="flex gap-2">
            <Button variant="outline" type="button" asChild>
                <Link href="/dashboard">إلغاء والعودة للوحة التحكم</Link>
            </Button>
            <Button type="submit" className="bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground">
              <Save className="ml-2 h-4 w-4" /> حفظ كل التغييرات
            </Button>
          </div>
        </CardFooter>
      </form>
    </div>
  );
}