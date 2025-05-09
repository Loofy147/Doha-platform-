// src/app/admin/sellers/approvals/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminSellerApprovalsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
            <UserCheck className="inline-block mr-2 h-7 w-7" /> الموافقة على طلبات المبدعات
        </h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>طلبات الانضمام المعلقة</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            ستعرض هذه الصفحة قائمة بطلبات تسجيل المبدعات الجديدة التي تنتظر الموافقة.
            يمكنك مراجعة تفاصيل كل طلب، الوثائق المرفقة (إن وجدت)، والموافقة على أو رفض الطلب مع تقديم ملاحظات.
            الوظائف قيد التطوير وقريباً.
          </p>
          {/* Placeholder for seller approval list */}
          <div className="mt-6 h-64 w-full border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">قائمة طلبات المبدعات - قيد التطوير</p>
          </div>
          <div className="mt-4 flex gap-4">
            <Button variant="default">الموافقة على المحدد (محاكاة)</Button>
            <Button variant="destructive">رفض المحدد (محاكاة)</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
