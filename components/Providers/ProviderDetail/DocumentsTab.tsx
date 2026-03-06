"use client";

import { useState } from "react";
import { Upload, FileText, File, Trash2 } from "lucide-react";
import { DeleteConfirmDialog } from "./ProviderEditDialogs";

type Data = typeof import("./detailData").providerDetail;
type Document = Data["documents"][number];

export default function DocumentsTab({ data }: { data: Data }) {
  const [deleteDoc, setDeleteDoc] = useState<Document | null>(null);
  return (
    <div className="space-y-5">
      {/* Upload area */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-10 flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-full bg-[#EFF6FF] flex items-center justify-center mb-4">
          <Upload className="w-6 h-6 text-[#0284C7]" />
        </div>
        <h3 className="text-sm font-bold text-[#101828]">
          Upload New Document
        </h3>
        <p className="text-xs text-[#6A7282] mt-1">
          Drag and drop files here, or click to browse
        </p>
        <button className="mt-4 px-5 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
          Choose Files
        </button>
      </div>

      {/* All Documents */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="w-4 h-4 text-[#0284C7]" />
          <h2 className="text-base font-bold text-[#101828]">All Documents</h2>
        </div>
        <p className="text-xs text-[#6A7282] mb-5">
          {data.documents.length} files uploaded
        </p>

        <div className="space-y-3">
          {data.documents.map((doc) => (
            <div
              key={doc.name}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition"
            >
              <div className="w-10 h-10 rounded-lg bg-[#FEF2F2] flex items-center justify-center shrink-0">
                <File className="w-5 h-5 text-[#EF4444]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#101828]">
                  {doc.name}
                </p>
                <p className="text-xs text-[#6A7282]">
                  {doc.size} • {doc.date} •{" "}
                  <span
                    className={`px-1.5 py-0.5 rounded text-xs font-medium ${doc.tagColor}`}
                  >
                    {doc.tag}
                  </span>
                </p>
              </div>
              <button onClick={() => setDeleteDoc(doc)} className="p-2 rounded-lg hover:bg-red-50 transition cursor-pointer shrink-0">
                <Trash2 className="w-4 h-4 text-[#EF4444]" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <DeleteConfirmDialog
        open={!!deleteDoc}
        onClose={() => setDeleteDoc(null)}
        title="Delete Document"
        description={`Are you sure you want to delete "${deleteDoc?.name ?? "this document"}"? This action cannot be undone.`}
      />
    </div>
  );
}
