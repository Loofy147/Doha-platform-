'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, Users, LineChart, Settings, PlusCircle, Bell } from "lucide-react";
import Link from "next/link";

const dashboardStats = [
  { title: "Total Sales", value: "DA 125,800", icon: <DollarSign className="text-green-500" />, trend: "+12% this month" },
  { title: "Active Listings", value: "42", icon: <Package className="text-blue-500" />, trend: "5 new" },
  { title: "Total Customers", value: "350", icon: <Users className="text-purple-500" />, trend: "+25 new" },
  { title: "Store Visits", value: "2,100", icon: <LineChart className="text-orange-500" />, trend: "+8% today" },
];

const recentActivity = [
  { id: 1, type: "new_order", description: "New order #ORD004 received for 'Custom Calligraphy'", time: "2 hours ago" },
  { id: 2, type: "review", description: "Layla R. left a 5-star review for 'Evening Gown Rental'", time: "5 hours ago" },
  { id: 3, type: "new_product", description: "You listed 'Hand-painted Silk Scarf'", time: "1 day ago" },
  { id: 4, type: "message", description: "New message from Fatima B. regarding her order", time: "2 days ago" },
];

export default function DashboardPage() {
  // This is a placeholder for a seller dashboard.
  // In a real app, this would fetch and display seller-specific data.
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Seller Dashboard
          </h1>
          <p className="mt-1 text-lg text-foreground/80">
            Welcome back, [Seller Name]! Manage your WomenCommerce store here.
          </p>
        </div>
        <Button asChild className="mt-4 sm:mt-0 bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground">
          <Link href="/dashboard/products/new">
            <PlusCircle size={18} className="mr-2" /> Add New Product/Service
          </Link>
        </Button>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardStats.map((stat) => (
          <Card key={stat.title} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <section className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-primary mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start"><Package size={18} className="mr-2"/> Manage Products/Services</Button>
            <Button variant="outline" className="w-full justify-start"><DollarSign size={18} className="mr-2"/> View Orders & Sales</Button>
            <Button variant="outline" className="w-full justify-start"><Users size={18} className="mr-2"/> Customer Messages</Button>
            <Button variant="outline" className="w-full justify-start"><LineChart size={18} className="mr-2"/> View Analytics</Button>
            <Button variant="outline" className="w-full justify-start"><Settings size={18} className="mr-2"/> Store Settings</Button>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-primary mb-4">Recent Activity</h2>
          <Card className="shadow-md">
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Bell size={16} className="mr-3 text-accent-purple" />
                        <p className="text-sm text-foreground/90">{activity.description}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="p-4 border-t text-center">
              <Button variant="link" className="text-sm text-accent-pink">View All Activity (Coming Soon)</Button>
            </CardFooter>
          </Card>
        </section>
      </div>
       <div className="mt-12 p-8 bg-secondary/10 rounded-lg text-center">
            <h3 className="text-2xl font-semibold text-primary mb-3">Need Help or Want to Learn More?</h3>
            <p className="text-foreground/70 mb-6 max-w-md mx-auto">
                Explore our seller guides, join community discussions, or contact support for assistance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button variant="outline">Seller Guides</Button>
                <Button variant="outline">Community Forum</Button>
                <Button variant="outline">Contact Support</Button>
            </div>
        </div>
    </div>
  );
}
