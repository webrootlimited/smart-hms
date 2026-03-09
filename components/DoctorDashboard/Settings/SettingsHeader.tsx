import { Search, Bell, Settings } from "lucide-react";

export default function SettingsHeader() {
  return (
    <div className="flex items-center justify-between">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
        <input
          type="text"
          placeholder="Search patients, appointments, documents..."
          className="pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white w-72 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
        />
      </div>

      <div className="flex items-center gap-3">
        <button className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition relative">
          <Bell className="w-4 h-4 text-[#64748B]" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-semibold">2</span>
        </button>
        <button className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition">
          <Settings className="w-4 h-4 text-[#64748B]" />
        </button>
        <div className="flex items-center gap-2 ml-2">
          <div className="text-right">
            <p className="text-sm font-semibold text-[#101828]">Dr. Sarah Johnson</p>
            <p className="text-xs text-[#6A7282]">Cardiologist</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#0284C7] flex items-center justify-center text-white text-sm font-bold">
            SJ
          </div>
        </div>
      </div>
    </div>
  );
}
