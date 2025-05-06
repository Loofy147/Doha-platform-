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
    date: "October 25, 2023",
    status: "Delivered",
    total: 3200,
    items: [
      { name: "Handmade Ceramic Mug Set", quantity: 1, imageSrc: "https://picsum.photos/80/80?random=1", dataAiHint: "ceramic mug" },
    ],
    seller: "Amina's Creations",
    deliveryEstimate: "October 27, 2023",
  },
  {
    id: "ORD002",
    date: "October 28, 2023",
    status: "Processing",
    total: 5000,
    items: [
      { name: "Designer Evening Gown Rental", quantity: 1, imageSrc: "https://picsum.photos/80/80?random=2", dataAiHint: "evening gown" },
    ],
    seller: "Layla's Closet",
    deliveryEstimate: "November 2, 2023",
  },
  {
    id: "ORD003",
    date: "November 1, 2023",
    status: "Shipped",
    total: 1800,
    items: [
      { name: "Spiced Date Cookies (Maamoul)", quantity: 2, imageSrc: "https://picsum.photos/80/80?random=3", dataAiHint: "date cookies" },
    ],
    seller: "Khadija's Kitchen",
    deliveryEstimate: "November 5, 2023",
  },
];


export default function OrderPage() {
  // In a real app, you'd fetch user's orders or order details based on ID
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <History size={48} className="mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Your Orders
        </h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          Track your current purchases and view your order history on WomenCommerce.
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
                placeholder="Search by Order ID, Product, Seller..."
                className="pl-10 w-full"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <Button variant="outline" className="w-full sm:w-auto">Apply Filters</Button>
          </div>
        </CardContent>
      </Card>


      {mockOrders.length > 0 ? (
        <div className="space-y-6">
          {mockOrders.map(order => (
            <Card key={order.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start gap-2 pb-3 border-b">
                <div>
                  <CardTitle className="text-xl text-primary">Order #{order.id}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">Date: {order.date} • Seller: <Link href="#" className="text-accent-purple hover:underline">{order.seller}</Link></CardDescription>
                </div>
                <div className="flex flex-col sm:items-end gap-1">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'Shipped' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-muted text-muted-foreground'
                    }`}>
                    {order.status}
                    </span>
                    <p className="text-xs text-muted-foreground">Est. Delivery: {order.deliveryEstimate}</p>
                </div>
              </CardHeader>
              <CardContent className="py-4">
                <ul className="space-y-3 mb-3">
                  {order.items.map(item => (
                    <li key={item.name} className="flex items-center gap-3">
                        <Image src={item.imageSrc} alt={item.name} width={60} height={60} className="rounded-md border object-cover" data-ai-hint={item.dataAiHint} />
                        <div>
                            <p className="font-medium text-foreground">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                    </li>
                  ))}
                </ul>
                <p className="text-lg font-semibold text-accent-pink text-right">Total: DA {order.total.toLocaleString()}</p>
              </CardContent>
              <CardFooter className="border-t pt-4 flex flex-col sm:flex-row justify-end gap-2">
                <Button variant="ghost" size="sm" className="w-full sm:w-auto text-accent-purple hover:text-accent-purple/80"><MessageSquare size={16} className="mr-2" /> Contact Seller</Button>
                <Button variant="outline" size="sm" className="w-full sm:w-auto"><FileText size={16} className="mr-2" /> View Invoice</Button>
                {order.status === 'Shipped' && <Button variant="outline" size="sm" className="w-full sm:w-auto"><Truck size={16} className="mr-2" /> Track Package</Button>}
                {order.status === 'Delivered' && <Button variant="outline" size="sm" className="w-full sm:w-auto"><Star size={16} className="mr-2" /> Leave Review</Button>}
              </CardFooter>
            </Card>
          ))}
            <div className="text-center mt-12">
                <Button variant="outline" size="lg">Load More Orders (Coming Soon)</Button>
            </div>
        </div>
      ) : (
         <div className="text-center py-16 bg-card shadow-md rounded-lg">
          <ShoppingCart size={64} className="mx-auto text-muted-foreground mb-6" />
          <h2 className="text-2xl font-semibold text-primary mb-3">No Orders Yet!</h2>
          <p className="text-foreground/70 mb-8 max-w-md mx-auto">
            It looks like you haven't placed any orders. Start exploring our amazing products and services created by talented women.
          </p>
          <Button asChild size="lg" className="bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground">
            <Link href="/products"> <PackageCheck size={20} className="mr-2"/> Browse Products & Services</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
