// src/app/dashboard/products/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Package, PlusCircle, Search, Filter, Edit, Trash2, Eye, ToggleRight, ToggleLeft } from 'lucide-react'; 
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from '@/components/ui/skeleton';
import { getSellerProductsSummary, ProductType as DetailedProductType, ProductStatus as DetailedProductStatus, allSellerProductsList } from '@/lib/data/mock-seller-data';

// This interface is for the summary data used in this table
interface SellerProductSummary {
  id: string;
  name: string;
  category: string;
  priceDisplay: string;
  type: DetailedProductType;
  stock?: number;
  status: DetailedProductStatus;
  imageSrc: string;
  dataAiHint: string;
  dateAdded: string;
}


const statusColors: Record<DetailedProductStatus, string> = {
  'نشط': 'bg-green-100 text-green-700',
  'غير نشط': 'bg-gray-100 text-gray-700',
  'بانتظار الموافقة': 'bg-yellow-100 text-yellow-700',
  'نفذ المخزون': 'bg-red-100 text-red-700',
};

const productCategories = ["الكل", "أزياء وإكسسوارات", "مستلزمات منزلية وديكور", "جمال وعناية شخصية", "فن ومقتنيات", "حلويات ومأكولات شهية", "حرف يدوية إبداعية", "تأجير إبداعات", "خدمات احترافية", "تأجير منتجات", "خدمات (ورش عمل، استشارات، تصميم)"]; 
const productStatuses: DetailedProductStatus[] = ['نشط', 'غير نشط', 'بانتظار الموافقة', 'نفذ المخزون'];


export default function SellerProductsPage() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [products, setProducts] = useState<SellerProductSummary[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedStatus, setSelectedStatus] = useState<string>('الكل'); 

  useEffect(() => {
    setIsClient(true);
    setProducts(getSellerProductsSummary());
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'الكل' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'الكل' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const toggleProductStatus = (productId: string) => {
    const productIndexInAll = allSellerProductsList.findIndex(p => p.id === productId);
    if (productIndexInAll !== -1) {
      allSellerProductsList[productIndexInAll].status = allSellerProductsList[productIndexInAll].status === 'نشط' ? 'غير نشط' : 'نشط';
    }
    setProducts(getSellerProductsSummary()); // Re-fetch summary after updating source
    toast({ title: "تم تحديث حالة المنتج بنجاح!", variant: "default" });
  };

  const deleteProduct = (productId: string) => {
    const productIndexInAll = allSellerProductsList.findIndex(p => p.id === productId);
    if (productIndexInAll !== -1) {
        allSellerProductsList.splice(productIndexInAll, 1);
    }
    setProducts(getSellerProductsSummary()); // Re-fetch summary
    toast({ title: "تم حذف المنتج!", description: `المنتج #${productId} تم حذفه من متجرك.`, variant: "destructive" });
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
             <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
                <Skeleton className="h-10 flex-grow" />
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-10 w-48" />
             </div>
            <div className="space-y-4">
                {Array(5).fill(0).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-2 border-b">
                        <Skeleton className="h-16 w-16 rounded-md" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-24" />
                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-8 w-8 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
          </CardContent>
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

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-primary">قائمة منتجاتكِ وخدماتكِ الحالية</CardTitle>
          <CardDescription>يمكنكِ البحث، التصفية، وتعديل كل عنصر في قائمتكِ من هنا.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 flex flex-col md:flex-row gap-4 items-center p-4 bg-muted/30 rounded-lg">
            <div className="relative flex-grow w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="text"
                placeholder="ابحثي بالاسم أو رقم المنتج..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full bg-background"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[200px] bg-background">
                  <SelectValue placeholder="تصفية حسب الفئة" />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as DetailedProductStatus | 'الكل')}>
                <SelectTrigger className="w-full sm:w-[180px] bg-background">
                  <SelectValue placeholder="تصفية حسب الحالة" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="الكل">كل الحالات</SelectItem>
                  {productStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Table */}
          {filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">الصورة</TableHead>
                    <TableHead>الاسم/الخدمة</TableHead>
                    <TableHead>الفئة</TableHead>
                    <TableHead>السعر/التكلفة</TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>تاريخ الإضافة</TableHead>
                    <TableHead className="text-center">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id} className="hover:bg-muted/20">
                      <TableCell>
                        <Image src={product.imageSrc} alt={product.name} width={60} height={60} className="rounded-md object-cover border" data-ai-hint={product.dataAiHint}/>
                      </TableCell>
                      <TableCell className="font-medium text-foreground">{product.name}</TableCell>
                      <TableCell className="text-muted-foreground">{product.category}</TableCell>
                      <TableCell className="text-accent-pink font-semibold">{product.priceDisplay}</TableCell>
                      <TableCell>
                        <Badge variant={product.type === 'بيع' ? 'secondary' : product.type === 'إيجار' ? 'outline' : 'default'} className="capitalize">
                            {product.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`capitalize ${statusColors[product.status]}`}>{product.status}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs">{product.dateAdded}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Button variant="ghost" size="icon" title="تعديل المنتج" asChild>
                             <Link href={`/dashboard/products/edit/${product.id}`}><Edit className="h-4 w-4 text-blue-600" /></Link>
                          </Button>
                          <Button variant="ghost" size="icon" title={product.status === 'نشط' ? 'إلغاء تنشيط المنتج' : 'تفعيل المنتج'} onClick={() => toggleProductStatus(product.id)}>
                            {product.status === 'نشط' ? <ToggleRight className="h-4 w-4 text-green-600" /> : <ToggleLeft className="h-4 w-4 text-gray-500" />}
                          </Button>
                           <AlertDialog>
                            <AlertDialogTrigger asChild>
                               <Button variant="ghost" size="icon" title="حذف المنتج">
                                <Trash2 className="h-4 w-4 text-destructive" />
                               </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>هل أنتِ متأكدة من حذف هذا المنتج؟</AlertDialogTitle>
                                <AlertDialogDescription>
                                    هذا الإجراء لا يمكن التراجع عنه. سيتم حذف المنتج "{product.name}" بشكل دائم من متجركِ.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteProduct(product.id)} className="bg-destructive hover:bg-destructive/90">نعم، حذف المنتج</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/20 rounded-md">
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
                لديكِ {filteredProducts.length} منتج/خدمة في القائمة الحالية. ({products.length} إجماليًا).
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
