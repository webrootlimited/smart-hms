import { Settings } from "lucide-react";

const inputCls =
  "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]";
const labelCls = "block text-xs font-semibold text-[#334155] mb-1";

export default function GeneralSettings() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#F0FDF4] flex items-center justify-center">
          <Settings className="w-4 h-4 text-[#16A34A]" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[#101828]">General Settings</h2>
          <p className="text-xs text-[#6A7282]">Basic system configuration</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Organization Name</label>
          <input type="text" defaultValue="Memorial Healthcare Center" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Time Zone</label>
          <input type="text" defaultValue="GMT+0 (London)" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Primary Contact Email</label>
          <input type="email" defaultValue="admin@memorialhealthcare.com" className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Website URL</label>
          <input type="url" defaultValue="https://memorialhealthcare.com" className={inputCls} />
        </div>
      </div>
    </div>
  );
}
