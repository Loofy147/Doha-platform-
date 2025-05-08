'use client';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter

export function NewProductForm() {
    const { toast } = useToast();
    const router = useRouter(); // Get router instance

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const productName = formData.get('productName');
        // Add more form data extraction and submission logic here
        console.log("Saving new product (simulated):", productName);
        toast({
            title: "تم حفظ المنتج (محاكاة)",
            description: `تمت إضافة المنتج "${productName}" بنجاح.`,
            variant: "default",
        });
        // Redirect back to products list after successful submission
        router.push('/admin/products');
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>تفاصيل المنتج/الخدمة الجديدة</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    <div>
                        <Label htmlFor="productName">اسم المنتج/الخدمة</Label>
                        <Input id="productName" name="productName" placeholder="مثال: مزهرية سيراميك مصنوعة يدوياً" required />
                    </div>
                    <div>
                        <Label htmlFor="productDescription">الوصف</Label>
                        <Textarea id="productDescription" name="productDescription" placeholder="وصف تفصيلي للمنتج/الخدمة..." rows={4} />
                    </div>
                    <div>
                        <Label htmlFor="productPrice">السعر (دج)</Label>
                        <Input id="productPrice" name="productPrice" type="number" placeholder="مثال: 2500" />
                    </div>
                    <div>
                        <Label htmlFor="productCategory">الفئة</Label>
                        {/* Replace with Select component when available */}
                        <Input id="productCategory" name="productCategory" placeholder="مثال: ديكور منزلي" />
                    </div>
                    <div>
                        <Label htmlFor="productImages">صور المنتج/الخدمة</Label>
                        <Input id="productImages" name="productImages" type="file" multiple />
                        <p className="text-xs text-muted-foreground mt-1">قم بتحميل صورة واحدة أو أكثر للمنتج.</p>
                    </div>

                    {/* Add more fields as needed: SKU, stock, rental terms, service duration etc. */}

                </CardContent>
                <CardFooter className="border-t pt-6 flex justify-end gap-2">
                    <Button variant="outline" asChild type="button"> {/* Add type="button" to prevent form submission */}
                        <Link href="/admin/products">إلغاء</Link>
                    </Button>
                    <Button type="submit">حفظ المنتج</Button>
                </CardFooter>
            </form>
        </Card>
    );
}
