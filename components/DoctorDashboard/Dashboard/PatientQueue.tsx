import { Clock, ArrowRight, Eye } from "lucide-react";

const QUEUE = [
  {
    id: "1",
    name: "Robert Fox",
    reason: "Chest Pain (Mild)",
    waitTime: "15 mins",
    status: "Urgent" as const,
    avatar: "RF",
  },
  {
    id: "2",
    name: "Jane Cooper",
    reason: "Prescription Refill",
    waitTime: "5 mins",
    status: "Normal" as const,
    avatar: "JC",
  },
];

export default function PatientQueue() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#0284C7]" />
          <h3 className="text-sm font-bold text-[#101828]">Patient Queue</h3>
        </div>
        <button className="flex items-center gap-1 text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer">
          View Full List <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <p className="text-[11px] text-[#6A7282] mb-3">Real-time waiting list</p>

      {/* Table header */}
      <div className="grid grid-cols-5 gap-3 text-[11px] font-semibold text-[#6A7282] pb-2 border-b border-gray-100">
        <span className="col-span-1">Patient</span>
        <span className="col-span-2">Reason</span>
        <span>Wait Time</span>
        <span>Status</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-50">
        {QUEUE.map((p) => (
          <div key={p.id} className="grid grid-cols-5 gap-3 items-center py-3">
            <div className="flex items-center gap-2 col-span-1">
              <div className="w-7 h-7 rounded-full bg-[#E5E7EB] flex items-center justify-center shrink-0">
                <span className="text-[9px] font-bold text-[#4A5565]">{p.avatar}</span>
              </div>
              <span className="text-xs font-semibold text-[#101828]">{p.name}</span>
            </div>
            <span className="text-xs text-[#4A5565] col-span-2">{p.reason}</span>
            <span className="text-xs text-[#4A5565]">{p.waitTime}</span>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                  p.status === "Urgent"
                    ? "bg-[#FEF2F2] text-[#EF4444]"
                    : "bg-[#F0FDF4] text-[#16A34A]"
                }`}
              >
                {p.status}
              </span>
              <button className="text-[#0284C7] hover:text-[#0369A1] cursor-pointer">
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
