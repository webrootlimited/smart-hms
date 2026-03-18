import { FileText } from "lucide-react";

export default function UploadedDocuments() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-sm font-bold text-[#101828] mb-4">Uploaded Documents</h3>
      <div className="flex items-center justify-center py-4">
        <div className="text-center">
          <FileText className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-xs text-[#6A7282]">No documents uploaded</p>
        </div>
      </div>
    </div>
  );
}
