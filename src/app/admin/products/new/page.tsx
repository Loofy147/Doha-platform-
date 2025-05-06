
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PackagePlus } from "lucide-react";
import Link from "next/link";

export default function AdminAddNewProductPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
            <PackagePlus className="inline-block mr-2 h-7 w-7" /> إضافة منتج/خدمة جديدة
        </h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>تفاصيل المنتج/الخدمة الجديدة</CardTitle>
        </CardHeader>
        <form onSubmit={(e) => e.preventDefault()}> {/* Placeholder form */}
            <CardContent className="space-y-6">
            <div>
                <Label htmlFor="productName">اسم المنتج/الخدمة</Label>
                <Input id="productName" placeholder="مثال: مزهرية سيراميك مصنوعة يدوياً" />
            </div>
            <div>
                <Label htmlFor="productDescription">الوصف</Label>
                <Textarea id="productDescription" placeholder="وصف تفصيلي للمنتج/الخدمة..." rows={4} />
            </div>
            <div>
                <Label htmlFor="productPrice">السعر (دج)</Label>
                <Input id="productPrice" type="number" placeholder="مثال: 2500" />
            </div>
             <div>
                <Label htmlFor="productCategory">الفئة</Label>
                {/* Replace with Select component when available */}
                <Input id="productCategory" placeholder="مثال: ديكور منزلي" />
            </div>
             <div>
                <Label htmlFor="productImages">صور المنتج/الخدمة</Label>
                <Input id="productImages" type="file" multiple />
                <p className="text-xs text-muted-foreground mt-1">قم بتحميل صورة واحدة أو أكثر للمنتج.</p>
            </div>

            {/* Add more fields as needed: SKU, stock, rental terms, service duration etc. */}

            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-end gap-2">
                <Button variant="outline" asChild>
                    <Link href="/admin/products">إلغاء</Link>
                </Button>
                <Button type="submit">حفظ المنتج</Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
