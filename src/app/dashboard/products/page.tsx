// src/app/dashboard/products/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, PlusCircle, Search, Filter, ArrowUpDown, LayoutGrid, List, Trash2, CheckSquare, XSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { DetailedSellerProduct, SellerProductStatus, ProductType as SellerProductType, deleteSellerProduct, updateSellerProduct, allSellerProductsList } from '@/lib/data/mock-seller-data';
import { DashboardProductCard } from '@/components/dashboard/dashboard-product-card';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { UNIQUE_PRODUCT_CATEGORIES, PRODUCT_STATUSES, PRODUCT_TYPES_CONSTANTS, SortOptionConstant } from '@/lib/constants/categories';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";


type ViewMode = 'grid' | 'list';

const productCategoriesForFilter = ['الكل', ...UNIQUE_PRODUCT_CATEGORIES];


export default function SellerProductsPage() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState<DetailedSellerProduct[]>(allSellerProductsList);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedStatus, setSelectedStatus] = useState<typeof PRODUCT_STATUSES[number]>('الكل');
  const [selectedType, setSelectedType] = useState<typeof PRODUCT_TYPES_CONSTANTS[number]>('الكل');
  const [sortBy, setSortBy] = useState<SortOptionConstant>('dateAddedDesc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  useEffect(() => {
    setIsClient(true);
    // Sync with global mutable list on mount and if it changes elsewhere (though not ideal for production)
    setProducts([...allSellerProductsList]); 
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let tempProducts = [...products]; 

    if (selectedCategory !== 'الكل') {
      tempProducts = tempProducts.filter(p => p.category === selectedCategory);
    }
    if (selectedStatus !== 'الكل') {
      tempProducts = tempProducts.filter(p => p.status === selectedStatus);
    }
     if (selectedType !== 'الكل') {
      tempProducts = tempProducts.filter(p => p.productType === selectedType);
    }
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      tempProducts = tempProducts.filter(p =>
        p.name.toLowerCase().includes(lowerSearchTerm) ||
        p.id.toLowerCase().includes(lowerSearchTerm) ||
        p.description.toLowerCase().includes(lowerSearchTerm) ||
        p.tags?.some(tag => tag.toLowerCase().includes(lowerSearchTerm)) ||
        p.sku?.toLowerCase().includes(lowerSearchTerm)
      );
    }

    tempProducts.sort((a, b) => {
      switch (sortBy) {
        case 'dateAddedAsc':
          return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
        case 'nameAsc':
          return a.name.localeCompare(b.name, 'ar');
        case 'nameDesc':
          return b.name.localeCompare(a.name, 'ar');
        case 'priceAsc': {
            const priceA = parseFloat(a.price || a.rentalPrice || a.servicePrice || '0');
            const priceB = parseFloat(b.price || b.rentalPrice || b.servicePrice || '0');
            return priceA - priceB;
        }
        case 'priceDesc': {
           const priceA = parseFloat(a.price || a.rentalPrice || a.servicePrice || '0');
           const priceB = parseFloat(b.price || b.rentalPrice || b.servicePrice || '0');
           return priceB - priceA;
        }
        case 'stockAsc':
           return (parseInt(a.stock || '0')) - (parseInt(b.stock || '0'));
        case 'stockDesc':
            return (parseInt(b.stock || '0')) - (parseInt(a.stock || '0'));
        case 'dateAddedDesc':
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
    });

    return tempProducts;
  }, [products, searchTerm, selectedCategory, selectedStatus, selectedType, sortBy]);

  const handleProductSelection = (productId: string, checked: boolean) => {
    setSelectedProductIds(prev => 
      checked ? [...prev, productId] : prev.filter(id => id !== productId)
    );
  };
  
  const toggleProductStatus = (productId: string) => {
    const productToUpdate = products.find(p => p.id === productId);
    if (!productToUpdate) return;

    const newStatus = productToUpdate.status === 'نشط' ? 'غير نشط' : 'نشط';
    const updatedProductData = { ...productToUpdate, status: newStatus as SellerProductStatus };

    const success = updateSellerProduct(updatedProductData); // This updates the global mock list

    if (success) {
      setProducts(prev => prev.map(p => p.id === productId ? updatedProductData : p));
      toast({ title: `تم تحديث حالة "${updatedProductData.name}" إلى "${newStatus}"`, variant: "default" });
    } else {
      toast({ title: "خطأ", description: "لم يتم العثور على المنتج لتحديث حالته.", variant: "destructive" });
    }
  };

  const deleteProductHandler = (productId: string) => {
    const productToDelete = products.find(p => p.id === productId);
    if (!productToDelete) return;
    const success = deleteSellerProduct(productId); // This updates the global mock list
    if (success) {
      setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
      toast({ title: "تم حذف المنتج!", description: `"${productToDelete.name}" تم حذفه من متجرك.`, variant: "destructive" });
      setSelectedProductIds(prev => prev.filter(id => id !== productId)); // Deselect if deleted
    } else {
      toast({ title: "خطأ", description: "لم يتم العثور على المنتج لحذفه.", variant: "destructive" });
    }
  };

  const handleBulkDelete = () => {
    selectedProductIds.forEach(id => deleteSellerProduct(id));
    setProducts([...allSellerProductsList]); // Re-sync with the global list
    toast({ title: "تم حذف المنتجات المحددة بنجاح!", variant: "default" });
    setSelectedProductIds([]);
  };

  const handleBulkStatusChange = (newStatus: SellerProductStatus) => {
    selectedProductIds.forEach(id => {
        const product = allSellerProductsList.find(p => p.id === id);
        if(product) {
            updateSellerProduct({...product, status: newStatus });
        }
    });
    setProducts([...allSellerProductsList]);
    toast({ title: `تم تحديث حالة المنتجات المحددة إلى "${newStatus}"!`, variant: "default" });
    setSelectedProductIds([]);
  };


  if (!isClient) {
     return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
         <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Skeleton className="h-10 w-2/5" />
          <Skeleton className="h-10 w-36" />
        </header>
        <Card className="shadow-lg">
          <CardHeader>
             <Skeleton className="h-8 w-1/3 mb-2" />
             <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent>
             <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center p-4 bg-muted/30 rounded-lg border">
                <Skeleton className="h-10 sm:col-span-2 md:col-span-1 lg:col-span-2" />
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
                <div className="flex gap-2 justify-end lg:col-start-5">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                </div>
             </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array(8).fill(0).map((_, i) => (
                   <Card key={i} className="overflow-hidden">
                     <Skeleton className="aspect-square w-full"/>
                     <CardContent className="p-4 space-y-2">
                        <Skeleton className="h-5 w-3/4"/>
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-1/2"/>
                     </CardContent>
                     <CardFooter className="p-3 border-t">
                         <Skeleton className="h-8 w-full"/>
                     </CardFooter>
                   </Card>
                ))}
            </div>
          </CardContent>
           <CardFooter className="border-t pt-4">
                <Skeleton className="h-4 w-1/4"/>
            </CardFooter>
        </Card>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl flex items-center">
            <Package size={36} className="ml-3 text-accent-pink" /> إدارة منتجاتكِ وخدماتكِ
          </h1>
          <p className="mt-2 text-lg text-foreground/80">
            عرض، تعديل، أو إضافة إبداعات جديدة إلى متجركِ على لمسة ضحى.
          </p>
        </div>
        <Button asChild className="bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground shadow-md">
          <Link href="/dashboard/products/new">
            <PlusCircle size={20} className="ml-2" /> أضيفي منتج/خدمة جديدة
          </Link>
        </Button>
      </header>

       {selectedProductIds.length > 0 && (
        <Card className="mb-6 p-4 shadow-md bg-primary/10 border-primary/30">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-sm font-medium text-primary">
              {selectedProductIds.length} عنصر محدد
            </p>
            <div className="flex gap-2 flex-wrap">
              <Button onClick={() => handleBulkStatusChange('نشط')} size="sm" variant="outline" className="border-green-500 text-green-600 hover:bg-green-500/10">
                <CheckSquare size={16} className="ml-2"/> تفعيل المحدد
              </Button>
              <Button onClick={() => handleBulkStatusChange('غير نشط')} size="sm" variant="outline" className="border-gray-500 text-gray-600 hover:bg-gray-500/10">
                <XSquare size={16} className="ml-2"/> إلغاء تفعيل المحدد
              </Button>
              <AlertDialog>
                  <AlertDialogTrigger asChild>
                      <Button size="sm" variant="destructive" className="bg-red-600 hover:bg-red-700">
                        <Trash2 size={16} className="ml-2"/> حذف المحدد
                      </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                      <AlertDialogHeader><AlertDialogTitle>تأكيد الحذف الجماعي</AlertDialogTitle>
                      <AlertDialogDescription>
                          هل أنتِ متأكدة من رغبتك في حذف {selectedProductIds.length} عناصر؟ لا يمكن التراجع عن هذا الإجراء.
                      </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                          <AlertDialogCancel>إلغاء</AlertDialogCancel>
                          <AlertDialogAction onClick={handleBulkDelete} className="bg-destructive hover:bg-destructive/80">نعم، حذف العناصر</AlertDialogAction>
                      </AlertDialogFooter>
                  </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </Card>
      )}


      <Card className="shadow-lg border border-border/50">
        <CardHeader>
          <CardTitle className="text-xl text-primary">قائمة منتجاتكِ وخدماتكِ الحالية</CardTitle>
          <CardDescription>يمكنكِ البحث، التصفية، وتعديل كل عنصر في قائمتكِ من هنا.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center p-4 bg-muted/30 rounded-lg border">
            <div className="relative sm:col-span-2 md:col-span-1 lg:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="ابحثي بالاسم، الوصف، SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full bg-background"
              />
            </div>
            <div className="flex items-center gap-1">
              <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full bg-background text-xs">
                  <SelectValue placeholder="الفئة" />
                </SelectTrigger>
                <SelectContent>
                  {productCategoriesForFilter.map(category => (
                    <SelectItem key={category} value={category} className="text-xs">{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <div className="flex items-center gap-1">
              <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as typeof PRODUCT_STATUSES[number])}>
                <SelectTrigger className="w-full bg-background text-xs">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                    {PRODUCT_STATUSES.map(status => (
                    <SelectItem key={status} value={status} className="text-xs">{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <div className="flex items-center gap-1">
              <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <Select value={selectedType} onValueChange={(value) => setSelectedType(value as typeof PRODUCT_TYPES_CONSTANTS[number])}>
                <SelectTrigger className="w-full bg-background text-xs">
                  <SelectValue placeholder="النوع" />
                </SelectTrigger>
                <SelectContent>
                    {PRODUCT_TYPES_CONSTANTS.map(type => (
                    <SelectItem key={type} value={type} className="text-xs capitalize">{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-1">
                 <ArrowUpDown className="h-4 w-4 text-muted-foreground flex-shrink-0"/>
                 <Select value={sortBy} onValueChange={(value: SortOptionConstant) => setSortBy(value)}>
                     <SelectTrigger className="w-full bg-background text-xs"><SelectValue placeholder="ترتيب حسب"/></SelectTrigger>
                     <SelectContent>
                         <SelectItem value="dateAddedDesc" className="text-xs">الأحدث أولاً</SelectItem>
                         <SelectItem value="dateAddedAsc" className="text-xs">الأقدم أولاً</SelectItem>
                         <SelectItem value="nameAsc" className="text-xs">الاسم (أ-ي)</SelectItem>
                         <SelectItem value="nameDesc" className="text-xs">الاسم (ي-أ)</SelectItem>
                         <SelectItem value="priceAsc" className="text-xs">السعر (من الأقل)</SelectItem>
                         <SelectItem value="priceDesc" className="text-xs">السعر (من الأعلى)</SelectItem>
                         <SelectItem value="stockAsc" className="text-xs">المخزون (من الأقل)</SelectItem>
                         <SelectItem value="stockDesc" className="text-xs">المخزون (من الأعلى)</SelectItem>
                     </SelectContent>
                 </Select>
            </div>
            <div className="flex items-center justify-end gap-2 lg:col-start-5">
                 <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('grid')} className="h-8 w-8">
                     <LayoutGrid size={16}/>
                     <span className="sr-only">عرض شبكي</span>
                 </Button>
                 <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')} className="h-8 w-8">
                     <List size={16}/>
                      <span className="sr-only">عرض قائمة</span>
                 </Button>
            </div>
          </div>

          {filteredAndSortedProducts.length > 0 ? (
             <AnimatePresence mode="wait">
               <motion.div
                  key={viewMode} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                      "grid gap-6",
                      viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                  )}
                >
                {filteredAndSortedProducts.map((product, index) => (
                     <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10}}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
                        layout 
                    >
                         <DashboardProductCard
                            product={product}
                            onToggleStatus={toggleProductStatus}
                            onDelete={deleteProductHandler}
                            isSelected={selectedProductIds.includes(product.id)}
                            onSelectedChange={handleProductSelection}
                        />
                     </motion.div>
                ))}
              </motion.div>
             </AnimatePresence>
          ) : (
            <div className="text-center py-12 bg-muted/20 rounded-md border border-dashed">
              <Package size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">لا توجد منتجات أو خدمات تطابق بحثكِ</h3>
              <p className="text-foreground/70">
                حاولي تعديل فلاتر البحث، أو <Link href="/dashboard/products/new" className="text-accent-pink hover:underline font-semibold">أضيفي منتجًا جديدًا</Link> لبدء البيع!
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t pt-4">
            <p className="text-xs text-muted-foreground">
                عرض {filteredAndSortedProducts.length} من أصل {products.length} منتج/خدمة.
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}

