'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, History, FileText, Search, Filter, PackageCheck, Truck, Star, MessageSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data for demonstration
const mockOrders = [
  {
    id: "ORD001",
    date: "25 أكتوبر 2023",
    status: "تم التوصيل",
    total: 3200,
    items: [
      { name: "طقم أكواب سيراميك مصنوعة يدويًا", quantity: 1, imageSrc: "https://picsum.photos/80/80?random=1", dataAiHint: "ceramic mug" },
    ],
    seller: "إبداعات أمينة",
    deliveryEstimate: "27 أكتوبر 2023",
  },
  {
    id: "ORD002",
    date: "28 أكتوبر 2023",
    status: "قيد المعالجة",
    total: 5000,
    items: [
      { name: "فستان سهرة مصمم للإيجار", quantity: 1, imageSrc: "https://picsum.photos/80/80?random=2", dataAiHint: "evening gown" },
    ],
    seller: "خزانة ليلى",
    deliveryEstimate: "2 نوفمبر 2023",
  },
  {
    id: "ORD003",
    date: "1 نوفمبر 2023",
    status: "تم الشحن",
    total: 1800,
    items: [
      { name: "معمول بالتمر والبهارات (علبتين)", quantity: 2, imageSrc: "https://picsum.photos/80/80?random=3", dataAiHint: "date cookies" },
    ],
    seller: "مطبخ خديجة",
    deliveryEstimate: "5 نوفمبر 2023",
  },
];


export default function OrderPage() {
  // In a real app, you'd fetch user's orders or order details based on ID
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <History size={48} className="mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          طلباتكِ
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          تابعي مشترياتكِ الحالية واطلعي على سجل طلباتكِ في نساء كوميرس.
        </p>
      </header>

      {/* Order Filters/Search */}
      <Card className="mb-8 p-4 shadow-md">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="text"
                placeholder="ابحثي برقم الطلب، المنتج، البائعة..."
                className="pl-10 w-full"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="تصفية حسب الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">كل الحالات</SelectItem>
                        <SelectItem value="processing">قيد المعالجة</SelectItem>
                        <SelectItem value="shipped">تم الشحن</SelectItem>
                        <SelectItem value="delivered">تم التوصيل</SelectItem>
                        <SelectItem value="cancelled">ملغى</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <Button variant="outline" className="w-full sm:w-auto">تطبيق الفلاتر</Button>
          </div>
        </CardContent>
      </Card>


      {mockOrders.length > 0 ? (
        <div className="space-y-6">
          {mockOrders.map(order => (
            <Card key={order.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start gap-2 pb-3 border-b">
                <div>
                  <CardTitle className="text-xl text-primary">طلب رقم #{order.id}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">التاريخ: {order.date} • البائعة: <Link href="#" className="text-accent-purple hover:underline">{order.seller}</Link></CardDescription>
                </div>
                <div className="flex flex-col sm:items-end gap-1">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                    order.status === 'تم التوصيل' ? 'bg-green-100 text-green-700' :
                    order.status === 'قيد المعالجة' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'تم الشحن' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-muted text-muted-foreground'
                    }`}>
                    {order.status}
                    </span>
                    <p className="text-xs text-muted-foreground">التوصيل المقدر: {order.deliveryEstimate}</p>
                </div>
              </CardHeader>
              <CardContent className="py-4">
                <ul className="space-y-3 mb-3">
                  {order.items.map(item => (
                    <li key={item.name} className="flex items-center gap-3">
                        <Image src={item.imageSrc} alt={item.name} width={60} height={60} className="rounded-md border object-cover" data-ai-hint={item.dataAiHint} />
                        <div>
                            <p className="font-medium text-foreground">{item.name}</p>
                            <p className="text-xs text-muted-foreground">الكمية: {item.quantity}</p>
                        </div>
                    </li>
                  ))}
                </ul>
                <p className="text-lg font-semibold text-accent-pink text-right">الإجمالي: {order.total.toLocaleString()} دج</p>
              </CardContent>
              <CardFooter className="border-t pt-4 flex flex-col sm:flex-row justify-end gap-2">
                <Button variant="ghost" size="sm" className="w-full sm:w-auto text-accent-purple hover:text-accent-purple/80"><MessageSquare size={16} className="mr-2" /> تواصلي مع البائعة</Button>
                <Button variant="outline" size="sm" className="w-full sm:w-auto"><FileText size={16} className="mr-2" /> عرض الفاتورة</Button>
                {order.status === 'تم الشحن' && <Button variant="outline" size="sm" className="w-full sm:w-auto"><Truck size={16} className="mr-2" /> تتبعي الشحنة</Button>}
                {order.status === 'تم التوصيل' && <Button variant="outline" size="sm" className="w-full sm:w-auto"><Star size={16} className="mr-2" /> أضيفي تقييمك</Button>}
              </CardFooter>
            </Card>
          ))}
            <div className="text-center mt-12">
                <Button variant="outline" size="lg">تحميل المزيد من الطلبات (قريباً)</Button>
            </div>
        </div>
      ) : (
         <div className="text-center py-16 bg-card shadow-md rounded-lg">
          <ShoppingCart size={64} className="mx-auto text-muted-foreground mb-6" />
          <h2 className="text-2xl font-semibold text-primary mb-3">لا توجد طلبات بعد!</h2>
          <p className="text-foreground/70 mb-8 max-w-md mx-auto">
            يبدو أنكِ لم تقومي بأي طلبات بعد. ابدئي باستكشاف منتجاتنا وخدماتنا المذهلة التي أبدعتها نساء موهوبات.
          </p>
          <Button asChild size="lg" className="bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground">
            <Link href="/products"> <PackageCheck size={20} className="mr-2"/> تصفحي المنتجات والخدمات</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
