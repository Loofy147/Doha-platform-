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
import { PackageEdit, Sparkles, ImageIcon, Palette, Tag, FileText as StoryIcon, CalendarClock, Handshake, Layers, DollarSign, ShieldCheck, Percent, Info, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateProductDescription, GenerateProductDescriptionInput } from '@/ai/flows/generate-product-description-flow';
import { Skeleton } from '@/components/ui/skeleton';

const productCategories = [
  "أزياء وإكسسوارات",
  "مستلزمات منزلية وديكور",
  "جمال وعناية شخصية",
  "فن ومقتنيات",
  "حلويات ومأكولات شهية",
  "حرف يدوية إبداعية",
  "منتجات للإيجار (فساتين، معدات)",
  "خدمات (ورش عمل، استشارات، تصميم)",
  "أخرى",
];

type ProductType = 'بيع' | 'إيجار' | 'خدمة';

// Mock product data for editing - in a real app, this would be fetched based on productId
const mockEditableProduct = {
  id: 'sprod1',
  name: 'أقراط فضية مرصعة بحجر الفيروز',
  productType: 'بيع' as ProductType,
  category: 'أزياء وإكسسوارات',
  detailsForAI: 'أقراط فضية نسائية، مصنوعة يدويًا، حجر فيروز طبيعي، تصميم عصري وأنيق، مناسبة للهدايا والمناسبات اليومية.',
  description: 'تألقي بلمسة من الأصالة والجمال مع هذه الأقراط الفضية المصنوعة يدويًا، والمرصعة بحجر الفيروز الطبيعي الساحر. تصميمها العصري يجمع بين الأناقة والبساطة، مما يجعلها قطعة مثالية لإطلالاتكِ اليومية أو كهدية تعبر عن ذوقكِ الرفيع.\n\nتتميز هذه الأقراط بجودة الفضة العالية وحرفية الصنع الدقيقة، مع تركيز على إبراز جمال حجر الفيروز بألوانه الزاهية التي تضفي حيوية وجاذبية. خفيفة الوزن ومريحة للارتداء طوال اليوم.\n\nاقتني هذه القطعة الفريدة الآن وأضيفي لمسة من السحر الطبيعي إلى صندوق مجوهراتكِ، أو قدميها كهدية لا تُنسى لمن تحبين!',
  story: 'كل قطعة أصنعها تحمل شغفي بالأحجار الكريمة وسحر الفضة. هذه الأقراط مستوحاة من زرقة السماء الصافية.',
  price: '3500',
  stock: '15',
  discountPercentage: '5',
  isTaxable: false,
  rentalPrice: '',
  rentalPeriod: 'يوم',
  rentalDeposit: '',
  rentalAvailability: '',
  servicePriceType: 'ثابت',
  servicePrice: '',
  serviceDuration: '',
  serviceLocation: '',
  // images would be handled separately, e.g. array of URLs or File objects
};


export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId as string;
  const { toast } = useToast();

  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [productData, setProductData] = useState<typeof mockEditableProduct | null>(null);
  
  // Form states based on productData after fetch
  const [productType, setProductType] = useState<ProductType>('بيع');
  const [productName, setProductName] = useState('');
  const [productDetailsForAI, setProductDetailsForAI] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDescriptionManuallyEdited, setIsDescriptionManuallyEdited] = useState(false);
  const [price, setPrice] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [rentalPeriod, setRentalPeriod] = useState('يوم');
  const [servicePriceType, setServicePriceType] = useState('ثابت');
  // Add other state variables similar to the new product page based on productData structure


  useEffect(() => {
    // Simulate fetching product data
    if (productId) {
      setIsLoadingProduct(true);
      setTimeout(() => {
        // In a real app, fetch from your backend:
        // const fetchedProduct = await fetchProductById(productId);
        const fetchedProduct = productId === mockEditableProduct.id ? mockEditableProduct : null;

        if (fetchedProduct) {
          setProductData(fetchedProduct);
          // Populate form states
          setProductType(fetchedProduct.productType);
          setProductName(fetchedProduct.name);
          setProductDetailsForAI(fetchedProduct.detailsForAI);
          setGeneratedDescription(fetchedProduct.description);
          // ... populate other states like price, stock, etc.
          setPrice(fetchedProduct.price);
        } else {
          toast({ title: "خطأ", description: `لم يتم العثور على المنتج رقم ${productId} للتعديل.`, variant: "destructive"});
          router.push('/dashboard/products'); // Redirect if product not found
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
    // setGeneratedDescription(''); // Keep current description while generating new one
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName) {
      toast({ title: "اسم المنتج مطلوب", variant: "destructive" });
      return;
    }
    // Submit updated data logic here
    toast({ title: "تم تحديث المنتج/الخدمة بنجاح!", description: `تم حفظ التغييرات على ${productName} (محاكاة).`, variant: "default" });
    router.push('/dashboard/products'); // Redirect after saving
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
    // This case should ideally be handled by the redirect in useEffect, but as a fallback:
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
        {/* Core Product Information */}
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
              <Select defaultValue={productData.category}>
                <SelectTrigger id="productCategory"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {productCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        {/* Product Description & Story */}
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
                    <Textarea id="productStory" defaultValue={productData.story} placeholder="شاركي العملاء الإلهام وراء إبداعكِ..." rows={3} />
                </div>
            </CardContent>
        </Card>

        {/* Pricing Section - Conditional Rendering based on productType */}
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
                        <Input id="stock" type="number" defaultValue={productData.stock} />
                    </div>
                    <div>
                        <Label htmlFor="discountPercentage">نسبة الخصم (اختياري %)</Label>
                        <Input id="discountPercentage" type="number" defaultValue={productData.discountPercentage} />
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                        <Switch id="isTaxable" defaultChecked={productData.isTaxable} />
                        <Label htmlFor="isTaxable" className="text-sm">هذا المنتج خاضع للضريبة</Label>
                    </div>
                </CardContent>
            </Card>
        )}

        {/* Add similar conditional cards for 'إيجار' and 'خدمة' types, pre-filled with productData */}


        {/* Images & Variations */}
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center"><ImageIcon className="ml-2 text-orange-500" /> الصور والتنوعات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <Label htmlFor="productImages">صور المنتج/الخدمة (إدارة الصور الحالية أو تحميل جديد)</Label>
                    <Input id="productImages" type="file" multiple accept="image/*" />
                    <p className="text-xs text-muted-foreground mt-1">يمكنكِ تحميل صور جديدة لاستبدال أو إضافة للصور الحالية.</p>
                    {/* Placeholder for displaying current images and allowing removal/reordering */}
                    <div className="mt-2 p-2 border border-dashed rounded-md text-center text-sm text-muted-foreground">
                        معرض الصور الحالي وإدارته (قيد التطوير)
                    </div>
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
            <Button variant="outline" asChild>
              <Link href="/dashboard/products">إلغاء التعديلات</Link>
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              <PackageEdit className="ml-2 h-4 w-4" /> حفظ التغييرات
            </Button>
          </div>
        </CardFooter>
      </form>
    </div>
  );
}