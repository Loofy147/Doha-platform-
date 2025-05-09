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
import { PackagePlus, Sparkles, ImageIcon, Palette, Tag, FileText, CalendarClock, Handshake, Layers, DollarSign, ShieldCheck, Percent, Info, Loader2, CheckCircle, Trash2, Upload, Weight, Ruler, Ship, PlusCircle as PlusCircleIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateProductDescription, GenerateProductDescriptionInput } from '@/ai/flows/generate-product-description-flow';
import { MOCK_CATEGORIES_FOR_FORMS, type ProductTypeConstant } from '@/lib/constants/categories';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


interface ImagePreview {
  file?: File;
  url: string;
  isNew?: boolean;
}
interface ProductVariant {
  id: string;
  name: string;
  values: string;
}

export default function AdminAddNewProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [productType, setProductType] = useState<ProductTypeConstant>('بيع');
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDetailsForAI, setProductDetailsForAI] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDescriptionManuallyEdited, setIsDescriptionManuallyEdited] = useState(false);
  const [productStory, setProductStory] = useState('');

  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [isTaxable, setIsTaxable] = useState(false);

  const [rentalPrice, setRentalPrice] = useState('');
  const [rentalPeriod, setRentalPeriod] = useState<'يوم' | 'أسبوع' | 'شهر' | 'مناسبة'>('يوم');
  const [rentalDeposit, setRentalDeposit] = useState('');
  const [rentalAvailability, setRentalAvailability] = useState('');

  const [servicePriceType, setServicePriceType] = useState<'ثابت' | 'بالساعة' | 'بالمشروع' | 'حسب_الطلب'>('ثابت');
  const [servicePriceValue, setServicePriceValue] = useState('');
  const [serviceDuration, setServiceDuration] = useState('');
  const [serviceLocation, setServiceLocation] = useState('');

  const [currentImages, setCurrentImages] = useState<ImagePreview[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [shippingWeight, setShippingWeight] = useState('');
  const [shippingDimensions, setShippingDimensions] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);


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
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImagePreviews = Array.from(files).map(file => ({
        file,
        url: URL.createObjectURL(file),
        isNew: true,
      }));
      setCurrentImages(prev => [...prev, ...newImagePreviews].slice(0,5));
      toast({title: "تمت إضافة صور جديدة مؤقتًا.", description: "سيتم معالجة الرفع عند الحفظ."})
    }
  };

  const removeImage = (indexToRemove: number) => {
    const imageToRemove = currentImages[indexToRemove];
    if (imageToRemove.file && imageToRemove.url.startsWith('blob:')) {
        URL.revokeObjectURL(imageToRemove.url); // Clean up blob URL
    }
    setCurrentImages(prev => prev.filter((_,index) => index !== indexToRemove));
    toast({title: "تم تحديد الصورة للحذف."})
  };
  
  const addVariant = () => {
    setVariants(prev => [...prev, { id: Date.now().toString(), name: '', values: '' }]);
  };

  const updateVariant = (index: number, field: keyof Omit<ProductVariant, 'id'>, value: string) => {
    setVariants(prev => prev.map((v, i) => i === index ? { ...v, [field]: value } : v));
  };

  const removeVariant = (index: number) => {
    setVariants(prev => prev.filter((_, i) => i !== index));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!productName) {
      toast({ title: "اسم المنتج مطلوب", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("New product data:", {
        productName, productType, productCategory, productDetailsForAI, description: generatedDescription, productStory,
        price, stock, discountPercentage, isTaxable,
        rentalPrice, rentalPeriod, rentalDeposit, rentalAvailability,
        servicePriceType, servicePriceValue, serviceDuration, serviceLocation,
        images: currentImages.map(img => img.file?.name || img.url), 
        variants, shippingWeight, shippingDimensions, metaTitle, metaDescription,
    });
    toast({ title: "تم إضافة المنتج/الخدمة بنجاح!", description: `${productName} أصبح الآن جاهزًا للعرض (محاكاة).`, variant: "default" });
    setIsSubmitting(false);
    router.push('/dashboard/products'); 
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
        <Card className="shadow-lg border-primary/10">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-xl text-primary flex items-center"><Tag className="ml-2 text-accent-purple" /> المعلومات الأساسية</CardTitle>
            <CardDescription>ابدئي بالأساسيات: الاسم، النوع، والفئة.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
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
        
        <Card className="shadow-lg border-primary/10">
            <CardHeader className="bg-primary/5">
                <CardTitle className="text-xl text-primary flex items-center"><FileText className="ml-2 text-accent-pink" /> الوصف وقصة المنتج</CardTitle>
                <CardDescription>اجعلي منتجكِ يتألق بوصف جذاب وقصة ملهمة. يمكنكِ الاستعانة بالذكاء الاصطناعي!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
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
                    <Textarea id="productStory" value={productStory} onChange={(e) => setProductStory(e.target.value)} placeholder="شاركي العملاء الإلهام وراء إبداعكِ، أو تفاصيل مميزة عن عملية الصنع..." rows={3} />
                </div>
            </CardContent>
        </Card>


        {productType === 'بيع' && (
            <Card className="shadow-lg border-primary/10">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="text-xl text-primary flex items-center"><DollarSign className="ml-2 text-green-500" /> تسعير المنتج (بيع)</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                    <div>
                        <Label htmlFor="price">سعر البيع (دج)</Label>
                        <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="مثال: 2500" />
                    </div>
                    <div>
                        <Label htmlFor="stock">الكمية المتاحة (المخزون)</Label>
                        <Input id="stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="مثال: 10" />
                    </div>
                    <div>
                        <Label htmlFor="discountPercentage">نسبة الخصم (اختياري %)</Label>
                        <Input id="discountPercentage" type="number" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} placeholder="مثال: 10 لخصم 10%" />
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                        <Switch id="isTaxable" checked={isTaxable} onCheckedChange={setIsTaxable} />
                        <Label htmlFor="isTaxable" className="text-sm">هذا المنتج خاضع للضريبة (سيتم تطبيق الإعدادات العامة للمنصة)</Label>
                    </div>
                </CardContent>
            </Card>
        )}

        {productType === 'إيجار' && (
            <Card className="shadow-lg border-primary/10">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="text-xl text-primary flex items-center"><CalendarClock className="ml-2 text-blue-500" /> تسعير المنتج (إيجار)</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
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
                        <Input id="rentalDeposit" type="number" value={rentalDeposit} onChange={(e) => setRentalDeposit(e.target.value)} placeholder="مثال: 1000" />
                    </div>
                     <div className="md:col-span-2">
                        <Label htmlFor="rentalAvailability">ملاحظات حول التوفر وشروط الإيجار الخاصة</Label>
                        <Textarea id="rentalAvailability" value={rentalAvailability} onChange={(e) => setRentalAvailability(e.target.value)} placeholder="مثال: متاح للحجز المسبق فقط، يتطلب هوية سارية..." rows={3} />
                    </div>
                </CardContent>
            </Card>
        )}

        {productType === 'خدمة' && (
            <Card className="shadow-lg border-primary/10">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="text-xl text-primary flex items-center"><Handshake className="ml-2 text-purple-500" /> تسعير الخدمة</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
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
                            <Input id="servicePrice" type="number" value={servicePriceValue} onChange={(e) => setServicePriceValue(e.target.value)} placeholder={servicePriceType === 'بالساعة' ? "السعر لكل ساعة" : "السعر الإجمالي"} />
                        </div>
                    )}
                    <div className="md:col-span-2">
                        <Label htmlFor="serviceDuration">مدة تقديم الخدمة أو تفاصيل إضافية</Label>
                        <Input id="serviceDuration" value={serviceDuration} onChange={(e) => setServiceDuration(e.target.value)} placeholder={servicePriceType === 'بالساعة' ? "مثال: أقل مدة للحجز ساعتين" : "مثال: يتضمن 3 جلسات استشارية"} />
                    </div>
                     <div className="md:col-span-2">
                        <Label htmlFor="serviceLocation">مكان تقديم الخدمة (إن وجد)</Label>
                        <Input id="serviceLocation" value={serviceLocation} onChange={(e) => setServiceLocation(e.target.value)} placeholder="مثال: عبر الإنترنت، في موقع العميل (ضمن نطاق معين)، في الاستوديو الخاص بي" />
                    </div>
                </CardContent>
            </Card>
        )}


        {/* Image Management Section */}
        <Card className="shadow-lg border-primary/10">
            <CardHeader className="bg-primary/5">
                <CardTitle className="text-xl text-primary flex items-center"><ImageIcon className="ml-2 text-orange-500" /> الصور</CardTitle>
                <CardDescription>صورة تعبر عن ألف كلمة! أضيفي صورًا عالية الجودة (بحد أقصى 5).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                <div>
                    <Label htmlFor="productImages" className='flex items-center gap-2 mb-2 text-sm font-medium'>
                      <Upload size={18} />
                      تحميل صور المنتج/الخدمة
                    </Label>
                    <Input id="productImages" type="file" multiple accept="image/*" onChange={handleImageUpload} />
                    <p className="text-xs text-muted-foreground mt-1">الصورة الأولى ستكون الصورة الرئيسية. الحجم الموصى به 800x800 بكسل.</p>
                    
                    {currentImages.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {currentImages.map((img, index) => (
                          <div key={img.url} className="relative group aspect-square border-2 border-dashed rounded-lg overflow-hidden bg-muted/30">
                            <Image src={img.url} alt={`صورة معاينة ${index + 1}`} fill className="object-contain p-1" data-ai-hint="new product image preview" />
                            <Button 
                              type="button"
                              variant="destructive" 
                              size="icon" 
                              className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                              onClick={() => removeImage(index)}
                              aria-label="إزالة الصورة"
                            >
                              <Trash2 size={14}/>
                            </Button>
                            {index === 0 && <Badge className="absolute bottom-1 left-1 text-xs z-10 bg-primary/80 text-primary-foreground">رئيسية</Badge>}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
            </CardContent>
        </Card>

        {/* Variants Section */}
        {productType === 'بيع' && (
            <Card className="shadow-lg border-primary/10">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="text-xl text-primary flex items-center"><Layers className="ml-2 text-blue-500" /> تنوعات المنتج (مثل اللون، الحجم)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                    {variants.map((variant, index) => (
                        <div key={variant.id} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-3 p-3 border rounded-md bg-muted/30">
                            <Input 
                                placeholder="اسم الخيار (مثال: الحجم)" 
                                value={variant.name} 
                                onChange={(e) => updateVariant(index, 'name', e.target.value)}
                            />
                            <Input 
                                placeholder="القيم (مفصولة بفاصلة، مثال: S,M,L)" 
                                value={variant.values} 
                                onChange={(e) => updateVariant(index, 'values', e.target.value)}
                            />
                            <Button type="button" variant="ghost" size="icon" onClick={() => removeVariant(index)} className="text-destructive hover:bg-destructive/10">
                                <Trash2 size={16} />
                            </Button>
                        </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addVariant} className="border-dashed border-primary text-primary hover:bg-primary/10">
                        <PlusCircleIcon size={16} className="ml-2"/> إضافة خيار تنوع
                    </Button>
                     <p className="text-xs text-muted-foreground mt-1">يمكنكِ إضافة أسعار وكميات مختلفة لكل تنوع من صفحة تعديل المنتج لاحقًا (ميزة قيد التطوير الكامل).</p>
                </CardContent>
            </Card>
        )}
        
        {/* Shipping Section */}
        {productType === 'بيع' && (
            <Card className="shadow-lg border-primary/10">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="text-xl text-primary flex items-center"><Ship className="ml-2 text-teal-500" /> تفاصيل الشحن (للمنتجات المادية)</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                    <div>
                        <Label htmlFor="shippingWeight" className="flex items-center gap-1"><Weight size={16}/> وزن المنتج (كجم)</Label>
                        <Input id="shippingWeight" type="number" value={shippingWeight} onChange={(e) => setShippingWeight(e.target.value)} placeholder="مثال: 0.5" />
                    </div>
                    <div>
                        <Label htmlFor="shippingDimensions" className="flex items-center gap-1"><Ruler size={16}/> الأبعاد (سم، طولxعرضxارتفاع)</Label>
                        <Input id="shippingDimensions" value={shippingDimensions} onChange={(e) => setShippingDimensions(e.target.value)} placeholder="مثال: 20x15x10" />
                    </div>
                </CardContent>
            </Card>
        )}

        {/* SEO Section */}
        <Card className="shadow-lg border-primary/10">
            <CardHeader className="bg-primary/5">
                <CardTitle className="text-xl text-primary flex items-center"><Sparkles className="ml-2 text-accent-yellow" /> تحسين محركات البحث (SEO)</CardTitle>
                 <CardDescription>ساعدي العملاء على إيجاد منتجكِ بسهولة.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
                <div>
                    <Label htmlFor="metaTitle">عنوان ميتا (Meta Title)</Label>
                    <Input id="metaTitle" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="عنوان جذاب يظهر في نتائج البحث (يفضل أقل من 60 حرفًا)" />
                </div>
                <div>
                    <Label htmlFor="metaDescription">وصف ميتا (Meta Description)</Label>
                    <Textarea id="metaDescription" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="وصف موجز (حوالي 155-160 حرفًا) للمنتج يظهر في نتائج البحث" rows={2} />
                </div>
            </CardContent>
        </Card>
        

        <CardFooter className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-card">
          <p className="text-sm text-muted-foreground flex items-center"><Info size={16} className="ml-1" /> يمكنكِ دائمًا تعديل هذه التفاصيل لاحقًا من لوحة تحكم منتجاتكِ.</p>
          <div className="flex gap-2">
            <Button variant="outline" asChild size="lg" disabled={isSubmitting}>
              <Link href="/dashboard/products">إلغاء والعودة لقائمة المنتجات</Link>
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground" size="lg" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <PackagePlus className="ml-2 h-4 w-4" />}
              {isSubmitting ? 'جاري الحفظ...' : 'حفظ المنتج/الخدمة'}
            </Button>
          </div>
        </CardFooter>
      </form>
    </div>
  );
}

