
import { PackagePlus } from "lucide-react";
import { NewProductForm } from "./new-product-form"; // Import the client component

// This remains a Server Component
export default function AdminAddNewProductPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
            <PackagePlus className="inline-block mr-2 h-7 w-7" /> إضافة منتج/خدمة جديدة
        </h2>
      </div>
      {/* Use the client component for the form */}
      <NewProductForm />
    </div>
  );
}
