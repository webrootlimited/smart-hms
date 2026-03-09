import { Video, RefreshCw, Settings } from "lucide-react";

export default function TelehealthHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#F0F9FF] flex items-center justify-center">
          <Video className="w-8 h-8 text-[#0284C7]" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#101828]">Telehealth Waiting Room</h1>
          <p className="text-sm text-[#6A7282]">Manage the virtual consultation queue and connect with patients.</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer">
          <RefreshCw className="w-4 h-4 text-[#6A7282]" />
          Refresh Queue
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
          <Video className="w-4 h-4" />
          Start General Session
        </button>
        <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition cursor-pointer">
          <Settings className="w-4 h-4 text-[#6A7282]" />
        </button>
      </div>
    </div>
  );
}
