import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Settings, Save } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
            <Settings className="inline-block mr-2 h-7 w-7" /> إعدادات منصة لمسة ضحى
        </h2>
      </div>
      
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>الإعدادات العامة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="platformName">اسم المنصة</Label>
                <Input id="platformName" defaultValue="لمسة ضحى" />
              </div>
              <div>
                <Label htmlFor="platformDescription">شعار/وصف المنصة</Label>
                <Textarea id="platformDescription" defaultValue="إبداع يلامس حياتك" rows={2}/>
              </div>
              <div>
                <Label htmlFor="adminEmail">البريد الإلكتروني لجهة الاتصال الإدارية</Label>
                <Input id="adminEmail" type="email" defaultValue="admin@lamsadoha.com" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>العمولة والرسوم</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="defaultCommission">نسبة العمولة الافتراضية (%)</Label>
                <Input id="defaultCommission" type="number" defaultValue="10" />
              </div>
               <div className="flex items-center space-x-2">
                <Switch id="enableSubscriptionDiscounts" />
                <Label htmlFor="enableSubscriptionDiscounts" className="text-sm">تفعيل خصومات العمولة للمبدعات المشتركات</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>إدارة الميزات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="enableLiveShopping" className="text-sm">تفعيل ميزة التسوق المباشر</Label>
                <Switch id="enableLiveShopping" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="enableAISuggestions" className="text-sm">تفعيل اقتراحات وصف المنتج بالذكاء الاصطناعي</Label>
                <Switch id="enableAISuggestions" defaultChecked />
              </div>
               <div className="flex items-center justify-between">
                <Label htmlFor="maintenanceMode" className="text-sm">تفعيل وضع الصيانة</Label>
                <Switch id="maintenanceMode" />
              </div>
            </CardContent>
          </Card>
          
          <CardFooter className="border-t pt-6 flex justify-end">
            <Button type="submit">
                <Save className="mr-2 h-4 w-4" /> حفظ الإعدادات
            </Button>
          </CardFooter>
        </div>
      </form>
    </div>
  );
}
