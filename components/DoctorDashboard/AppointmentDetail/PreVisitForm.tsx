import { FileCheck, CheckCircle2, Circle, Eye } from "lucide-react";
import { AppointmentDetail } from "./types";

export default function PreVisitForm({ appointment }: { appointment: AppointmentDetail }) {
  const { preVisitForm } = appointment;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-sm font-bold text-[#101828] mb-3">Pre-Visit Form</h3>

      <div className="flex items-center gap-2 mb-4">
        <FileCheck className="w-4 h-4 text-[#16A34A]" />
        <span className="text-xs font-medium text-[#16A34A]">Filed on {preVisitForm.filedOn}</span>
      </div>

      <div className="space-y-2.5">
        {preVisitForm.items.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            {item.checked ? (
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-[#D1D5DB] shrink-0" />
            )}
            <span className={`text-xs ${item.checked ? "text-[#101828]" : "text-[#9CA3AF]"}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <button className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer">
        <Eye className="w-3.5 h-3.5" /> View Pre-Visit Form
      </button>
    </div>
  );
}
