import { Video, Eye } from "lucide-react";

export default function TelehealthSession() {
  return (
    <div className="bg-linear-to-br from-[#0284C7] to-[#0369A1] rounded-2xl p-5 text-white relative overflow-hidden">
      {/* Status badges */}
      <div className="flex items-center gap-2 mb-3">
        <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#16A34A] rounded-full">ONLINE</span>
        <span className="px-2 py-0.5 text-[10px] font-semibold bg-white/20 rounded-full">Queue: 3 Waiting</span>
      </div>

      <h2 className="text-lg font-bold mb-1">Telehealth Session</h2>
      <p className="text-sm text-white/80 mb-4">
        Your virtual waiting room is active. Next patient, John Doe, has been waiting for 4 minutes.
      </p>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#0284C7] text-sm font-semibold rounded-xl hover:bg-white/90 transition cursor-pointer">
          <Video className="w-4 h-4" />
          Start Telehealth Now
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white border border-white/30 rounded-xl hover:bg-white/10 transition cursor-pointer">
          <Eye className="w-4 h-4" />
          View Queue Details
        </button>
      </div>

      {/* Decorative element */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center">
        <Video className="w-10 h-10 text-white/30" />
      </div>
    </div>
  );
}
