
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LayoutGrid, PlusCircle, Trash2 } from "lucide-react";

// Mock categories for display
const mockCategories = [
  { id: 'cat1', name: 'Fashion & Accessories', productCount: 120 },
  { id: 'cat2', name: 'Home Goods & Decor', productCount: 85 },
  { id: 'cat3', name: 'Beauty & Wellness', productCount: 60 },
  { id: 'cat4', name: 'Sweets & Treats (حلويات)', productCount: 45 },
  { id: 'cat5', name: 'Rental Items', productCount: 30 },
  { id: 'cat6', name: 'Services', productCount: 20 },
];

export default function AdminCategoriesPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
            <LayoutGrid className="inline-block mr-2 h-7 w-7" /> Category Management
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Existing Categories</CardTitle>
            </CardHeader>
            <CardContent>
              {mockCategories.length > 0 ? (
                <ul className="space-y-3">
                  {mockCategories.map(category => (
                    <li key={category.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-md hover:bg-muted">
                      <div>
                        <span className="font-medium text-foreground">{category.name}</span>
                        <p className="text-xs text-muted-foreground">{category.productCount} products/services</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4"/></Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No categories found. Add new categories using the form.</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PlusCircle className="mr-2 h-5 w-5 text-accent-pink" /> Add New Category
              </CardTitle>
            </CardHeader>
            <form onSubmit={(e) => e.preventDefault()}>
                <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="categoryName">Category Name</Label>
                    <Input id="categoryName" placeholder="e.g., Handmade Crafts" />
                </div>
                <div>
                    <Label htmlFor="categorySlug">Slug (URL-friendly)</Label>
                    <Input id="categorySlug" placeholder="e.g., handmade-crafts" />
                </div>
                <div>
                    <Label htmlFor="categoryDescription">Description (Optional)</Label>
                    <Input id="categoryDescription" placeholder="Brief description of the category" />
                </div>
                </CardContent>
                <CardFooter>
                <Button type="submit" className="w-full">Add Category</Button>
                </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
