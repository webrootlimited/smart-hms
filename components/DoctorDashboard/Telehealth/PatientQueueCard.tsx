import Link from "next/link";
import { Video, FileText, ClipboardCheck, Clock } from "lucide-react";
import { WaitingPatient } from "./types";

const STATUS_STYLES: Record<string, { color: string; bg: string; dot: string }> = {
  Ready: { color: "text-[#16A34A]", bg: "bg-[#F0FDF4]", dot: "bg-[#16A34A]" },
  "Joining Soon": { color: "text-[#D97706]", bg: "bg-[#FFFBEB]", dot: "bg-[#D97706]" },
  Waiting: { color: "text-[#0284C7]", bg: "bg-[#F0F9FF]", dot: "bg-[#0284C7]" },
  "In Call": { color: "text-[#7C3AED]", bg: "bg-[#FAF5FF]", dot: "bg-[#7C3AED]" },
  Disconnected: { color: "text-[#EF4444]", bg: "bg-[#FEF2F2]", dot: "bg-[#EF4444]" },
};

export default function PatientQueueCard({ patient, doctorSlug }: { patient: WaitingPatient; doctorSlug: string }) {
  const style = STATUS_STYLES[patient.status];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center justify-between">
      {/* Patient info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#E5E7EB] flex items-center justify-center shrink-0">
          <span className="text-xs font-bold text-[#4A5565]">{patient.avatar}</span>
        </div>
        <div>
          <p className="text-sm font-bold text-[#101828]">{patient.name}</p>
          <p className="text-[11px] text-[#6A7282]">{patient.type}</p>
        </div>
      </div>

      {/* Waiting time */}
      <div className="text-center">
        <p className="text-[10px] text-[#6A7282]">Waiting Time</p>
        <p className={`text-sm font-bold ${patient.waitingMins >= 10 ? "text-[#EF4444]" : "text-[#D97706]"}`}>
          {patient.waitingTime}
        </p>
      </div>

      {/* Status */}
      <div className="text-center">
        <p className="text-[10px] text-[#6A7282]">Status</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
          <span className={`text-xs font-semibold ${style.color}`}>{patient.status}</span>
        </div>
      </div>

      {/* Docs & Form icons */}
      <div className="flex items-center gap-3">
        <button
          title="Documents"
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition cursor-pointer ${
            patient.hasDocs ? "bg-[#F0F9FF] text-[#0284C7]" : "bg-gray-100 text-[#D1D5DB]"
          }`}
        >
          <FileText className="w-4 h-4" />
        </button>
        <button
          title="Pre-Visit Form"
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition cursor-pointer ${
            patient.hasForm ? "bg-[#F0F9FF] text-[#0284C7]" : "bg-gray-100 text-[#D1D5DB]"
          }`}
        >
          <ClipboardCheck className="w-4 h-4" />
        </button>
      </div>

      {/* Start Call */}
      <Link
        href={`/doctor/${doctorSlug}/telehealth/${patient.id}`}
        className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition"
      >
        <Video className="w-4 h-4" /> Start Call
      </Link>
    </div>
  );
}
