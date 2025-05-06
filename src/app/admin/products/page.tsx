
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, PlusCircle } from "lucide-react";
import Link from "next/link";

export default function AdminProductsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
            <Package className="inline-block mr-2 h-7 w-7" /> Products & Services Management
        </h2>
        <Button asChild>
            <Link href="/admin/products/new">
                <PlusCircle className="mr-2 h-4 w-4" /> Add New
            </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Products & Services</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This section will display a table of all products and services listed on WomenCommerce.
            Admins will be able to view, edit, approve, or remove listings, manage categories, and oversee inventory for platform-managed items (if any).
            Functionality coming soon.
          </p>
           {/* Placeholder for products table */}
          <div className="mt-6 h-64 w-full border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Products/Services Table - Coming Soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
