import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  FileText,
  Save,
  UserPlus,
  X,
} from "lucide-react";

const CHECKLIST = [
  { label: "Personal Info", status: "pending" },
  { label: "Work Setup", status: "pending" },
  { label: "Schedule", status: "pending" },
  { label: "Credentials", status: "pending" },
  { label: "Documents", status: "pending" },
];

const REQUIRED_DOCS = [
  "Medical license (current)",
  "Board certification",
  "DEA certificate (if applicable)",
  "Malpractice insurance",
  "Diploma/degree certificate",
];

export default function RegistrationSummary() {
  return (
    <>
      {/* Registration Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#101828] mb-3">
          Registration Summary
        </h3>
        <div className="space-y-2.5">
          {CHECKLIST.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              {item.status === "complete" ? (
                <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
              ) : (
                <Circle className="w-4 h-4 text-gray-300" />
              )}
              <span className="text-sm text-[#4A5565]">{item.label}</span>
              <span
                className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full ${
                  item.status === "complete"
                    ? "bg-[#F0FDF4] text-[#16A34A]"
                    : "bg-[#FFF7ED] text-[#EA580C]"
                }`}
              >
                {item.status === "complete" ? "Done" : "Pending"}
              </span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-5 space-y-2">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold border border-[#0284C7] text-[#0284C7] rounded-xl hover:bg-[#EFF6FF] transition cursor-pointer">
            <Save className="w-4 h-4" /> Save as Draft
          </button>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
            <UserPlus className="w-4 h-4" /> Register Provider
          </button>
          <Link
            href="/admin/providers"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#6A7282] hover:text-[#101828] transition"
          >
            <X className="w-4 h-4" /> Cancel
          </Link>
        </div>
      </div>

      {/* Required Documents */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-[#0284C7]" />
          <h3 className="text-sm font-bold text-[#101828]">
            Required Documents
          </h3>
        </div>
        <ul className="space-y-2">
          {REQUIRED_DOCS.map((doc) => (
            <li
              key={doc}
              className="flex items-start gap-2 text-xs text-[#6A7282]"
            >
              <span className="w-1 h-1 rounded-full bg-[#6A7282] mt-1.5 shrink-0" />
              {doc}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
