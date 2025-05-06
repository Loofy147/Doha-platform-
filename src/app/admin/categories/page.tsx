
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LayoutGrid, PlusCircle, Trash2 } from "lucide-react";

// Mock categories for display
const mockCategories = [
  { id: 'cat1', name: 'أزياء وإكسسوارات', productCount: 120 }, // Fashion & Accessories
  { id: 'cat2', name: 'مستلزمات منزلية وديكور', productCount: 85 }, // Home Goods & Decor
  { id: 'cat3', name: 'جمال وعناية شخصية', productCount: 60 }, // Beauty & Wellness
  { id: 'cat4', name: 'حلويات ومأكولات شهية', productCount: 45 }, // Sweets & Treats (حلويات) - More descriptive
  { id: 'cat5', name: 'منتجات للإيجار', productCount: 30 }, // Rental Items
  { id: 'cat6', name: 'خدمات احترافية', productCount: 20 }, // Services - More professional sounding
];

export default function AdminCategoriesPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
            <LayoutGrid className="inline-block mr-2 h-7 w-7" /> إدارة الفئات
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>الفئات الحالية</CardTitle>
            </CardHeader>
            <CardContent>
              {mockCategories.length > 0 ? (
                <ul className="space-y-3">
                  {mockCategories.map(category => (
                    <li key={category.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted">
                      <div>
                        <span className="font-medium text-foreground">{category.name}</span>
                        <p className="text-xs text-muted-foreground">{category.productCount} منتجات/خدمات</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">تعديل</Button>
                        <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4"/></Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">لم يتم العثور على فئات. أضف فئات جديدة باستخدام النموذج.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PlusCircle className="mr-2 h-5 w-5 text-accent-pink" /> إضافة فئة جديدة
              </CardTitle>
            </CardHeader>
            <form onSubmit={(e) => e.preventDefault()}>
                <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="categoryName">اسم الفئة</Label>
                    <Input id="categoryName" placeholder="مثال: مشغولات يدوية فنية" />
                </div>
                <div>
                    <Label htmlFor="categorySlug">المعرف (صديق لمحركات البحث)</Label>
                    <Input id="categorySlug" placeholder="مثال: مشغولات-يدوية-فنية" />
                </div>
                <div>
                    <Label htmlFor="categoryDescription">الوصف (اختياري)</Label>
                    <Input id="categoryDescription" placeholder="وصف موجز للفئة" />
                </div>
                </CardContent>
                <CardFooter>
                <Button type="submit" className="w-full">إضافة الفئة</Button>
                </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
