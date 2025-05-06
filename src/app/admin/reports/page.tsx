import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminReportsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
            <BarChart3 className="inline-block mr-2 h-7 w-7" /> التقارير والتحليلات
        </h2>
        <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> إنشاء تقرير
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>تقارير المنصة</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            سيقدم هذا القسم تقارير شاملة حول جوانب مختلفة من منصة لمسة ضحى.
            سيتمكن المسؤولون من إنشاء تقارير حول المبيعات، الإيرادات، التركيبة السكانية للعملاء، أداء البائعين، المنتجات الرائجة، والمزيد.
            ستتوفر خيارات تصفية متقدمة وتصدير.
            الوظائف قيد التطوير وقريباً.
          </p>
           {/* Placeholder for reports dashboard */}
          <div className="mt-6 h-64 w-full border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">لوحة تحكم التقارير - قيد التطوير</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
