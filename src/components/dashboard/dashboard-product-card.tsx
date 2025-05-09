// src/components/dashboard/dashboard-product-card.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, ToggleRight, ToggleLeft, Package, DollarSign, CalendarClock, Handshake, BarChart2, TrendingUp, CheckSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DetailedSellerProduct, SellerProductStatus } from '@/lib/data/mock-seller-data'; 
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
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from '@/lib/utils';

interface DashboardProductCardProps {
  product: DetailedSellerProduct; 
  onToggleStatus: (productId: string) => void;
  onDelete: (productId: string) => void;
  onSelectedChange: (productId: string, checked: boolean) => void;
  isSelected: boolean;
}

const statusColors: Record<SellerProductStatus, string> = {
  'نشط': 'bg-green-100 text-green-700 border-green-300',
  'غير نشط': 'bg-gray-100 text-gray-600 border-gray-300',
  'بانتظار الموافقة': 'bg-yellow-100 text-yellow-700 border-yellow-300',
  'نفذ المخزون': 'bg-red-100 text-red-600 border-red-300',
};

const typeIcons: Record<DetailedSellerProduct['productType'], React.ElementType> = {
  'بيع': Package,
  'إيجار': CalendarClock,
  'خدمة': Handshake,
};

export function DashboardProductCard({ product, onToggleStatus, onDelete, onSelectedChange, isSelected }: DashboardProductCardProps) {
  const { toast } = useToast();
  const TypeIcon = typeIcons[product.productType];

  const getPriceDisplay = (p: DetailedSellerProduct): string => {
      if (p.productType === 'بيع') {
        let priceStr = `${parseInt(p.price || '0').toLocaleString()} دج`;
        if(p.discountPercentage && parseInt(p.discountPercentage) > 0) {
            const discountedPrice = parseInt(p.price || '0') * (1 - parseInt(p.discountPercentage)/100);
            priceStr = `${discountedPrice.toLocaleString()} دج`;
        }
        return priceStr;
      } else if (p.productType === 'إيجار') {
        return `${parseInt(p.rentalPrice || '0').toLocaleString()} دج / ${p.rentalPeriod || 'فترة'}`;
      } else if (p.productType === 'خدمة') {
        return p.servicePrice || 'عند الطلب';
      }
      return '-';
  };
  
   const getOriginalPriceDisplay = (p: DetailedSellerProduct): string | null => {
       if (p.productType === 'بيع' && p.discountPercentage && parseInt(p.discountPercentage) > 0) {
           return `${parseInt(p.price).toLocaleString()} دج`;
       }
       return null;
   }

  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden border border-border">
      <CardHeader className="p-0 relative aspect-video overflow-hidden group">
         <div className="absolute top-2 left-2 z-20">
             <Checkbox
                aria-label={`اختيار المنتج ${product.name}`}
                checked={isSelected}
                onCheckedChange={(checked) => onSelectedChange(product.id, !!checked)}
                className="bg-card/80 border-primary/50 data-[state=checked]:bg-primary"
            />
         </div>
         <Link href={`/products/${product.id}`} target="_blank" rel="noopener noreferrer" title="معاينة المنتج العام">
            <Image
                src={product.imageSrc}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={product.dataAiHint}
            />
         </Link>
         <Badge
            variant="outline"
            className={cn("absolute top-2 right-2 z-10 text-xs px-2 py-0.5 capitalize font-medium border", statusColors[product.status])}
          >
            {product.status}
         </Badge>
      </CardHeader>
      <CardContent className="p-4 flex-grow space-y-1.5">
        <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-base font-semibold text-primary line-clamp-2 hover:text-accent-pink transition-colors">
              <Link href={`/dashboard/products/edit/${product.id}`}>{product.name}</Link>
            </CardTitle>
             <Badge variant={product.productType === 'بيع' ? 'secondary' : product.productType === 'إيجار' ? 'outline' : 'default'} className="capitalize text-xs px-1.5 py-0.5 whitespace-nowrap flex items-center gap-1 flex-shrink-0">
                 <TypeIcon size={14}/> 
                 {product.productType}
             </Badge>
        </div>
        <CardDescription className="text-xs text-muted-foreground line-clamp-2">{product.description}</CardDescription>
         <div className="flex items-baseline gap-2 pt-1">
            <p className="text-lg font-bold text-accent-pink">{getPriceDisplay(product)}</p>
            {getOriginalPriceDisplay(product) && (
                <p className="text-sm text-muted-foreground line-through">{getOriginalPriceDisplay(product)}</p>
            )}
         </div>
        {product.productType === 'بيع' && product.stock !== undefined && (
            <p className={cn("text-xs font-medium", parseInt(product.stock || '0') > 5 ? 'text-green-600' : 'text-red-600')}>
                المخزون: {product.stock}
            </p>
        )}
        <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1"><Eye size={12} /> {product.views || 0} مشاهدة</span>
            <span className="flex items-center gap-1"><TrendingUp size={12} /> {product.sales || 0} مبيعات</span>
        </div>
        <p className="text-xs text-muted-foreground">أضيف في: {new Date(product.dateAdded).toLocaleDateString('ar-EG')}</p>
      </CardContent>
      <CardFooter className="p-3 border-t bg-muted/20 flex justify-between items-center gap-1">
        <Button variant="ghost" size="icon" title="تعديل" asChild className="text-blue-600 hover:bg-blue-100 hover:text-blue-700 h-7 w-7">
            <Link href={`/dashboard/products/edit/${product.id}`}><Edit size={16}/></Link>
        </Button>
        <Button variant="ghost" size="icon" title={product.status === 'نشط' ? 'إلغاء التنشيط' : 'تنشيط'} onClick={() => onToggleStatus(product.id)} className={cn(product.status === 'نشط' ? 'text-green-600 hover:bg-green-100 hover:text-green-700' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700', "h-7 w-7")}>
            {product.status === 'نشط' ? <ToggleRight size={16}/> : <ToggleLeft size={16}/>}
        </Button>
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" title="حذف" className="text-destructive hover:bg-destructive/10 hover:text-destructive h-7 w-7">
                    <Trash2 size={16}/>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>هل أنتِ متأكدة من حذف هذا العنصر؟</AlertDialogTitle>
                    <AlertDialogDescription>
                        هذا الإجراء لا يمكن التراجع عنه. سيتم حذف "{product.name}" بشكل دائم من متجركِ وقوائم المنتجات/الخدمات.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDelete(product.id)} className="bg-destructive hover:bg-destructive/90">نعم، حذف العنصر</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
         <Button variant="ghost" size="icon" title="معاينة المنتج العام" asChild className="text-purple-600 hover:bg-purple-100 hover:text-purple-700 h-7 w-7">
             <Link href={`/products/${product.id}`} target="_blank" rel="noopener noreferrer"><Eye size={16}/></Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

