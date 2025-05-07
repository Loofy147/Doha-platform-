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
import { PackageEdit, Sparkles, ImageIcon, Palette, Tag, FileText, CalendarClock, Handshake, Layers, DollarSign, ShieldCheck, Percent, Info, Loader2, CheckCircle, AlertCircle, Trash2, Eye, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateProductDescription, GenerateProductDescriptionInput } from '@/ai/flows/generate-product-description-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { DetailedSellerProduct, ProductType, getDetailedSellerProductById, allSellerProductsList } from '@/lib/data/mock-seller-data'; // Corrected import path
import Image from 'next/image';

const productCategories = [
  "أزياء وإكسسوارات",
  "مستلزمات منزلية وديكور",
  "جمال وعناية شخصية",
  "فن ومقتنيات",
  "حلويات ومأكولات شهية",
  "حرف يدوية إبداعية",
  "منتجات للإيجار (فساتين، معدات)",
  "خدمات (ورش عمل، استشارات، تصميم)",
  "تأجير إبداعات", 
  "خدمات احترافية", 
  "أخرى",
];

const uniqueProductCategories = [...new Set(productCategories)];


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
  
  // Sale specific states
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [isTaxable, setIsTaxable] = useState(false);

  // Rental specific states
  const [rentalPrice, setRentalPrice] = useState('');
  const [rentalPeriod, setRentalPeriod] = useState<'يوم' | 'أسبوع' | 'شهر' | 'مناسبة'>('يوم');
  const [rentalDeposit, setRentalDeposit] = useState('');
  const [rentalAvailability, setRentalAvailability] = useState('');

  // Service specific states
  const [servicePriceType, setServicePriceType] = useState<'ثابت' | 'بالساعة' | 'بالمشروع' | 'حسب_الطلب'>('ثابت');
  const [servicePriceValue, setServicePriceValue] = useState(''); // Renamed from servicePrice to avoid conflict
  const [serviceDuration, setServiceDuration] = useState('');
  const [serviceLocation, setServiceLocation] = useState('');
  
  const [currentImages, setCurrentImages] = useState<string[]>([]); 


  useEffect(() => {
    if (productId) {
      setIsLoadingProduct(true);
      setTimeout(() => {
        const fetchedProduct = getDetailedSellerProductById(productId);

        if (fetchedProduct) {
          setProductData(fetchedProduct);
          setProductType(fetchedProduct.productType);
          setProductName(fetchedProduct.name);
          setProductCategory(fetchedProduct.category);
          setProductDetailsForAI(fetchedProduct.detailsForAI);
          setGeneratedDescription(fetchedProduct.description);
          setProductStory(fetchedProduct.story);
          
          setPrice(fetchedProduct.price || ''); // This is for sale type
          setStock(fetchedProduct.stock || '');
          setDiscountPercentage(fetchedProduct.discountPercentage || '');
          setIsTaxable(fetchedProduct.isTaxable || false);

          setRentalPrice(fetchedProduct.rentalPrice || '');
          setRentalPeriod(fetchedProduct.rentalPeriod || 'يوم');
          setRentalDeposit(fetchedProduct.rentalDeposit || '');
          setRentalAvailability(fetchedProduct.rentalAvailability || '');

          setServicePriceType(fetchedProduct.servicePriceType || 'ثابت');
          setServicePriceValue(fetchedProduct.servicePrice || ''); // Use servicePriceValue here
          setServiceDuration(fetchedProduct.serviceDuration || '');
          setServiceLocation(fetchedProduct.serviceLocation || '');
          
          if (fetchedProduct.images && fetchedProduct.images.length > 0) {
            setCurrentImages(fetchedProduct.images);
          } else if (fetchedProduct.imageSrc) {
             setCurrentImages([fetchedProduct.imageSrc, 'https://picsum.photos/seed/extraimg1/100/100', 'https://picsum.photos/seed/extraimg2/100/100'].slice(0,5)); // Add placeholders if only imageSrc exists
          }


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
      const newImageUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setCurrentImages(prev => [...prev, ...newImageUrls].slice(0,5)); 
      toast({title: "تم إضافة صور جديدة مؤقتًا.", description: "سيتم معالجة الرفع عند الحفظ."})
    }
  };

  const removeImage = (indexToRemove: number) => {
    setCurrentImages(prev => prev.filter((_,index) => index !== indexToRemove));
    toast({title: "تم تحديد الصورة للحذف.", description: "سيتم الحذف الفعلي عند الحفظ."})
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName) {
      toast({ title: "اسم المنتج مطلوب", variant: "destructive" });
      return;
    }
    
    const productIndex = allSellerProductsList.findIndex(p => p.id === productId);
    if (productIndex !== -1 && productData) {
        const updatedProduct: DetailedSellerProduct = {
            ...productData, 
            name: productName,
            productType: productType,
            category: productCategory,
            detailsForAI: productDetailsForAI,
            description: generatedDescription,
            story: productStory,
            price: productType === 'بيع' ? price : '', // Store string price for 'بيع'
            stock: productType === 'بيع' ? stock : undefined,
            discountPercentage: productType === 'بيع' ? discountPercentage : undefined,
            isTaxable: productType === 'بيع' ? isTaxable : undefined,
            rentalPrice: productType === 'إيجار' ? rentalPrice : undefined,
            rentalPeriod: productType === 'إيجار' ? rentalPeriod : undefined,
            rentalDeposit: productType === 'إيجار' ? rentalDeposit : undefined,
            rentalAvailability: productType === 'إيجار' ? rentalAvailability : undefined,
            servicePriceType: productType === 'خدمة' ? servicePriceType : undefined,
            servicePrice: productType === 'خدمة' ? servicePriceValue : undefined, // Store numeric service price here
            serviceDuration: productType === 'خدمة' ? serviceDuration : undefined,
            serviceLocation: productType === 'خدمة' ? serviceLocation : undefined,
            images: currentImages, // Update images
        };
        allSellerProductsList[productIndex] = updatedProduct;
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
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-center"><Tag className="ml-2 text-accent-purple" /> المعلومات الأساسية</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <SelectTrigger id="productCategory"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {uniqueProductCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center"><FileText className="ml-2 text-accent-pink" /> الوصف وقصة المنتج</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center"><DollarSign className="ml-2 text-green-500" /> تسعير المنتج (بيع)</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center"><CalendarClock className="ml-2 text-blue-500" /> تسعير المنتج (إيجار)</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center"><Handshake className="ml-2 text-purple-500" /> تسعير الخدمة</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
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


        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center"><ImageIcon className="ml-2 text-orange-500" /> الصور والتنوعات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <Label htmlFor="productImages" className='flex items-center gap-2 mb-2'>
                      <Upload size={18} />
                      صور المنتج/الخدمة (إدارة الصور الحالية أو تحميل جديد)
                    </Label>
                    <Input id="productImages" type="file" multiple accept="image/*" onChange={handleImageUpload} />
                    <p className="text-xs text-muted-foreground mt-1">يمكنكِ تحميل حتى 5 صور. اسحبي وأفلتي لتغيير ترتيب الصورة الرئيسية.</p>
                    
                    {currentImages.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                        {currentImages.map((imgSrc, index) => (
                          <div key={index} className="relative group aspect-square border rounded-md overflow-hidden">
                            <Image src={imgSrc} alt={`Product image ${index + 1}`} fill className="object-cover" data-ai-hint="product image current" />
                            <Button 
                              type="button"
                              variant="destructive" 
                              size="icon" 
                              className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <Trash2 size={14}/>
                            </Button>
                            {index === 0 && <Badge className="absolute bottom-1 left-1 text-xs">صورة رئيسية</Badge>}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
                {productType === 'بيع' && (
                  <div className="p-4 border border-dashed rounded-md">
                      <Label className="flex items-center mb-2"><Layers className="ml-2 text-blue-500" /> إدارة تنوعات المنتج</Label>
                      <p className="text-sm text-muted-foreground mb-3">تعديل أو إضافة خيارات مختلفة للمنتج (قيد التطوير).</p>
                      <Button type="button" variant="outline" disabled>إدارة التنوعات (قريباً)</Button>
                  </div>
                )}
            </CardContent>
        </Card>
        

        <CardFooter className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground flex items-center"><Info size={16} className="ml-1" /> تأكدي من مراجعة كل التغييرات قبل الحفظ.</p>
          <div className="flex gap-2">
            <Button variant="outline" type="button" onClick={() => router.push('/dashboard/products')}>إلغاء التعديلات</Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              <PackageEdit className="ml-2 h-4 w-4" /> حفظ التغييرات
            </Button>
          </div>
        </CardFooter>
      </form>
    </div>
  );
}
