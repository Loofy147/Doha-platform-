// src/app/admin/users/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users2 } from "lucide-react";

export default function AdminUsersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
            <Users2 className="inline-block mr-2 h-7 w-7" /> إدارة المستخدمين (عملاء ومبدعات)
        </h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>جميع المستخدمين</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            هنا ستتمكن من إدارة جميع حسابات المستخدمين على منصة لمسة ضحى، بما في ذلك العملاء والمبدعات.
            ستتوفر أدوات للبحث، التصفية، عرض التفاصيل، تعديل الأدوار، وحظر الحسابات إذا لزم الأمر.
            الوظائف قيد التطوير وقريباً.
          </p>
          {/* Placeholder for users table/management tools */}
          <div className="mt-6 h-64 w-full border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">أدوات إدارة المستخدمين - قيد التطوير</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
