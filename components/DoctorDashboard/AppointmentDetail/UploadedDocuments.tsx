import { FileText, FileImage, Eye, Download } from "lucide-react";
import { AppointmentDetail } from "./types";

const FILE_ICONS: Record<string, { icon: typeof FileText; color: string; bg: string }> = {
  pdf: { icon: FileText, color: "text-[#EF4444]", bg: "bg-[#FEF2F2]" },
  dcm: { icon: FileImage, color: "text-[#0284C7]", bg: "bg-[#F0F9FF]" },
  img: { icon: FileImage, color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" },
};

export default function UploadedDocuments({ appointment }: { appointment: AppointmentDetail }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-sm font-bold text-[#101828] mb-4">Uploaded Documents</h3>

      <div className="space-y-3">
        {appointment.documents.map((doc) => {
          const config = FILE_ICONS[doc.type] || FILE_ICONS.pdf;
          const Icon = config.icon;
          return (
            <div key={doc.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#101828]">{doc.name}</p>
                  <p className="text-[10px] text-[#6A7282]">Uploaded on {doc.uploadedOn}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="w-7 h-7 rounded-lg hover:bg-gray-200 flex items-center justify-center transition cursor-pointer">
                  <Eye className="w-3.5 h-3.5 text-[#6A7282]" />
                </button>
                <button className="w-7 h-7 rounded-lg hover:bg-gray-200 flex items-center justify-center transition cursor-pointer">
                  <Download className="w-3.5 h-3.5 text-[#6A7282]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
