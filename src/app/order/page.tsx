'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, History, FileText, Search } from "lucide-react";
import Link from "next/link";

// Mock data for demonstration
const mockOrders = [
  {
    id: "ORD001",
    date: "October 25, 2023",
    status: "Delivered",
    total: 3200,
    items: [
      { name: "Handmade Ceramic Mug Set", quantity: 1 },
    ],
    seller: "Amina's Creations"
  },
  {
    id: "ORD002",
    date: "October 28, 2023",
    status: "Processing",
    total: 5000,
    items: [
      { name: "Designer Evening Gown Rental", quantity: 1 },
    ],
    seller: "Layla's Closet"
  },
  {
    id: "ORD003",
    date: "November 1, 2023",
    status: "Shipped",
    total: 1800,
    items: [
      { name: "Spiced Date Cookies (Maamoul)", quantity: 2 },
    ],
    seller: "Khadija's Kitchen"
  },
];


export default function OrderPage() {
  // In a real app, you'd fetch user's orders or order details based on ID
  // For now, this is a general placeholder for an order history / management page
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

      {/* Order Filters/Search - Placeholder */}
      <div className="mb-8 p-4 bg-card rounded-lg shadow flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search by Order ID, Product Name..."
            className="pl-10 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
        {/* Add Select for status filter if needed */}
      </div>

      {mockOrders.length > 0 ? (
        <div className="space-y-6">
          {mockOrders.map(order => (
            <Card key={order.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row justify-between items-start pb-3">
                <div>
                  <CardTitle className="text-xl text-primary">Order #{order.id}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">Date: {order.date} • Seller: {order.seller}</CardDescription>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                  order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                  order.status === 'Shipped' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {order.status}
                </span>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-foreground/80 mb-3">
                  {order.items.map(item => (
                    <li key={item.name}>{item.name} (Qty: {item.quantity})</li>
                  ))}
                </ul>
                <p className="text-lg font-semibold text-accent-pink">Total: DA {order.total.toLocaleString()}</p>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm"><FileText size={16} className="mr-2" /> View Invoice (Soon)</Button>
                <Button variant="ghost" size="sm">Track Package (Soon)</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
         <div className="text-center py-16">
          <ShoppingCart size={64} className="mx-auto text-muted-foreground mb-6" />
          <h2 className="text-2xl font-semibold text-primary mb-3">No Orders Yet!</h2>
          <p className="text-foreground/70 mb-8">
            It looks like you haven't placed any orders. Start exploring our amazing products and services!
          </p>
          <Button asChild size="lg">
            <Link href="/products">Browse Products & Services</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
