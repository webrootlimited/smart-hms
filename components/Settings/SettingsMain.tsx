import { RotateCcw, Save } from "lucide-react";
import SettingsHeader from "./SettingsHeader";
import GeneralSettings from "./GeneralSettings";
import SecuritySettings from "./SecuritySettings";
import BackupRecovery from "./BackupRecovery";
import NotificationPreferences from "./NotificationPreferences";

export default function SettingsMain() {
  return (
    <div className="space-y-5">
      <SettingsHeader />
      <GeneralSettings />

      {/* Security + Backup side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SecuritySettings />
        <BackupRecovery />
      </div>

      <NotificationPreferences />

      {/* Footer actions */}
      <div className="flex items-center justify-end gap-3">
        <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer">
          <RotateCcw className="w-4 h-4" /> Reset to Defaults
        </button>
        <button className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-[#16A34A] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
          <Save className="w-4 h-4" /> Save All Changes
        </button>
      </div>
    </div>
  );
}
