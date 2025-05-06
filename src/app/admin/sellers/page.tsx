
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store } from "lucide-react"; // Using Store icon for sellers

export default function AdminSellersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
            <Store className="inline-block mr-2 h-7 w-7" /> Seller Management
        </h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Sellers</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This section will display a table of all registered sellers on WomenCommerce.
            Admins will be able to view seller profiles, manage store details, approve/reject applications, monitor performance, and manage payouts.
            Functionality coming soon.
          </p>
          {/* Placeholder for sellers table */}
          <div className="mt-6 h-64 w-full border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Sellers Table - Coming Soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
