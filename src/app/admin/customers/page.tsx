
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users2 } from "lucide-react";

export default function AdminCustomersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
            <Users2 className="inline-block mr-2 h-7 w-7" /> إدارة العملاء
        </h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>جميع العملاء</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            سيعرض هذا القسم جدولاً بجميع العملاء المسجلين في منصة نساء كوميرس.
            سيتمكن المسؤولون من عرض تفاصيل العملاء، سجل الطلبات، إدارة الحسابات (مثل التحقق، التعليق)، والتواصل مع العملاء.
            الوظائف قيد التطوير وقريباً.
          </p>
          {/* Placeholder for customers table */}
          <div className="mt-6 h-64 w-full border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">جدول العملاء - قيد التطوير</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
