
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
            <PackagePlus className="inline-block mr-2 h-7 w-7" /> Add New Product/Service
        </h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>New Product/Service Details</CardTitle>
        </CardHeader>
        <form onSubmit={(e) => e.preventDefault()}> {/* Placeholder form */}
            <CardContent className="space-y-6">
            <div>
                <Label htmlFor="productName">Product/Service Name</Label>
                <Input id="productName" placeholder="e.g., Handmade Ceramic Vase" />
            </div>
            <div>
                <Label htmlFor="productDescription">Description</Label>
                <Textarea id="productDescription" placeholder="Detailed description..." rows={4} />
            </div>
            <div>
                <Label htmlFor="productPrice">Price (DA)</Label>
                <Input id="productPrice" type="number" placeholder="e.g., 2500" />
            </div>
             <div>
                <Label htmlFor="productCategory">Category</Label>
                {/* Replace with Select component when available */}
                <Input id="productCategory" placeholder="e.g., Home Decor" />
            </div>
             <div>
                <Label htmlFor="productImages">Images</Label>
                <Input id="productImages" type="file" multiple />
                <p className="text-xs text-muted-foreground mt-1">Upload one or more images for the product.</p>
            </div>

            {/* Add more fields as needed: SKU, stock, rental terms, service duration etc. */}

            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-end gap-2">
                <Button variant="outline" asChild>
                    <Link href="/admin/products">Cancel</Link>
                </Button>
                <Button type="submit">Save Product</Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
