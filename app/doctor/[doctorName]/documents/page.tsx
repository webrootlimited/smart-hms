"use client";

import { Search, Upload, FileText, FileImage, Download, Eye, Trash2 } from "lucide-react";

const DOCUMENTS = [
  { id: "1", name: "Lab_Report_CBC_Oct2025.pdf", patient: "James Wilson", type: "Lab Report", date: "2025-10-28", size: "2.4 MB", icon: "pdf" },
  { id: "2", name: "Chest_XRay_Series.dcm", patient: "James Wilson", type: "Imaging", date: "2025-10-25", size: "18.7 MB", icon: "dcm" },
  { id: "3", name: "ECG_Report_Nov2025.pdf", patient: "Robert Chen", type: "Cardiology", date: "2025-11-15", size: "1.8 MB", icon: "pdf" },
  { id: "4", name: "MRI_Brain_Scan.dcm", patient: "Emma Davis", type: "Imaging", date: "2025-11-22", size: "45.2 MB", icon: "dcm" },
  { id: "5", name: "Prescription_Rx_Dec.pdf", patient: "Maria Lopez", type: "Prescription", date: "2025-12-05", size: "0.3 MB", icon: "pdf" },
  { id: "6", name: "Blood_Panel_Results.pdf", patient: "David Kim", type: "Lab Report", date: "2025-12-01", size: "1.1 MB", icon: "pdf" },
];

const FILE_STYLES: Record<string, { color: string; bg: string }> = {
  pdf: { color: "text-[#EF4444]", bg: "bg-[#FEF2F2]" },
  dcm: { color: "text-[#0284C7]", bg: "bg-[#F0F9FF]" },
};

export default function DoctorDocumentsPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">Documents</h1>
          <p className="text-sm text-[#6A7282]">Manage patient files, reports, and medical records</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
          <Upload className="w-4 h-4" /> Upload Document
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Files", value: "1,284", color: "text-[#0284C7]", bg: "bg-[#F0F9FF]" },
          { label: "Lab Reports", value: "342", color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" },
          { label: "Imaging", value: "156", color: "text-[#7C3AED]", bg: "bg-[#FAF5FF]" },
          { label: "Prescriptions", value: "489", color: "text-[#EA580C]", bg: "bg-[#FFF7ED]" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-[#6A7282]">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input type="text" placeholder="Search documents..." className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {DOCUMENTS.map((doc) => {
            const style = FILE_STYLES[doc.icon] || FILE_STYLES.pdf;
            return (
              <div key={doc.id} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg ${style.bg} flex items-center justify-center shrink-0`}>
                    {doc.icon === "pdf" ? <FileText className={`w-4 h-4 ${style.color}`} /> : <FileImage className={`w-4 h-4 ${style.color}`} />}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#101828]">{doc.name}</p>
                    <p className="text-[10px] text-[#6A7282]">{doc.patient} • {doc.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[11px] text-[#6A7282]">{doc.date}</span>
                  <span className="text-[11px] text-[#6A7282] w-16 text-right">{doc.size}</span>
                  <div className="flex items-center gap-1">
                    <button className="w-7 h-7 rounded-lg hover:bg-gray-200 flex items-center justify-center cursor-pointer"><Eye className="w-3.5 h-3.5 text-[#6A7282]" /></button>
                    <button className="w-7 h-7 rounded-lg hover:bg-gray-200 flex items-center justify-center cursor-pointer"><Download className="w-3.5 h-3.5 text-[#6A7282]" /></button>
                    <button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center cursor-pointer"><Trash2 className="w-3.5 h-3.5 text-[#EF4444]" /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
