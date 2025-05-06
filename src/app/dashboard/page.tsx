'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, Users, LineChart, Settings, PlusCircle, Bell } from "lucide-react";
import Link from "next/link";

const dashboardStats = [
  { title: "إجمالي المبيعات", value: "125,800 دج", icon: <DollarSign className="text-green-500" />, trend: "+12% هذا الشهر" },
  { title: "المنتجات/الخدمات النشطة", value: "42", icon: <Package className="text-blue-500" />, trend: "5 جديدة" },
  { title: "إجمالي العملاء", value: "350", icon: <Users className="text-purple-500" />, trend: "+25 جدد" },
  { title: "زيارات المتجر", value: "2,100", icon: <LineChart className="text-orange-500" />, trend: "+8% اليوم" },
];

const recentActivity = [
  { id: 1, type: "new_order", description: "طلب جديد #ORD004 لـ 'خط عربي مخصص'", time: "منذ ساعتين" },
  { id: 2, type: "review", description: "ليلى ر. تركت تقييم 5 نجوم لـ 'فستان سهرة للإيجار'", time: "منذ 5 ساعات" },
  { id: 3, type: "new_product", description: "أضفتِ 'وشاح حرير مرسوم يدويًا'", time: "منذ يوم واحد" },
  { id: 4, type: "message", description: "رسالة جديدة من فاطمة ب. بخصوص طلبها", time: "منذ يومين" },
];

export default function DashboardPage() {
  // This is a placeholder for a seller dashboard.
  // In a real app, this would fetch and display seller-specific data.
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            لوحة تحكم البائعة
          </h1>
          <p className="mt-1 text-lg text-foreground/80">
            أهلاً بعودتكِ، [اسم البائعة]! أديري متجركِ على نساء كوميرس من هنا.
          </p>
        </div>
        <Button asChild className="mt-4 sm:mt-0 bg-accent-yellow hover:bg-accent-yellow/90 text-accent-yellow-foreground">
          <Link href="/dashboard/products/new">
            <PlusCircle size={18} className="mr-2" /> أضيفي منتج/خدمة جديدة
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
          <h2 className="text-xl font-semibold text-primary mb-4">إجراءات سريعة</h2>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start"><Package size={18} className="mr-2"/> إدارة المنتجات/الخدمات</Button>
            <Button variant="outline" className="w-full justify-start"><DollarSign size={18} className="mr-2"/> عرض الطلبات والمبيعات</Button>
            <Button variant="outline" className="w-full justify-start"><Users size={18} className="mr-2"/> رسائل العملاء</Button>
            <Button variant="outline" className="w-full justify-start"><LineChart size={18} className="mr-2"/> عرض التحليلات</Button>
            <Button variant="outline" className="w-full justify-start"><Settings size={18} className="mr-2"/> إعدادات المتجر</Button>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-primary mb-4">النشاطات الأخيرة</h2>
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
              <Button variant="link" className="text-sm text-accent-pink">عرض كل النشاطات (قريباً)</Button>
            </CardFooter>
          </Card>
        </section>
      </div>
       <div className="mt-12 p-8 bg-secondary/10 rounded-lg text-center">
            <h3 className="text-2xl font-semibold text-primary mb-3">هل تحتاجين مساعدة أو ترغبين بمعرفة المزيد؟</h3>
            <p className="text-foreground/70 mb-6 max-w-md mx-auto">
                استكشفي أدلة البائعات، انضمي إلى مناقشات المجتمع، أو تواصلي مع الدعم للحصول على المساعدة.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button variant="outline">أدلة البائعات</Button>
                <Button variant="outline">منتدى المجتمع</Button>
                <Button variant="outline">التواصل مع الدعم</Button>
            </div>
        </div>
    </div>
  );
}
