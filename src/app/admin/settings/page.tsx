
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
            <Settings className="inline-block mr-2 h-7 w-7" /> Platform Settings
        </h2>
      </div>
      
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="platformName">Platform Name</Label>
                <Input id="platformName" defaultValue="WomenCommerce" />
              </div>
              <div>
                <Label htmlFor="platformDescription">Platform Tagline/Description</Label>
                <Textarea id="platformDescription" defaultValue="Empowering Women Economically" rows={2}/>
              </div>
              <div>
                <Label htmlFor="adminEmail">Admin Contact Email</Label>
                <Input id="adminEmail" type="email" defaultValue="admin@womencommerce.com" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Commission & Fees</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="defaultCommission">Default Commission Rate (%)</Label>
                <Input id="defaultCommission" type="number" defaultValue="10" />
              </div>
               <div className="flex items-center space-x-2">
                <Switch id="enableSubscriptionDiscounts" />
                <Label htmlFor="enableSubscriptionDiscounts">Enable Commission Discounts for Subscribed Sellers</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Flags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="enableLiveShopping">Enable Live Shopping Feature</Label>
                <Switch id="enableLiveShopping" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="enableAISuggestions">Enable AI Product Description Suggestions</Label>
                <Switch id="enableAISuggestions" defaultChecked />
              </div>
               <div className="flex items-center justify-between">
                <Label htmlFor="maintenanceMode">Enable Maintenance Mode</Label>
                <Switch id="maintenanceMode" />
              </div>
            </CardContent>
          </Card>
          
          <CardFooter className="border-t pt-6 flex justify-end">
            <Button type="submit">
                <Save className="mr-2 h-4 w-4" /> Save Settings
            </Button>
          </CardFooter>
        </div>
      </form>
    </div>
  );
}
