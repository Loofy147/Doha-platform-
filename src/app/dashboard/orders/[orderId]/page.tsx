'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, User, MapPin, CreditCard, MessageSquare, Printer, ArrowRightLeft, ChevronLeft, Edit, AlertCircle, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';


type OrderStatus = 'جديد' | 'قيد التجهيز' | 'تم الشحن' | 'تم التسليم' | 'ملغي' | 'مكتمل' | 'مؤجل';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageSrc: string;
  dataAiHint: string;
  sku?: string;
}

interface SellerOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAvatar: string;
  dataAiHintAvatar: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  discount?: number;
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    country: string;
    zipCode?: string;
  };
  billingAddress?: {
    street: string;
    city: string;
    country: string;
    zipCode?: string;
  };
  paymentMethod: string;
  paymentStatus: 'مدفوع' | 'بانتظار الدفع' | 'فشل الدفع' | 'مسترجع';
  notes?: string;
  trackingNumber?: string;
  rentalStartDate?: string;
  rentalEndDate?: string;
}

const mockOrderDetail: SellerOrder = {
  id: 'ORD701',
  customerName: 'نورة السالم',
  customerEmail: 'noura.s@example.com',
  customerPhone: '+966 50 123 4567',
  customerAvatar: 'https://picsum.photos/seed/noura/80/80',
  dataAiHintAvatar: 'woman smiling',
  date: '2024-05-15 10:30 ص',
  status: 'قيد التجهيز',
  items: [
    { id: 'p1', name: 'كيكة فانيلا مزينة بالفواكه الموسمية', quantity: 1, price: 3500, imageSrc: 'https://picsum.photos/seed/cake1/100/100', dataAiHint: 'vanilla cake fruits', sku: 'CK-VAN-FRT-01' },
    { id: 'p2', name: 'مجموعة كب كيك متنوعة (6 قطع)', quantity: 1, price: 1300, imageSrc: 'https://picsum.photos/seed/cupcake1/100/100', dataAiHint: 'assorted cupcakes', sku: 'CC-MIX-06' },
  ],
  subtotal: 4800,
  shippingCost: 25,
  discount: 0,
  totalAmount: 5050, // Updated to reflect subtotal + shipping
  shippingAddress: {
    street: '123 شارع الأمير محمد بن سلمان، حي النخيل',
    city: 'الرياض',
    country: 'المملكة العربية السعودية',
    zipCode: '12345',
  },
  paymentMethod: 'الدفع عند الاستلام',
  paymentStatus: 'بانتظار الدفع',
  notes: 'يرجى التأكد من أن الكيكة خالية من المكسرات. توصيل بين 3-5 مساءً.',
};

const statusColorsMap: Record<OrderStatus, string> = {
  'جديد': 'bg-blue-100 text-blue-700',
  'قيد التجهيز': 'bg-yellow-100 text-yellow-700',
  'تم الشحن': 'bg-purple-100 text-purple-700',
  'تم التسليم': 'bg-green-100 text-green-700',
  'ملغي': 'bg-red-100 text-red-700',
  'مكتمل': 'bg-teal-100 text-teal-700',
  'مؤجل': 'bg-orange-100 text-orange-700',
};

const paymentStatusColors: Record<SellerOrder['paymentStatus'], string> = {
    'مدفوع': 'text-green-600',
    'بانتظار الدفع': 'text-orange-500',
    'فشل الدفع': 'text-red-600',
    'مسترجع': 'text-gray-500',
};


export default function SellerOrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId as string;
  const { toast } = useToast();

  const [order, setOrder] = useState<SellerOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching order details
    if (orderId) {
      setIsLoading(true);
      setTimeout(() => {
        if (orderId === mockOrderDetail.id) {
          setOrder(mockOrderDetail);
        } else {
          setOrder(null); // Or fetch dynamically
          toast({ title: "خطأ", description: `لم يتم العثور على الطلب رقم ${orderId}`, variant: "destructive"});
        }
        setIsLoading(false);
      }, 1000);
    }
  }, [orderId, toast]);

  if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <Button variant="outline" size="sm" className="mb-6" onClick={() => router.back()}>
                <ChevronLeft size={16} className="ml-1" /> العودة لقائمة الطلبات
            </Button>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Skeleton className="h-24 w-full rounded-lg" />
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-32 w-full rounded-lg" />
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-40 w-full rounded-lg" />
                    <Skeleton className="h-40 w-full rounded-lg" />
                </div>
            </div>
        </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
        <AlertCircle size={48} className="mx-auto text-destructive mb-4" />
        <h1 className="text-2xl font-semibold text-destructive mb-2">لم يتم العثور على الطلب</h1>
        <p className="text-muted-foreground mb-6">
          الطلب الذي تبحثين عنه غير موجود أو قد تم حذفه.
        </p>
        <Button onClick={() => router.push('/dashboard/orders')}>العودة لقائمة الطلبات</Button>
      </div>
    );
  }
  
  const handleUpdateStatus = (newStatus: OrderStatus) => {
    setOrder(prev => prev ? { ...prev, status: newStatus } : null);
    toast({ title: `تم تحديث حالة الطلب إلى "${newStatus}" بنجاح!`, variant: "default" });
  };


  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Button variant="outline" size="sm" className="mb-6 group" onClick={() => router.back()}>
         <ChevronLeft size={16} className="ml-1 transition-transform group-hover:-translate-x-1" /> العودة لقائمة الطلبات
      </Button>

      <Card className="mb-8 shadow-xl border-primary/20">
        <CardHeader className="bg-primary/5 p-6 rounded-t-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">تفاصيل الطلب #{order.id}</CardTitle>
              <CardDescription className="text-md text-muted-foreground mt-1">تاريخ الطلب: {order.date}</CardDescription>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2">
                <Badge className={`text-sm px-3 py-1.5 capitalize ${statusColorsMap[order.status]}`}>{order.status}</Badge>
                <p className={`text-sm font-medium ${paymentStatusColors[order.paymentStatus]}`}>
                    حالة الدفع: {order.paymentStatus}
                </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items and Summary */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-primary flex items-center"><ShoppingBag size={22} className="ml-2 text-accent-pink"/> المنتجات/الخدمات في هذا الطلب</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {order.items.map(item => (
                  <li key={item.id} className="flex items-start gap-4 p-3 border-b last:border-b-0">
                    <Image src={item.imageSrc} alt={item.name} width={80} height={80} className="rounded-md border object-cover" data-ai-hint={item.dataAiHint} />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      {item.sku && <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>}
                      <p className="text-sm text-muted-foreground">الكمية: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-accent-pink">{item.price.toLocaleString()} دج</p>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="bg-muted/30 p-4 rounded-b-md">
                <div className="w-full space-y-2 text-sm">
                    <div className="flex justify-between"><span>المجموع الفرعي:</span> <span className="font-medium">{order.subtotal.toLocaleString()} دج</span></div>
                    <div className="flex justify-between"><span>تكلفة الشحن:</span> <span className="font-medium">{order.shippingCost.toLocaleString()} دج</span></div>
                    {order.discount && order.discount > 0 && (
                         <div className="flex justify-between text-green-600"><span>خصم:</span> <span className="font-medium">- {order.discount.toLocaleString()} دج</span></div>
                    )}
                    <Separator className="my-2" />
                    <div className="flex justify-between text-lg font-bold text-primary"><span>الإجمالي:</span> <span>{order.totalAmount.toLocaleString()} دج</span></div>
                </div>
            </CardFooter>
          </Card>

           {order.notes && (
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center"><FileText size={20} className="ml-2 text-accent-purple"/> ملاحظات العميلة</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-foreground/80 whitespace-pre-wrap">{order.notes}</p>
                </CardContent>
            </Card>
           )}
        </div>

        {/* Customer & Shipping Details */}
        <div className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-primary flex items-center"><User size={22} className="ml-2 text-accent-yellow"/> تفاصيل العميلة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src={order.customerAvatar} alt={order.customerName} data-ai-hint={order.dataAiHintAvatar}/>
                  <AvatarFallback>{order.customerName.substring(0,1)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{order.customerName}</p>
                  <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                  {order.customerPhone && <p className="text-sm text-muted-foreground">{order.customerPhone}</p>}
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <MessageSquare size={16} className="ml-2"/> تواصلي مع العميلة (قيد التطوير)
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-primary flex items-center"><MapPin size={22} className="ml-2 text-green-500"/> عنوان الشحن</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-foreground/80">
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.country}</p>
              {order.shippingAddress.zipCode && <p>الرمز البريدي: {order.shippingAddress.zipCode}</p>}
               <Button variant="ghost" size="sm" className="p-0 h-auto mt-2 text-xs text-accent-purple hover:underline">تعديل العنوان (إذا أمكن)</Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-primary flex items-center"><CreditCard size={22} className="ml-2 text-blue-500"/> معلومات الدفع</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p><span className="font-medium text-muted-foreground">طريقة الدفع:</span> {order.paymentMethod}</p>
              <p><span className="font-medium text-muted-foreground">حالة الدفع:</span> <span className={paymentStatusColors[order.paymentStatus]}>{order.paymentStatus}</span></p>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center"><ArrowRightLeft size={20} className="ml-2 text-orange-500"/> تحديث حالة الطلب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {(['جديد', 'قيد التجهيز'] as OrderStatus[]).includes(order.status) && 
                    <Button onClick={() => handleUpdateStatus('قيد التجهيز')} variant="outline" className="w-full">تحديد كـ "قيد التجهيز"</Button>}
                {(['جديد', 'قيد التجهيز'] as OrderStatus[]).includes(order.status) && 
                    <Button onClick={() => handleUpdateStatus('تم الشحن')} variant="outline" className="w-full">تحديد كـ "تم الشحن"</Button>}
                {order.status === 'تم الشحن' && 
                    <Button onClick={() => handleUpdateStatus('تم التسليم')} variant="outline" className="w-full">تحديد كـ "تم التسليم"</Button>}
                {(['جديد', 'قيد التجهيز', 'تم الشحن'] as OrderStatus[]).includes(order.status) && 
                    <Button onClick={() => handleUpdateStatus('ملغي')} variant="destructive" className="w-full">إلغاء الطلب</Button>}
                 <Button variant="ghost" className="w-full text-muted-foreground hover:text-primary">
                    <Printer size={16} className="ml-2"/> طباعة ملخص الطلب (قيد التطوير)
                </Button>
            </CardContent>
        </Card>

        </div>
      </div>
    </div>
  );
}