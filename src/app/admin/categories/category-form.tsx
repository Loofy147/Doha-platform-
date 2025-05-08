'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // Import useToast

export function CategoryForm() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form submission logic here
    const formData = new FormData(e.currentTarget);
    const categoryName = formData.get('categoryName');
    const categorySlug = formData.get('categorySlug');
    console.log("Adding category (simulated):", { categoryName, categorySlug });
    toast({
      title: "تم إضافة الفئة (محاكاة)",
      description: `تمت إضافة الفئة "${categoryName}" بنجاح.`,
      variant: "default",
    });
    // Optionally reset the form e.g., e.currentTarget.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <PlusCircle className="mr-2 h-5 w-5 text-accent-pink" /> إضافة فئة جديدة
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="categoryName">اسم الفئة</Label>
            <Input id="categoryName" name="categoryName" placeholder="مثال: مشغولات يدوية فنية" required />
          </div>
          <div>
            <Label htmlFor="categorySlug">المعرف (صديق لمحركات البحث)</Label>
            <Input id="categorySlug" name="categorySlug" placeholder="مثال: مشغولات-يدوية-فنية" />
          </div>
          <div>
            <Label htmlFor="categoryDescription">الوصف (اختياري)</Label>
            <Input id="categoryDescription" name="categoryDescription" placeholder="وصف موجز للفئة" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">إضافة الفئة</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
