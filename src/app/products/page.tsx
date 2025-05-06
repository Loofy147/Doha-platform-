'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Eye, Filter, Search, ShoppingBag, CalendarClock, Handshake } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

type ProductType = 'بيع' | 'إيجار' | 'خدمة';

interface Product {
  id: string;
  name: string;
  type: ProductType;
  category: string;
  seller: string;
  description: string;
  longDescription: string;
  price?: number; 
  rentalPricePerDay?: number;
  servicePrice?: string; 
  imageSrc: string;
  dataAiHint: string;
}

const allProducts: Product[] = [
  {
    id: 'prod1',
    name: 'طقم أكواب سيراميك يدوي الصنع',
    type: 'بيع',
    category: 'مستلزمات منزلية',
    seller: 'إبداعات أمينة',
    description: 'طقم من كوبين سيراميك مصنوعين بحرفية فائقة.',
    longDescription: 'هذا الطقم المكون من كوبين من السيراميك مصنوع يدويًا بحب من قبل أمينة. يتميز كل كوب بطلاء فريد ومقبض مريح. آمن للغسل في غسالة الصحون والميكروويف. السعة: 350 مل.',
    price: 2800,
    imageSrc: 'https://picsum.photos/400/400?random=11',
    dataAiHint: 'ceramic mugs',
  },
  {
    id: 'prod2',
    name: 'فستان سهرة للمناسبات (للايجار)',
    type: 'إيجار',
    category: 'أزياء',
    seller: 'خزانة ليلى',
    description: 'فستان سهرة أنيق، مثالي للمناسبات الخاصة.',
    longDescription: 'استأجري فستان السهرة المذهل هذا لمناسبتك القادمة. متوفر بمقاسات متعددة. يشمل التنظيف الجاف. مدة الإيجار: 3 أيام.',
    rentalPricePerDay: 5000,
    imageSrc: 'https://picsum.photos/400/400?random=12',
    dataAiHint: 'evening gown',
  },
  {
    id: 'prod3',
    name: 'خدمة تصميم كيك مخصص',
    type: 'خدمة',
    category: 'حلويات ومأكولات',
    seller: 'حلويات فاطمة',
    description: 'تصميم كيك حسب الطلب لحفلات الزفاف والمناسبات.',
    longDescription: 'تقدم فاطمة خدمات تصميم كيك مخصصة لجميع المناسبات. اختاري النكهات، التصميم، والحجم. يتطلب استشارة. تختلف الأسعار حسب التعقيد.',
    servicePrice: 'ابتداءً من 8000 دج',
    imageSrc: 'https://picsum.photos/400/400?random=13',
    dataAiHint: 'custom cake service',
  },
  {
    id: 'prod4',
    name: 'لوحة خط عربي فنية (بيع)',
    type: 'بيع',
    category: 'فن وديكور',
    seller: 'إبداعات نورا الخطاطة',
    description: 'قطعة خط عربي مخصصة للمنزل أو كهدية.',
    longDescription: 'اطلبي قطعة خط عربي جميلة ومخصصة من نورا. اختاري اقتباسك المفضل، اسم، أو آية. تتوفر أحجام وخيارات تأطير متنوعة.',
    price: 3200,
    imageSrc: 'https://picsum.photos/400/400?random=14',
    dataAiHint: 'calligraphy art',
  },
   {
    id: 'prod5',
    name: 'معدات تصوير للإيجار',
    type: 'إيجار',
    category: 'خدمات',
    seller: 'شركة LensLease',
    description: 'استأجري كاميرات وعدسات وإضاءة احترافية.',
    longDescription: 'احصلي على معدات تصوير عالية الجودة دون التزام الشراء. خيارات إيجار يومية وأسبوعية لمجموعة متنوعة من المعدات.',
    rentalPricePerDay: 3000,
    imageSrc: 'https://picsum.photos/400/400?random=15',
    dataAiHint: 'camera rental',
  },
  {
    id: 'prod6',
    name: 'غطاء وسادة حرير مرسوم يدويًا',
    type: 'بيع',
    category: 'مستلزمات منزلية',
    seller: 'حرير سميرة',
    description: 'غطاء وسادة حريري فاخر، تصاميم فريدة.',
    longDescription: 'أضيفي لمسة فنية إلى منزلك مع أغطية وسائد الحرير المرسومة يدويًا من سميرة. كل قطعة فريدة من نوعها. تناسب الوسائد القياسية مقاس 45x45 سم. الغطاء فقط.',
    price: 3800,
    imageSrc: 'https://picsum.photos/400/400?random=16',
    dataAiHint: 'silk cushion',
  },
   {
    id: 'prod7',
    name: 'خدمة دروس خصوصية عبر الإنترنت (رياضيات)',
    type: 'خدمة',
    category: 'تعليم',
    seller: 'دروس زهرة',
    description: 'دروس رياضيات خصوصية عبر الإنترنت لطلاب الابتدائي والمتوسط والثانوي.',
    longDescription: 'تقدم زهرة دروس رياضيات خصوصية عبر الإنترنت مصممة خصيصًا لتلبية احتياجات كل طالب. حسني درجاتكِ وابني ثقتكِ بنفسك. تتوفر جلسات بالساعة.',
    servicePrice: '2000 دج / ساعة',
    imageSrc: 'https://picsum.photos/400/400?random=17',
    dataAiHint: 'online tutoring',
  },
  {
    id: 'prod8',
    name: 'تونر ماء ورد طبيعي للوجه',
    type: 'بيع',
    category: 'جمال وعناية',
    seller: 'حديقة ياسمين',
    description: 'تونر ماء ورد نقي ومنعش. 100 مل.',
    longDescription: 'جددي بشرتكِ مع تونر ماء الورد النقي من ياسمين. مصنوع من بتلات الورد المقطرة، يساعد على ترطيب وتوازن وتوحيد لون بشرتك. مناسب لجميع أنواع البشرة. عبوة بخاخ 100 مل.',
    price: 1200,
    imageSrc: 'https://picsum.photos/400/400?random=18',
    dataAiHint: 'rosewater toner',
  }
];

const categories = ['الكل', ...new Set(allProducts.map(p => p.category))];
const productTypes: ProductType[] = ['بيع', 'إيجار', 'خدمة'];

export default function ProductsPage() {
  const [isClient, setIsClient] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [selectedType, setSelectedType] = useState<string>('الكل');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let products = allProducts;
    if (selectedCategory !== 'الكل') {
      products = products.filter(p => p.category === selectedCategory);
    }
    if (selectedType !== 'الكل') {
      products = products.filter(p => p.type === selectedType);
    }
    if (searchTerm) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.seller.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(products);
  }, [selectedCategory, selectedType, searchTerm]);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  const getProductPriceDisplay = (product: Product) => {
    switch (product.type) {
      case 'بيع':
        return `${product.price?.toLocaleString()} دج`;
      case 'إيجار':
        return `${product.rentalPricePerDay?.toLocaleString()} دج / يوم`;
      case 'خدمة':
        return product.servicePrice || 'استفسري عن السعر';
      default:
        return 'غير متوفر';
    }
  };

  const getModalActionText = (type?: ProductType) => {
    switch (type) {
      case 'بيع': return <><ShoppingBag size={18} className="mr-2" /> أضيفي للسلة (قريباً)</>;
      case 'إيجار': return <><CalendarClock size={18} className="mr-2" /> احجزي الآن (قريباً)</>;
      case 'خدمة': return <><Handshake size={18} className="mr-2" /> استفسري/احجزي الخدمة (قريباً)</>;
      default: return 'عرض التفاصيل';
    }
  }

  if (!isClient) {
    // Skeleton loader
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            استكشفي المنتجات والخدمات
          </h1>
          <p className="mt-4 text-lg text-foreground/80">
            جاري تحميل إبداعات وخدمات مذهلة...
          </p>
        </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={`skeleton-${index}`} className="overflow-hidden shadow-lg rounded-lg flex flex-col">
                <div className="aspect-square bg-muted animate-pulse rounded-t-lg"></div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="h-6 bg-muted animate-pulse mb-2 w-3/4"></div>
                  <div className="h-4 bg-muted animate-pulse w-full mb-1"></div>
                  <div className="h-4 bg-muted animate-pulse w-5/6 mb-2"></div>
                   <div className="h-6 bg-muted animate-pulse w-1/3 mt-auto"></div>
                </CardContent>
                <CardFooter className="p-4">
                  <div className="h-10 bg-muted animate-pulse w-full rounded-md"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          اكتشفي إبداعات وخدمات فريدة
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          تصفحي مجموعة متنوعة من إبداعات نساء موهوبات. كل قطعة وخدمة تحكي قصة.
        </p>
      </header>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center p-4 bg-card rounded-lg shadow">
        <div className="relative flex-grow w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="text"
            placeholder="ابحثي عن منتجات، خدمات، بائعات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="تصفية حسب الفئة" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="تصفية حسب النوع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="الكل">كل الأنواع</SelectItem>
              {productTypes.map(type => (
                <SelectItem key={type} value={type} className="capitalize">{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg flex flex-col bg-card">
              <CardHeader className="p-0 relative">
                <div className="aspect-square">
                  <Image
                    src={product.imageSrc}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover rounded-t-lg"
                    data-ai-hint={product.dataAiHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 flex flex-col flex-grow">
                <CardTitle className="text-lg font-semibold text-primary mb-1">{product.name}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground mb-1">مقدم من {product.seller} • {product.category}</CardDescription>
                <span className="text-xs capitalize bg-accent-purple/20 text-accent-purple-foreground px-2 py-0.5 rounded-full self-start mb-2">{product.type}</span>
                <p className="text-sm text-foreground/80 flex-grow mb-2">{product.description}</p>
                <p className="text-xl font-bold text-accent-pink mt-auto">{getProductPriceDisplay(product)}</p>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <Button
                  variant="outline"
                  className="w-full hover:bg-accent-yellow/20 hover:border-accent-yellow"
                  onClick={() => handleViewDetails(product)}
                >
                  <Eye size={18} className="mr-2" /> عرض التفاصيل
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-primary mb-2">لم يتم العثور على منتجات</h3>
          <p className="text-foreground/70">
            حاولي تعديل بحثك أو فلاترك، أو عاودي التحقق لاحقًا لرؤية الإضافات الجديدة!
          </p>
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <div className="aspect-video my-4 rounded-md overflow-hidden relative">
                 <Image
                  src={selectedProduct.imageSrc}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                  data-ai-hint={selectedProduct.dataAiHint}
                />
              </div>
              <DialogTitle className="text-2xl text-primary">{selectedProduct.name}</DialogTitle>
              <p className="text-sm text-muted-foreground">مقدم من {selectedProduct.seller} • الفئة: {selectedProduct.category} • النوع: <span className="capitalize">{selectedProduct.type}</span></p>
            </DialogHeader>
            <DialogDescription className="text-base text-foreground/80 text-left py-4 max-h-[200px] overflow-y-auto">
              {selectedProduct.longDescription}
            </DialogDescription>
            <p className="text-2xl font-bold text-accent-pink mt-2 text-left">{getProductPriceDisplay(selectedProduct)}</p>
            <DialogFooter className="mt-6 sm:justify-between items-center">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                إغلاق
              </Button>
              <Button type="button" className="bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground">
                {getModalActionText(selectedProduct.type)}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
