
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Trash2 } from "lucide-react";
import { CategoryForm } from "./category-form"; // Import the new client component

// Mock categories for display
const mockCategories = [
  { id: 'cat1', name: 'أزياء وإكسسوارات', productCount: 120 }, // Fashion & Accessories
  { id: 'cat2', name: 'مستلزمات منزلية وديكور', productCount: 85 }, // Home Goods & Decor
  { id: 'cat3', name: 'جمال وعناية شخصية', productCount: 60 }, // Beauty & Wellness
  { id: 'cat4', name: 'حلويات ومأكولات شهية', productCount: 45 }, // Sweets & Treats (حلويات) - More descriptive
  { id: 'cat5', name: 'منتجات للإيجار', productCount: 30 }, // Rental Items
  { id: 'cat6', name: 'خدمات احترافية', productCount: 20 }, // Services - More professional sounding
];

// This remains a Server Component
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
                        {/* Add client components or server actions for these later */}
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
          {/* Use the client component for the form */}
          <CategoryForm />
        </div>
      </div>
    </div>
  );
}
