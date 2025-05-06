
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function AdminProductsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
            <Package className="inline-block mr-2 h-7 w-7" /> إدارة المنتجات والخدمات
        </h2>
        <Button asChild>
            <Link href="/admin/products/new">
                <PlusCircle className="mr-2 h-4 w-4" /> إضافة جديد
            </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>جميع المنتجات والخدمات</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            سيعرض هذا القسم جدولاً بجميع المنتجات والخدمات المعروضة على منصة نساء كوميرس.
            سيتمكن المسؤولون من عرض، تعديل، الموافقة على، أو إزالة القوائم، إدارة الفئات، والإشراف على المخزون للعناصر التي تديرها المنصة (إن وجدت).
            الوظائف قيد التطوير وقريباً.
          </p>
           {/* Placeholder for products table */}
          <div className="mt-6 h-64 w-full border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">جدول المنتجات/الخدمات - قيد التطوير</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
