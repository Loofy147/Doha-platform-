
import { Settings } from "lucide-react";
import { SettingsForm } from "./settings-form"; // Import the client component

// This remains a Server Component
export default function AdminSettingsPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
            <Settings className="inline-block mr-2 h-7 w-7" /> إعدادات منصة لمسة ضحى
        </h2>
      </div>
      
      {/* Use the client component for the form */}
      <SettingsForm />
    </div>
  );
}

