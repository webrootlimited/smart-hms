import { ActivityLog } from "./types";
import {
  LogIn,
  UserCog,
  Server,
  UserRound,
  CalendarDays,
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
} from "lucide-react";

const CATEGORY_CONFIG: Record<string, { icon: typeof LogIn; color: string; bg: string }> = {
  login: { icon: LogIn, color: "text-[#0284C7]", bg: "bg-[#F0F9FF]" },
  admin: { icon: UserCog, color: "text-[#7C3AED]", bg: "bg-[#FAF5FF]" },
  system: { icon: Server, color: "text-[#EA580C]", bg: "bg-[#FFF7ED]" },
  patient: { icon: UserRound, color: "text-[#0891B2]", bg: "bg-[#ECFEFF]" },
  appointment: { icon: CalendarDays, color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" },
};

const SEVERITY_CONFIG: Record<string, { icon: typeof Info; color: string; bg: string; label: string }> = {
  info: { icon: Info, color: "text-[#0284C7]", bg: "bg-[#F0F9FF]", label: "Info" },
  success: { icon: CheckCircle2, color: "text-[#16A34A]", bg: "bg-[#F0FDF4]", label: "Success" },
  warning: { icon: AlertTriangle, color: "text-[#D97706]", bg: "bg-[#FFFBEB]", label: "Warning" },
  error: { icon: AlertCircle, color: "text-[#DC2626]", bg: "bg-[#FEF2F2]", label: "Error" },
};

export default function ActivityTimeline({ logs }: { logs: ActivityLog[] }) {
  return (
    <div className="space-y-3">
      {logs.map((log) => {
        const cat = CATEGORY_CONFIG[log.category];
        const sev = SEVERITY_CONFIG[log.severity];
        const CatIcon = cat.icon;
        const SevIcon = sev.icon;

        return (
          <div
            key={log.id}
            className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-start gap-4"
          >
            {/* Category icon */}
            <div className={`w-10 h-10 rounded-xl ${cat.bg} flex items-center justify-center shrink-0`}>
              <CatIcon className={`w-5 h-5 ${cat.color}`} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-bold text-[#101828]">{log.action}</p>
                <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${sev.bg} ${sev.color}`}>
                  <SevIcon className="w-3 h-3" />
                  {sev.label}
                </span>
              </div>
              <p className="text-xs text-[#6A7282] mt-0.5">{log.description}</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#E5E7EB] flex items-center justify-center">
                    <span className="text-[8px] font-bold text-[#4A5565]">{log.avatar}</span>
                  </div>
                  <span className="text-[11px] font-medium text-[#334155]">{log.user}</span>
                  <span className="text-[10px] text-[#6A7282]">• {log.role}</span>
                </div>
              </div>
            </div>

            {/* Timestamp */}
            <span className="text-[11px] text-[#6A7282] whitespace-nowrap shrink-0">{log.timestamp}</span>
          </div>
        );
      })}
    </div>
  );
}
