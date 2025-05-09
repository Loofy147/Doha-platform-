// src/app/dashboard/products/new/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { PackagePlus, Sparkles, ImageIcon, Palette, Tag, FileText, CalendarClock, Handshake, Layers, DollarSign, ShieldCheck, Percent, Info, Loader2, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateProductDescription, GenerateProductDescriptionInput } from '@/ai/flows/generate-product-description-flow';
import { MOCK_CATEGORIES_FOR_FORMS, type ProductTypeConstant } from '@/lib/constants/categories';

export default function AdminAddNewProductPage() {
  const { toast } = useToast();
  const [productType, setProductType] = useState<ProductTypeConstant>('بيع');
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDetailsForAI, setProductDetailsForAI] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDescriptionManuallyEdited, setIsDescriptionManuallyEdited] = useState(false);
  const [price, setPrice] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [rentalPeriod, setRentalPeriod] = useState<'يوم' | 'أسبوع' | 'شهر' | 'مناسبة'>('يوم');
  const [servicePriceType, setServicePriceType] = useState<'ثابت' | 'بالساعة' | 'بالمشروع' | 'حسب_الطلب'>('ثابت');


  const handleGenerateDescription = async () => {
    if (!productDetailsForAI.trim()) {
        toast({ title: "الرجاء إدخال تفاصيل المنتج أولاً", description: "أدخلي بعض الكلمات المفتاحية أو وصف موجز للمنتج لتوليد الوصف.", variant: "destructive" });
        return;
    }
    setIsGenerating(true);
    setGeneratedDescription('');
    try {
        const input: GenerateProductDescriptionInput = { productDetails: productDetailsForAI };
        const result = await generateProductDescription(input);
        setGeneratedDescription(result.description);
        setIsDescriptionManuallyEdited(false);
        toast({ title: "تم توليد الوصف بنجاح!", description: "يمكنكِ تعديل الوصف المقترح أو استخدامه كما هو.", variant: "default"});
    } catch (error) {
        console.error("Error generating description:", error);
        toast({ title: "حدث خطأ أثناء توليد الوصف", description: "يرجى المحاولة مرة أخرى أو كتابة الوصف يدويًا.", variant: "destructive" });
    } finally {
        setIsGenerating(false);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGeneratedDescription(e.target.value);
    setIsDescriptionManuallyEdited(true);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName) {
      toast({ title: "اسم المنتج مطلوب", variant: "destructive" });
      return;
    }
    // Submit logic here (e.g., call an API to save the product)
    // For mock, we just log and show a toast
    console.log("New product data:", {
        productName,
        productType,
        productCategory,
        productDetailsForAI,
        description: generatedDescription,
        price: productType === 'بيع' ? price : undefined,
        rentalPrice: productType === 'إيجار' ? rentalPrice : undefined,
        rentalPeriod: productType === 'إيجار' ? rentalPeriod : undefined,
        servicePriceType: productType === 'خدمة' ? servicePriceType : undefined,
        // ... other fields based on type
    });
    toast({ title: "تم حفظ المنتج/الخدمة بنجاح!", description: `${productName} أصبح الآن جاهزًا للعرض (محاكاة).`, variant: "default" });
    // Reset form or redirect
  };


  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl flex items-center">
          <PackagePlus size={36} className="ml-3 text-accent-pink" /> أضيفي لمسة إبداعية جديدة لمتجركِ
        </h1>
        <p className="mt-2 text-lg text-foreground/80">
          املئي تفاصيل منتجكِ أو خدمتكِ بعناية. كلما كانت المعلومات أوضح وأكثر جاذبية، زادت فرص نجاحكِ!
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-center"><Tag className="ml-2 text-accent-purple" /> المعلومات الأساسية</CardTitle>
            <CardDescription>ابدئي بالأساسيات: الاسم، النوع، والفئة.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="productName">اسم المنتج/الخدمة (واضح وجذاب)</Label>
              <Input id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="مثال: قلادة فضية مصنوعة يدوياً بحجر القمر" />
            </div>
            <div>
              <Label htmlFor="productType">نوع العرض</Label>
              <Select value={productType} onValueChange={(value: ProductTypeConstant) => setProductType(value)}>
                <SelectTrigger id="productType">
                  <SelectValue placeholder="اختاري نوع العرض" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="بيع"><DollarSign size={16} className="ml-2" /> بيع منتج</SelectItem>
                  <SelectItem value="إيجار"><CalendarClock size={16} className="ml-2" /> تأجير منتج</SelectItem>
                  <SelectItem value="خدمة"><Handshake size={16} className="ml-2" /> تقديم خدمة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="productCategory">الفئة الرئيسية للمنتج/الخدمة</Label>
              <Select value={productCategory} onValueChange={setProductCategory}>
                <SelectTrigger id="productCategory">
                  <SelectValue placeholder="اختاري الفئة المناسبة" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_CATEGORIES_FOR_FORMS.map(category => (
                    <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center"><FileText className="ml-2 text-accent-pink" /> الوصف وقصة المنتج</CardTitle>
                <CardDescription>اجعلي منتجكِ يتألق بوصف جذاب وقصة ملهمة. يمكنكِ الاستعانة بالذكاء الاصطناعي!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div>
                    <Label htmlFor="productDetailsForAI">تفاصيل المنتج/الخدمة (للمساعدة بالذكاء الاصطناعي)</Label>
                    <Textarea 
                        id="productDetailsForAI" 
                        value={productDetailsForAI}
                        onChange={(e) => setProductDetailsForAI(e.target.value)}
                        placeholder="أدخلي كلمات مفتاحية، مميزات رئيسية، المواد المستخدمة، لمن هذا المنتج/الخدمة، إلخ. كلما زادت التفاصيل، كان الوصف المولّد أفضل." 
                        rows={3} 
                    />
                     <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleGenerateDescription} 
                        disabled={isGenerating}
                        className="mt-2 border-accent-purple text-accent-purple hover:bg-accent-purple/10"
                    >
                        {isGenerating ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <Sparkles className="ml-2 h-4 w-4" />}
                        {isGenerating ? 'جاري توليد الوصف...' : 'ساعديني في كتابة الوصف (AI)'}
                    </Button>
                 </div>

                <div>
                    <Label htmlFor="productDescription">الوصف التفصيلي للمنتج/الخدمة</Label>
                    <Textarea 
                        id="productDescription" 
                        value={generatedDescription}
                        onChange={handleDescriptionChange}
                        placeholder="هنا سيظهر الوصف المولّد أو يمكنكِ كتابة وصفكِ الخاص..." 
                        rows={6} 
                    />
                    {generatedDescription && !isDescriptionManuallyEdited && (
                        <p className="text-xs text-green-600 mt-1 flex items-center"><CheckCircle size={14} className="ml-1"/> هذا الوصف تم توليده بواسطة الذكاء الاصطناعي. يمكنكِ تعديله.</p>
                    )}
                </div>
                <div>
                    <Label htmlFor="productStory">قصة المنتج/الخدمة (اختياري)</Label>
                    <Textarea id="productStory" placeholder="شاركي العملاء الإلهام وراء إبداعكِ، أو تفاصيل مميزة عن عملية الصنع..." rows={3} />
                </div>
            </CardContent>
        </Card>


        {productType === 'بيع' && (
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center"><DollarSign className="ml-2 text-green-500" /> تسعير المنتج (بيع)</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="price">سعر البيع (دج)</Label>
                        <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="مثال: 2500" />
                    </div>
                    <div>
                        <Label htmlFor="stock">الكمية المتاحة (المخزون)</Label>
                        <Input id="stock" type="number" placeholder="مثال: 10" />
                    </div>
                    <div>
                        <Label htmlFor="discountPercentage">نسبة الخصم (اختياري %)</Label>
                        <Input id="discountPercentage" type="number" placeholder="مثال: 10 لخصم 10%" />
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                        <Switch id="isTaxable" />
                        <Label htmlFor="isTaxable" className="text-sm">هذا المنتج خاضع للضريبة (سيتم تطبيق الإعدادات العامة للمنصة)</Label>
                    </div>
                </CardContent>
            </Card>
        )}

        {productType === 'إيجار' && (
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center"><CalendarClock className="ml-2 text-blue-500" /> تسعير المنتج (إيجار)</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="rentalPrice">سعر الإيجار (دج)</Label>
                        <Input id="rentalPrice" type="number" value={rentalPrice} onChange={(e) => setRentalPrice(e.target.value)} placeholder="مثال: 500" />
                    </div>
                    <div>
                        <Label htmlFor="rentalPeriod">لكل فترة</Label>
                         <Select value={rentalPeriod} onValueChange={(value: 'يوم' | 'أسبوع' | 'شهر' | 'مناسبة') => setRentalPeriod(value)}>
                            <SelectTrigger id="rentalPeriod">
                                <SelectValue placeholder="اختاري فترة الإيجار" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="يوم">يوم</SelectItem>
                                <SelectItem value="أسبوع">أسبوع</SelectItem>
                                <SelectItem value="شهر">شهر</SelectItem>
                                <SelectItem value="مناسبة">مناسبة واحدة</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="rentalDeposit">مبلغ التأمين (اختياري - دج)</Label>
                        <Input id="rentalDeposit" type="number" placeholder="مثال: 1000" />
                    </div>
                     <div className="md:col-span-2">
                        <Label htmlFor="rentalAvailability">ملاحظات حول التوفر وشروط الإيجار الخاصة</Label>
                        <Textarea id="rentalAvailability" placeholder="مثال: متاح للحجز المسبق فقط، يتطلب هوية سارية..." rows={3} />
                    </div>
                </CardContent>
            </Card>
        )}

        {productType === 'خدمة' && (
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center"><Handshake className="ml-2 text-purple-500" /> تسعير الخدمة</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <Label htmlFor="servicePriceType">نوع تسعير الخدمة</Label>
                         <Select value={servicePriceType} onValueChange={(value: 'ثابت' | 'بالساعة' | 'بالمشروع' | 'حسب_الطلب')=> setServicePriceType(value)}>
                            <SelectTrigger id="servicePriceType">
                                <SelectValue placeholder="اختاري نوع التسعير" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ثابت">سعر ثابت</SelectItem>
                                <SelectItem value="بالساعة">بالساعة</SelectItem>
                                <SelectItem value="بالمشروع">بالمشروع/الحزمة</SelectItem>
                                <SelectItem value="حسب_الطلب">حسب الطلب (يتطلب استشارة)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {servicePriceType !== 'حسب_الطلب' && (
                        <div>
                            <Label htmlFor="servicePrice">السعر/التكلفة (دج)</Label>
                            <Input id="servicePrice" type="number" placeholder={servicePriceType === 'بالساعة' ? "السعر لكل ساعة" : "السعر الإجمالي"} />
                        </div>
                    )}
                    <div className="md:col-span-2">
                        <Label htmlFor="serviceDuration">مدة تقديم الخدمة أو تفاصيل إضافية</Label>
                        <Input id="serviceDuration" placeholder={servicePriceType === 'بالساعة' ? "مثال: أقل مدة للحجز ساعتين" : "مثال: يتضمن 3 جلسات استشارية"} />
                    </div>
                     <div className="md:col-span-2">
                        <Label htmlFor="serviceLocation">مكان تقديم الخدمة (إن وجد)</Label>
                        <Input id="serviceLocation" placeholder="مثال: عبر الإنترنت، في موقع العميل (ضمن نطاق معين)، في الاستوديو الخاص بي" />
                    </div>
                </CardContent>
            </Card>
        )}


        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center"><ImageIcon className="ml-2 text-orange-500" /> الصور والتنوعات</CardTitle>
                <CardDescription>صورة تعبر عن ألف كلمة! أضيفي صورًا عالية الجودة وخيارات متنوعة لمنتجكِ.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <Label htmlFor="productImages">صور المنتج/الخدمة (صورة رئيسية + صور إضافية)</Label>
                    <Input id="productImages" type="file" multiple accept="image/*" />
                    <p className="text-xs text-muted-foreground mt-1">يمكنكِ تحميل حتى 5 صور. الأولى ستكون الصورة الرئيسية. الحجم الموصى به 800x800 بكسل.</p>
                </div>
                {productType === 'بيع' && (
                  <div className="p-4 border border-dashed rounded-md">
                      <Label className="flex items-center mb-2"><Layers className="ml-2 text-blue-500" /> إضافة تنوعات للمنتج (مثل اللون، الحجم)</Label>
                      <p className="text-sm text-muted-foreground mb-3">هذه الميزة قيد التطوير وستسمح لكِ بإضافة خيارات مختلفة للمنتج الواحد بأسعار وكميات مستقلة.</p>
                      <Button type="button" variant="outline" disabled>إضافة تنوع جديد (قريباً)</Button>
                  </div>
                )}
            </CardContent>
        </Card>
        

        <CardFooter className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground flex items-center"><Info size={16} className="ml-1" /> يمكنكِ دائمًا تعديل هذه التفاصيل لاحقًا من لوحة تحكم منتجاتكِ.</p>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/dashboard/products">إلغاء والعودة لقائمة المنتجات</Link>
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              <PackagePlus className="ml-2 h-4 w-4" /> حفظ المنتج/الخدمة
            </Button>
          </div>
        </CardFooter>
      </form>
    </div>
  );
}
