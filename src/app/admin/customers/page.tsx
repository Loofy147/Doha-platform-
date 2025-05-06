
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users2 } from "lucide-react";

export default function AdminCustomersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
            <Users2 className="inline-block mr-2 h-7 w-7" /> Customer Management
        </h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This section will display a table of all registered customers on WomenCommerce.
            Admins will be able to view customer details, order history, manage accounts (e.g., verify, suspend), and communicate with customers.
            Functionality coming soon.
          </p>
          {/* Placeholder for customers table */}
          <div className="mt-6 h-64 w-full border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Customers Table - Coming Soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
