
// src/app/products/page.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Eye, Filter, Search, ShoppingBag, CalendarClock, Handshake, PackageSearch, DollarSign } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { getAllPlatformItems, type Product as StoreProduct, type Service as StoreService, type ItemType as PublicItemType } from '@/lib/data/mock-store-data';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { UNIQUE_PRODUCT_CATEGORIES, PRODUCT_TYPES_CONSTANTS, type ProductTypeConstant } from '@/lib/constants/categories';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';


type DisplayItem = (StoreProduct | StoreService) & { 
  itemType: 'product' | 'service'; 
  sellerName: string; 
  storeSlug: string;
  effectivePrice: number; // Added for price filtering
};

const categoriesForFilter = ['الكل', ...UNIQUE_PRODUCT_CATEGORIES];
const MAX_PRICE = 20000; // Example max price for slider

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  const initialType = searchParams.get('type') as ProductTypeConstant | null;
  const { toast } = useToast();

  const [isClient, setIsClient] = useState(false);
  const [allItems, setAllItems] = useState<DisplayItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<DisplayItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'الكل');
  const [selectedType, setSelectedType] = useState<typeof PRODUCT_TYPES_CONSTANTS[number]>(initialType || 'الكل');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);
  const [selectedItem, setSelectedItem] = useState<DisplayItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const platformItems = getAllPlatformItems().map(item => {
      let effectivePrice = 0;
      if (item.itemType === 'product') {
        const product = item as StoreProduct;
        effectivePrice = product.rawPrice || 0;
        if (product.discountPercentage && parseInt(product.discountPercentage) > 0 && product.rawPrice) {
          effectivePrice = product.rawPrice * (1 - parseInt(product.discountPercentage) / 100);
        }
      } else if (item.itemType === 'service') {
        effectivePrice = (item as StoreService).rawPrice || 0;
      }
      return { ...item, effectivePrice };
    });
    setAllItems(platformItems);
  }, []);

  useEffect(() => {
    let items = [...allItems];
    if (selectedCategory !== 'الكل') {
      items = items.filter(p => p.category === selectedCategory);
    }
    if (selectedType !== 'الكل') {
      items = items.filter(p => p.type === selectedType);
    }
    if (searchTerm) {
      items = items.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.itemType === 'product' ? (p as StoreProduct).sellerId.toLowerCase().includes(searchTerm.toLowerCase()) : (p as StoreService).sellerId.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    // Price range filter
    items = items.filter(p => p.effectivePrice >= priceRange[0] && p.effectivePrice <= priceRange[1]);

    setFilteredItems(items);
  }, [selectedCategory, selectedType, searchTerm, priceRange, allItems]);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
    if (initialType) {
      setSelectedType(initialType);
    }
  }, [initialCategory, initialType]);

  const handleViewDetails = (item: DisplayItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const getItemPriceDisplay = (item: DisplayItem) => {
    if (item.itemType === 'product') {
      const product = item as StoreProduct;
      if (product.discountPercentage && parseInt(product.discountPercentage) > 0 && product.rawPrice) {
        return `${(product.rawPrice * (1 - parseInt(product.discountPercentage) / 100)).toLocaleString()} دج`;
      }
      return product.price; 
    }
    if (item.itemType === 'service') {
      return (item as StoreService).price; 
    }
    return 'السعر غير متوفر';
  };

  const getModalActionText = (type?: PublicItemType) => {
    switch (type) {
      case 'بيع': return <><ShoppingBag size={18} className="mr-2" /> أضيفي للسلة (قريباً)</>;
      case 'إيجار': return <><CalendarClock size={18} className="mr-2" /> احجزي الآن (قريباً)</>;
      case 'خدمة': return <><Handshake size={18} className="mr-2" /> استفسري/احجزي الخدمة (قريباً)</>;
      default: return 'عرض التفاصيل';
    }
  };

  const handlePrimaryActionInModal = (item: DisplayItem) => {
     const actionText = item.type === 'بيع' ? 'أضيف للسلة' : item.type === 'إيجار' ? 'احجزي الآن' : 'استفسري/احجزي الخدمة';
      toast({
        title: `🛍️ ${item.name}`,
        description: `تم ${actionText.toLowerCase()} بنجاح (محاكاة)!`,
        action: <Button variant="outline" size="sm" onClick={() => router.push(item.type === 'بيع' ? '/cart' : '/dashboard/orders')}>متابعة</Button>,
      });
     setIsModalOpen(false);
  };

  if (!isClient) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-1/2 mx-auto mb-4" />
          <Skeleton className="h-6 w-3/4 mx-auto" />
        </div>
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center p-4 bg-card rounded-lg shadow">
            <Skeleton className="h-10 flex-grow" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={`skeleton-${index}`} className="overflow-hidden shadow-lg rounded-lg flex flex-col">
                <Skeleton className="aspect-square w-full rounded-t-lg" />
                <CardContent className="p-6 flex flex-col flex-grow">
                  <Skeleton className="h-6 mb-2 w-3/4" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-5/6 mb-2" />
                   <Skeleton className="h-6 w-1/3 mt-auto" />
                </CardContent>
                <CardFooter className="p-4">
                  <Skeleton className="h-10 w-full rounded-md" />
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
        <PackageSearch size={48} className="mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          اكتشفي إبداعات وخدمات فريدة
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          تصفحي مجموعة متنوعة من إبداعات نساء موهوبات. كل قطعة وخدمة تحكي قصة.
        </p>
      </header>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end p-4 bg-card rounded-lg shadow">
        <div className="relative flex-grow w-full md:col-span-2 lg:col-span-1">
          <Label htmlFor="search-term">بحث</Label>
          <Search className="absolute left-3 top-1/2 mt-2.5 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="search-term"
            type="text"
            placeholder="منتجات، خدمات، بائعات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full mt-1"
          />
        </div>
        <div className="w-full">
          <Label htmlFor="category-filter">الفئة</Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger id="category-filter" className="w-full mt-1">
              <SelectValue placeholder="تصفية حسب الفئة" />
            </SelectTrigger>
            <SelectContent>
              {categoriesForFilter.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          <Label htmlFor="type-filter">النوع</Label>
          <Select value={selectedType} onValueChange={(value) => setSelectedType(value as typeof PRODUCT_TYPES_CONSTANTS[number])}>
            <SelectTrigger id="type-filter" className="w-full mt-1">
              <SelectValue placeholder="تصفية حسب النوع" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_TYPES_CONSTANTS.map(type => (
                <SelectItem key={type} value={type} className="capitalize">{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:col-span-2 lg:col-span-1">
          <Label htmlFor="price-range-filter" className="flex justify-between items-center mb-1">
            <span>نطاق السعر (دج)</span>
            <span className="text-xs text-primary font-medium">{priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}</span>
          </Label>
          <Slider
            id="price-range-filter"
            min={0}
            max={MAX_PRICE}
            step={100}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mt-2"
            aria-label="نطاق السعر"
          />
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map(item => (
            <Card key={item.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg flex flex-col bg-card">
              <CardHeader className="p-0 relative">
                <Link href={`/products/${item.id}`} passHref>
                    <div className="aspect-square">
                    <Image
                        src={item.imageSrc || 'https://picsum.photos/400/400?random=fallback'}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={item.dataAiHint || 'product image'}
                    />
                    </div>
                </Link>
              </CardHeader>
              <CardContent className="p-4 flex flex-col flex-grow">
                <CardTitle className="text-lg font-semibold text-primary hover:text-accent-pink transition-colors mb-1 line-clamp-2 cursor-pointer" onClick={() => router.push(`/products/${item.id}`)}>{item.name}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground mb-1">
                  مقدم من <Link href={`/store/${item.storeSlug}`} className="text-accent-purple hover:underline">{item.sellerName}</Link> • {item.category}
                </CardDescription>
                <span className="text-xs capitalize bg-accent-purple/20 text-accent-purple-foreground px-2 py-0.5 rounded-full self-start mb-2">{item.type}</span>
                <p className="text-sm text-foreground/80 flex-grow mb-2 line-clamp-3">{item.description}</p>
                <p className="text-xl font-bold text-accent-pink mt-auto">{getItemPriceDisplay(item)}</p>
              </CardContent>
              <CardFooter className="p-4 border-t">
                <Button
                  variant="outline"
                  className="w-full hover:bg-accent-yellow/20 hover:border-accent-yellow text-primary border-primary group"
                  onClick={() => router.push(`/products/${item.id}`)}
                >
                  <Eye size={18} className="ml-2 group-hover:text-accent-yellow transition-colors" /> عرض التفاصيل
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-primary mb-2">لا توجد إبداعات أو خدمات تطابق بحثكِ</h3>
          <p className="text-foreground/70">
            جرّبي تعديل فلاتر البحث، أو عاودي التحقق لاحقًا لرؤية إبداعات جديدة!
          </p>
        </div>
      )}

      {selectedItem && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <div className="aspect-video my-4 rounded-md overflow-hidden relative">
                 <Image
                  src={selectedItem.imageSrc || 'https://picsum.photos/400/300?random=modal'}
                  alt={selectedItem.name}
                  fill
                  className="object-cover"
                  data-ai-hint={selectedItem.dataAiHint || 'item image'}
                />
              </div>
              <DialogTitle className="text-2xl text-primary">{selectedItem.name}</DialogTitle>
              <p className="text-sm text-muted-foreground">
                  مقدم من <Link href={`/store/${selectedItem.storeSlug}`} className="text-accent-purple hover:underline">{selectedItem.sellerName}</Link> • الفئة: {selectedItem.category} • النوع: <span className="capitalize">{selectedItem.type}</span>
              </p>
            </DialogHeader>
            <DialogDescription className="text-base text-foreground/80 text-left py-4 max-h-[200px] overflow-y-auto">
              {selectedItem.longDescription || selectedItem.description}
            </DialogDescription>
            <p className="text-2xl font-bold text-accent-pink mt-2 text-left">{getItemPriceDisplay(selectedItem)}</p>
            <DialogFooter className="mt-6 sm:justify-between items-center">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                إغلاق
              </Button>
              <Button type="button" className="bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground" onClick={() => handlePrimaryActionInModal(selectedItem)}>
                {getModalActionText(selectedItem.type)}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

