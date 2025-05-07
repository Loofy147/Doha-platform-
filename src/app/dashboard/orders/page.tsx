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
import { ShoppingBag, Search, Filter, Eye, Truck, CheckCircle, XCircle, RefreshCw, FileText } from 'lucide-react';
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
}

interface SellerOrder {
  id: string;
  customerName: string;
  customerAvatar: string;
  dataAiHintAvatar: string;
  date: string;
  totalAmount: number;
  status: OrderStatus;
  itemCount: number;
  items: OrderItem[]; // For detailed view
  shippingAddress?: string;
  paymentMethod?: string;
}

const mockOrders: SellerOrder[] = [
  { 
    id: 'ORD701', 
    customerName: 'نورة السالم', 
    customerAvatar: 'https://picsum.photos/seed/noura/40/40', 
    dataAiHintAvatar: 'woman portrait',
    date: '2024-05-15', 
    totalAmount: 4800, 
    status: 'جديد', 
    itemCount: 2,
    items: [
        {id: 'p1', name: 'كيكة فانيلا مزينة', quantity:1, price: 3500, imageSrc:'https://picsum.photos/seed/cake1/60/60', dataAiHint: 'vanilla cake' },
        {id: 'p2', name: 'مجموعة كب كيك (6 قطع)', quantity:1, price: 1300, imageSrc:'https://picsum.photos/seed/cupcake1/60/60', dataAiHint: 'cupcakes colorful' },
    ],
    shippingAddress: 'شارع الأمير محمد، حي النخيل، الرياض',
    paymentMethod: 'الدفع عند الاستلام'
  },
  { 
    id: 'ORD702', 
    customerName: 'أمل عبدالله', 
    customerAvatar: 'https://picsum.photos/seed/amal/40/40', 
    dataAiHintAvatar: 'woman happy',
    date: '2024-05-14', 
    totalAmount: 12500, 
    status: 'قيد التجهيز', 
    itemCount: 1,
    items: [
        {id: 'p3', name: 'فستان سهرة للإيجار - تصميم خاص', quantity:1, price: 12500, imageSrc:'https://picsum.photos/seed/dress1/60/60', dataAiHint: 'luxury dress' },
    ],
    shippingAddress: 'سيتم الاستلام من المتجر',
    paymentMethod: 'بطاقة ائتمانية (تم الدفع)'
  },
  { 
    id: 'ORD703', 
    customerName: 'سارة خالد', 
    customerAvatar: 'https://picsum.photos/seed/sara/40/40', 
    dataAiHintAvatar: 'woman smiling',
    date: '2024-05-12', 
    totalAmount: 2200, 
    status: 'تم الشحن', 
    itemCount: 3,
    items: [
        {id: 'p4', name: 'أقراط يدوية الصنع', quantity:1, price: 900, imageSrc:'https://picsum.photos/seed/earrings2/60/60', dataAiHint: 'handmade earrings' },
        {id: 'p5', name: 'سلسال فضة ناعم', quantity:2, price: 650, imageSrc:'https://picsum.photos/seed/necklace1/60/60', dataAiHint: 'silver necklace' },
    ],
  },
  { 
    id: 'ORD704', 
    customerName: 'هند الفيصل', 
    customerAvatar: 'https://picsum.photos/seed/hind/40/40', 
    dataAiHintAvatar: 'woman thinking',
    date: '2024-05-10', 
    totalAmount: 750, 
    status: 'تم التسليم', 
    itemCount: 1,
    items: [
        {id: 'p6', name: 'صابون طبيعي بالخزامى', quantity:1, price: 750, imageSrc:'https://picsum.photos/seed/soap1/60/60', dataAiHint: 'lavender soap' },
    ]
  },
  { 
    id: 'ORD705', 
    customerName: 'ريم فهد', 
    customerAvatar: 'https://picsum.photos/seed/reem/40/40', 
    dataAiHintAvatar: 'woman excited',
    date: '2024-05-08', 
    totalAmount: 1500, 
    status: 'ملغي', 
    itemCount: 1,
    items: [
        {id: 'p7', name: 'شمعة عطرية (فانيلا)', quantity:1, price: 1500, imageSrc:'https://picsum.photos/seed/candle1/60/60', dataAiHint: 'vanilla candle' },
    ]
  },
];

const statusColorsMap: Record<OrderStatus, string> = {
  'جديد': 'bg-blue-100 text-blue-700',
  'قيد التجهيز': 'bg-yellow-100 text-yellow-700',
  'تم الشحن': 'bg-purple-100 text-purple-700',
  'تم التسليم': 'bg-green-100 text-green-700',
  'ملغي': 'bg-red-100 text-red-700',
  'مكتمل': 'bg-teal-100 text-teal-700',
  'مؤجل': 'bg-orange-100 text-orange-700',
};

const orderStatuses: OrderStatus[] = ['جديد', 'قيد التجهيز', 'تم الشحن', 'تم التسليم', 'ملغي', 'مكتمل', 'مؤجل'];


export default function SellerOrdersPage() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [orders, setOrders] = useState<SellerOrder[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('الكل');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'الكل' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast({ title: `تم تحديث حالة الطلب #${orderId} إلى "${newStatus}"`, variant: "default" });
  };
  
  // Placeholder for viewing order details, can be a modal or a new page
  const viewOrderDetails = (order: SellerOrder) => {
    // For now, just log to console. Implement modal/page later.
    console.log("View details for order:", order);
    toast({ title: `عرض تفاصيل الطلب #${order.id}`, description: "سيتم عرض التفاصيل في نافذة منبثقة أو صفحة جديدة (قيد التطوير).", variant: "default" });
  };

  if (!isClient) {
     return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
         <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Skeleton className="h-10 w-2/5" />
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
             </div>
            <div className="space-y-4">
                {Array(5).fill(0).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-2 border-b">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-24" />
                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-8 rounded-md" />
                            <Skeleton className="h-8 w-8 rounded-md" />
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
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl flex items-center">
          <ShoppingBag size={36} className="ml-3 text-accent-pink" /> إدارة طلبات متجركِ
        </h1>
        <p className="mt-2 text-lg text-foreground/80">
          تابعي طلبات عملائكِ، قومي بتحديث حالتها، وجهزيها للشحن أو التسليم.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-primary">قائمة الطلبات الواردة</CardTitle>
          <CardDescription>يمكنكِ البحث وتصفية الطلبات حسب الحالة أو معلومات العميل.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 flex flex-col md:flex-row gap-4 items-center p-4 bg-muted/30 rounded-lg">
            <div className="relative flex-grow w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="text"
                placeholder="ابحثي برقم الطلب أو اسم العميلة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full bg-background"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-[180px] bg-background">
                  <SelectValue placeholder="تصفية حسب الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="الكل">كل الحالات</SelectItem>
                  {orderStatuses.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Orders Table */}
          {filteredOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">رقم الطلب</TableHead>
                    <TableHead>اسم العميلة</TableHead>
                    <TableHead>تاريخ الطلب</TableHead>
                    <TableHead className="text-center">عدد المنتجات</TableHead>
                    <TableHead className="text-right">الإجمالي (دج)</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="text-center">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/20">
                      <TableCell className="font-medium text-primary">
                        <Link href={`/dashboard/orders/${order.id}`} className="hover:underline">#{order.id}</Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Image src={order.customerAvatar} alt={order.customerName} width={32} height={32} className="rounded-full" data-ai-hint={order.dataAiHintAvatar} />
                          <span className="text-foreground">{order.customerName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{order.date}</TableCell>
                      <TableCell className="text-center text-muted-foreground">{order.itemCount}</TableCell>
                      <TableCell className="text-right font-semibold text-accent-pink">{order.totalAmount.toLocaleString()}</TableCell>
                      <TableCell>
                         <Select 
                            value={order.status} 
                            onValueChange={(newStatus: OrderStatus) => updateOrderStatus(order.id, newStatus)}
                         >
                            <SelectTrigger className={`capitalize text-xs h-8 px-2 py-1 rounded-md border-0 focus:ring-0 focus:ring-offset-0 ${statusColorsMap[order.status]}`}>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {orderStatuses.map(status => (
                                <SelectItem key={status} value={status} className="capitalize text-xs">{status}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                           <Button variant="ghost" size="icon" title="عرض تفاصيل الطلب" asChild>
                            <Link href={`/dashboard/orders/${order.id}`}><Eye className="h-4 w-4 text-blue-600" /></Link>
                          </Button>
                           <Button variant="ghost" size="icon" title="طباعة الفاتورة (قيد التطوير)" onClick={() => toast({title: "طباعة الفاتورة", description:"سيتم توفير هذه الميزة قريباً.", variant:"default"})}>
                            <FileText className="h-4 w-4 text-gray-500" />
                          </Button>
                          {order.status === 'قيد التجهيز' && (
                            <Button variant="ghost" size="icon" title="تحديد كـ تم الشحن" onClick={() => updateOrderStatus(order.id, 'تم الشحن')}>
                              <Truck className="h-4 w-4 text-purple-600" />
                            </Button>
                          )}
                          {order.status === 'تم الشحن' && (
                            <Button variant="ghost" size="icon" title="تحديد كـ تم التسليم" onClick={() => updateOrderStatus(order.id, 'تم التسليم')}>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/20 rounded-md">
              <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">لا توجد طلبات تطابق بحثكِ</h3>
              <p className="text-foreground/70">
                حاولي تعديل فلاتر البحث، أو انتظري طلبات جديدة من عملائكِ المبدعات!
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t pt-4">
            <p className="text-xs text-muted-foreground">
                لديكِ {filteredOrders.length} طلب في القائمة الحالية. ({orders.length} إجماليًا).
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}