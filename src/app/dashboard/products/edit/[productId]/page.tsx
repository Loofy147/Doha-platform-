// src/app/dashboard/products/edit/[productId]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
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
import { PackageEdit, Sparkles, ImageIcon, Palette, Tag, FileText, CalendarClock, Handshake, Layers, DollarSign, ShieldCheck, Percent, Info, Loader2, CheckCircle, AlertCircle, Trash2, Eye, Upload, Weight, Ruler, Ship, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateProductDescription, GenerateProductDescriptionInput } from '@/ai/flows/generate-product-description-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { DetailedSellerProduct, ProductType, getDetailedSellerProductById, allSellerProductsList, updateSellerProduct } from '@/lib/data/mock-seller-data'; 
import Image from 'next/image';
import { MOCK_CATEGORIES_FOR_FORMS } from '@/lib/constants/categories';
import { Separator } from '@/components/ui/separator';

interface ImagePreview {
  file?: File;
  url: string;
  isNew?: boolean;
  isPlaceholder?: boolean; 
}
interface ProductVariant {
  id: string; // for unique key in map
  name: string; // e.g., Size, Color
  values: string; // comma-separated values e.g., S,M,L
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId as string;
  const { toast } = useToast();

  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [productData, setProductData] = useState<DetailedSellerProduct | null>(null);
  
  const [productType, setProductType] = useState<ProductType>('بيع');
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDetailsForAI, setProductDetailsForAI] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [productStory, setProductStory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDescriptionManuallyEdited, setIsDescriptionManuallyEdited] = useState(false);
  
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


  useEffect(() => {
    if (productId) {
      setIsLoadingProduct(true);
      setTimeout(() => { // Simulate API delay
        const fetchedProduct = getDetailedSellerProductById(productId);

        if (fetchedProduct) {
          setProductData(fetchedProduct);
          setProductType(fetchedProduct.productType);
          setProductName(fetchedProduct.name);
          setProductCategory(fetchedProduct.category);
          setProductDetailsForAI(fetchedProduct.detailsForAI);
          setGeneratedDescription(fetchedProduct.description);
          setProductStory(fetchedProduct.story || '');
          
          setPrice(fetchedProduct.price || ''); 
          setStock(fetchedProduct.stock || '');
          setDiscountPercentage(fetchedProduct.discountPercentage || '');
          setIsTaxable(fetchedProduct.isTaxable || false);

          setRentalPrice(fetchedProduct.rentalPrice || '');
          setRentalPeriod(fetchedProduct.rentalPeriod || 'يوم');
          setRentalDeposit(fetchedProduct.rentalDeposit || '');
          setRentalAvailability(fetchedProduct.rentalAvailability || '');

          setServicePriceType(fetchedProduct.servicePriceType || 'ثابت');
          setServicePriceValue(fetchedProduct.servicePrice || ''); 
          setServiceDuration(fetchedProduct.serviceDuration || '');
          setServiceLocation(fetchedProduct.serviceLocation || '');
          
          const initialImages: ImagePreview[] = (fetchedProduct.images && fetchedProduct.images.length > 0) 
            ? fetchedProduct.images.map(url => ({ url, isPlaceholder: url.startsWith('https://picsum.photos') }))
            : [{ url: fetchedProduct.imageSrc, isPlaceholder: fetchedProduct.imageSrc.startsWith('https://picsum.photos') }];
          setCurrentImages(initialImages.slice(0, 5));
          
          setVariants(fetchedProduct.variants || []);
          setShippingWeight(fetchedProduct.shippingWeight || '');
          setShippingDimensions(fetchedProduct.shippingDimensions || '');
          setMetaTitle(fetchedProduct.metaTitle || '');
          setMetaDescription(fetchedProduct.metaDescription || '');

        } else {
          toast({ title: "خطأ", description: `لم يتم العثور على المنتج رقم ${productId} للتعديل.`, variant: "destructive"});
          router.push('/dashboard/products'); 
        }
        setIsLoadingProduct(false);
      }, 1000);
    }
  }, [productId, router, toast]);


  const handleGenerateDescription = async () => {
    if (!productDetailsForAI.trim()) {
        toast({ title: "الرجاء إدخال تفاصيل المنتج أولاً", description: "أدخلي بعض الكلمات المفتاحية أو وصف موجز للمنتج لتوليد الوصف.", variant: "destructive" });
        return;
    }
    setIsGenerating(true);
    try {
        const input: GenerateProductDescriptionInput = { productDetails: productDetailsForAI };
        const result = await generateProductDescription(input);
        setGeneratedDescription(result.description);
        setIsDescriptionManuallyEdited(false);
        toast({ title: "تم توليد وصف جديد مقترح!", description: "يمكنكِ تعديل الوصف أو اعتماده.", variant: "default"});
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
    if (imageToRemove.url && !imageToRemove.isNew) {
        // If it's an existing image, we just mark it for removal or handle it on submit
        // For mock, we'll just filter it out from UI
    }
    if (imageToRemove.file && imageToRemove.url.startsWith('blob:')) {
        URL.revokeObjectURL(imageToRemove.url); // Clean up blob URL
    }
    setCurrentImages(prev => prev.filter((_,index) => index !== indexToRemove));
    toast({title: "تم تحديد الصورة للحذف.", description: "سيتم الحذف الفعلي عند الحفظ."})
  };
  
  const addVariant = () => {
    setVariants(prev => [...prev, { id: Date.now().toString(), name: '', values: '' }]);
  };

  const updateVariant = (index: number, field: keyof ProductVariant, value: string) => {
    setVariants(prev => prev.map((v, i) => i === index ? { ...v, [field]: value } : v));
  };

  const removeVariant = (index: number) => {
    setVariants(prev => prev.filter((_, i) => i !== index));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName) {
      toast({ title: "اسم المنتج مطلوب", variant: "destructive" });
      return;
    }
    
    const productIndex = allSellerProductsList.findIndex(p => p.id === productId);
    if (productIndex !== -1 && productData) {
        const updatedProductData: DetailedSellerProduct = {
            ...productData, 
            name: productName,
            productType: productType,
            category: productCategory,
            detailsForAI: productDetailsForAI,
            description: generatedDescription,
            story: productStory,
            price: productType === 'بيع' ? price : '', 
            stock: productType === 'بيع' ? stock : undefined,
            discountPercentage: productType === 'بيع' ? discountPercentage : undefined,
            isTaxable: productType === 'بيع' ? isTaxable : undefined,
            rentalPrice: productType === 'إيجار' ? rentalPrice : undefined,
            rentalPeriod: productType === 'إيجار' ? rentalPeriod : undefined,
            rentalDeposit: productType === 'إيجار' ? rentalDeposit : undefined,
            rentalAvailability: productType === 'إيجار' ? rentalAvailability : undefined,
            servicePriceType: productType === 'خدمة' ? servicePriceType : undefined,
            servicePrice: productType === 'خدمة' ? servicePriceValue : undefined, 
            serviceDuration: productType === 'خدمة' ? serviceDuration : undefined,
            serviceLocation: productType === 'خدمة' ? serviceLocation : undefined,
            images: currentImages.filter(img => !img.isPlaceholder).map(img => img.url), // Save non-placeholder URLs
            imageSrc: currentImages.find(img => !img.isPlaceholder)?.url || productData.imageSrc, // Update primary image
            variants: variants,
            shippingWeight: shippingWeight,
            shippingDimensions: shippingDimensions,
            metaTitle: metaTitle,
            metaDescription: metaDescription,
            // views and sales are typically updated by backend based on actual data
        };
        updateSellerProduct(updatedProductData);
    }

    toast({ title: "تم تحديث المنتج/الخدمة بنجاح!", description: `تم حفظ التغييرات على ${productName} (محاكاة).`, variant: "default" });
    router.push('/dashboard/products'); 
  };

  if (isLoadingProduct) {
    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <Skeleton className="h-10 w-1/2 mb-2" />
            <Skeleton className="h-6 w-3/4 mb-8" />
            <div className="space-y-8">
                <Skeleton className="h-40 w-full rounded-lg" />
                <Skeleton className="h-60 w-full rounded-lg" />
                <Skeleton className="h-40 w-full rounded-lg" />
            </div>
        </div>
    );
  }

  if (!productData) {
    return (
         <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
            <AlertCircle size={48} className="mx-auto text-destructive mb-4" />
            <h1 className="text-2xl font-semibold text-destructive mb-2">خطأ في تحميل المنتج</h1>
            <p className="text-muted-foreground mb-6">
            تعذر تحميل بيانات المنتج. يرجى المحاولة مرة أخرى أو العودة لقائمة المنتجات.
            </p>
            <Button onClick={() => router.push('/dashboard/products')}>العودة لقائمة المنتجات</Button>
        </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl flex items-center">
          <PackageEdit size={36} className="ml-3 text-accent-pink" /> تعديل المنتج/الخدمة: {productData.name}
        </h1>
        <p className="mt-2 text-lg text-foreground/80">
          قومي بتحديث تفاصيل منتجكِ أو خدمتكِ. تأكدي من دقة المعلومات لإبقاء عملائكِ على اطلاع.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="shadow-lg border-primary/10">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-xl text-primary flex items-center"><Tag className="ml-2 text-accent-purple" /> المعلومات الأساسية</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div>
              <Label htmlFor="productName">اسم المنتج/الخدمة</Label>
              <Input id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="productType">نوع العرض</Label>
              <Select value={productType} onValueChange={(value: ProductType) => setProductType(value)}>
                <SelectTrigger id="productType"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="بيع"><DollarSign size={16} className="ml-2" /> بيع منتج</SelectItem>
                  <SelectItem value="إيجار"><CalendarClock size={16} className="ml-2" /> تأجير منتج</SelectItem>
                  <SelectItem value="خدمة"><Handshake size={16} className="ml-2" /> تقديم خدمة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="productCategory">الفئة الرئيسية</Label>
              <Select value={productCategory} onValueChange={(value) => setProductCategory(value)}>
                <SelectTrigger id="productCategory"><SelectValue placeholder="اختاري الفئة المناسبة" /></SelectTrigger>
                <SelectContent>
                  {MOCK_CATEGORIES_FOR_FORMS.map(cat => (
                    <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-primary/10">
            <CardHeader className="bg-primary/5">
                <CardTitle className="text-xl text-primary flex items-center"><FileText className="ml-2 text-accent-pink" /> الوصف وقصة المنتج</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                 <div>
                    <Label htmlFor="productDetailsForAI">تحديث تفاصيل المنتج (للمساعدة بالذكاء الاصطناعي)</Label>
                    <Textarea 
                        id="productDetailsForAI" 
                        value={productDetailsForAI}
                        onChange={(e) => setProductDetailsForAI(e.target.value)}
                        placeholder="أدخلي كلمات مفتاحية، مميزات رئيسية، المواد المستخدمة..." 
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
                        {isGenerating ? 'جاري توليد الوصف...' : 'تحديث/اقتراح وصف (AI)'}
                    </Button>
                 </div>

                <div>
                    <Label htmlFor="productDescription">الوصف التفصيلي للمنتج/الخدمة</Label>
                    <Textarea 
                        id="productDescription" 
                        value={generatedDescription}
                        onChange={handleDescriptionChange}
                        rows={6} 
                    />
                     {generatedDescription && !isDescriptionManuallyEdited && productData.description !== generatedDescription && (
                        <p className="text-xs text-green-600 mt-1 flex items-center"><CheckCircle size={14} className="ml-1"/> تم اقتراح وصف جديد بواسطة الذكاء الاصطناعي. يمكنكِ تعديله.</p>
                    )}
                </div>
                <div>
                    <Label htmlFor="productStory">قصة المنتج/الخدمة (اختياري)</Label>
                    <Textarea id="productStory" value={productStory} onChange={(e) => setProductStory(e.target.value)} placeholder="شاركي العملاء الإلهام وراء إبداعكِ..." rows={3} />
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
                        <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="stock">الكمية المتاحة (المخزون)</Label>
                        <Input id="stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="discountPercentage">نسبة الخصم (اختياري %)</Label>
                        <Input id="discountPercentage" type="number" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} />
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                        <Switch id="isTaxable" checked={isTaxable} onCheckedChange={setIsTaxable} />
                        <Label htmlFor="isTaxable" className="text-sm">هذا المنتج خاضع للضريبة</Label>
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
                        <Input id="rentalPrice" type="number" value={rentalPrice} onChange={(e) => setRentalPrice(e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="rentalPeriod">لكل فترة</Label>
                         <Select value={rentalPeriod} onValueChange={(value: 'يوم' | 'أسبوع' | 'شهر' | 'مناسبة') => setRentalPeriod(value)}>
                            <SelectTrigger id="rentalPeriod"><SelectValue /></SelectTrigger>
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
                        <Input id="rentalDeposit" type="number" value={rentalDeposit} onChange={(e) => setRentalDeposit(e.target.value)} />
                    </div>
                     <div className="md:col-span-2">
                        <Label htmlFor="rentalAvailability">ملاحظات حول التوفر وشروط الإيجار</Label>
                        <Textarea id="rentalAvailability" value={rentalAvailability} onChange={(e) => setRentalAvailability(e.target.value)} rows={3} />
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
                         <Select value={servicePriceType} onValueChange={(value: 'ثابت' | 'بالساعة' | 'بالمشروع' | 'حسب_الطلب') => setServicePriceType(value)}>
                            <SelectTrigger id="servicePriceType"><SelectValue /></SelectTrigger>
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
                            <Input id="servicePrice" type="number" value={servicePriceValue} onChange={(e) => setServicePriceValue(e.target.value)} />
                        </div>
                    )}
                    <div className="md:col-span-2">
                        <Label htmlFor="serviceDuration">مدة تقديم الخدمة أو تفاصيل إضافية</Label>
                        <Input id="serviceDuration" value={serviceDuration} onChange={(e) => setServiceDuration(e.target.value)} />
                    </div>
                     <div className="md:col-span-2">
                        <Label htmlFor="serviceLocation">مكان تقديم الخدمة (إن وجد)</Label>
                        <Input id="serviceLocation" value={serviceLocation} onChange={(e) => setServiceLocation(e.target.value)} />
                    </div>
                </CardContent>
            </Card>
        )}

        {/* Image Management Section */}
        <Card className="shadow-lg border-primary/10">
            <CardHeader className="bg-primary/5">
                <CardTitle className="text-xl text-primary flex items-center"><ImageIcon className="ml-2 text-orange-500" /> إدارة الصور</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                <div>
                    <Label htmlFor="productImages" className='flex items-center gap-2 mb-2 text-sm font-medium'>
                      <Upload size={18} />
                      تحميل صور جديدة (بحد أقصى 5 صور إجمالًا)
                    </Label>
                    <Input id="productImages" type="file" multiple accept="image/*" onChange={handleImageUpload} />
                    <p className="text-xs text-muted-foreground mt-1">اسحبي الصور لتغيير ترتيبها. الصورة الأولى هي الصورة الرئيسية.</p>
                    
                    {currentImages.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {currentImages.map((img, index) => (
                          <div key={img.url || index} className="relative group aspect-square border-2 border-dashed rounded-lg overflow-hidden bg-muted/30">
                            <Image src={img.url} alt={`صورة ${index + 1}`} fill className="object-contain p-1" data-ai-hint={img.isPlaceholder ? "placeholder image existing" : "product image existing"} />
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
                            {img.isPlaceholder && <div className="absolute inset-0 bg-black/30 flex items-center justify-center"><p className="text-white text-xs text-center p-1">صورة مؤقتة</p></div>}
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
                        <PlusCircle size={16} className="ml-2"/> إضافة خيار تنوع
                    </Button>
                </CardContent>
            </Card>
        )}
        
        {/* Shipping Section */}
        {productType === 'بيع' && (
            <Card className="shadow-lg border-primary/10">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="text-xl text-primary flex items-center"><Ship className="ml-2 text-teal-500" /> تفاصيل الشحن</CardTitle>
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
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
                <div>
                    <Label htmlFor="metaTitle">عنوان ميتا (Meta Title)</Label>
                    <Input id="metaTitle" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="عنوان جذاب يظهر في نتائج البحث" />
                </div>
                <div>
                    <Label htmlFor="metaDescription">وصف ميتا (Meta Description)</Label>
                    <Textarea id="metaDescription" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="وصف موجز (حوالي 155 حرفًا) للمنتج يظهر في نتائج البحث" rows={2} />
                </div>
            </CardContent>
        </Card>
        

        <CardFooter className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-card">
          <p className="text-sm text-muted-foreground flex items-center"><Info size={16} className="ml-1" /> تأكدي من مراجعة كل التغييرات قبل الحفظ.</p>
          <div className="flex gap-2">
            <Button variant="outline" type="button" onClick={() => router.push('/dashboard/products')} size="lg">إلغاء التعديلات</Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
              <PackageEdit className="ml-2 h-4 w-4" /> حفظ التغييرات
            </Button>
          </div>
        </CardFooter>
      </form>
    </div>
  );
}

