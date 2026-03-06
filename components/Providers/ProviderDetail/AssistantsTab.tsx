"use client";

import { useState } from "react";
import { Mail, Phone, Pencil, Plus, Trash2 } from "lucide-react";
import { EditAssistantDialog, DeleteConfirmDialog } from "./ProviderEditDialogs";

type Data = typeof import("./detailData").providerDetail;
type Assistant = Data["assistants"][number];

export default function AssistantsTab({ data }: { data: Data }) {
  const [editAssistant, setEditAssistant] = useState<Assistant | null>(null);
  const [deleteAssistant, setDeleteAssistant] = useState<Assistant | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {data.assistants.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${a.color} flex items-center justify-center text-white text-sm font-bold`}
                >
                  {a.avatar}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#101828]">{a.name}</h3>
                  <p className="text-xs text-[#6A7282]">{a.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setEditAssistant(a)} className="p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                  <Pencil className="w-4 h-4 text-[#6A7282]" />
                </button>
                <button onClick={() => setDeleteAssistant(a)} className="p-2 rounded-lg hover:bg-red-50 transition cursor-pointer">
                  <Trash2 className="w-4 h-4 text-[#EF4444]" />
                </button>
              </div>
            </div>

            <span className="inline-block px-2 py-0.5 text-xs font-medium bg-[#F0FDF4] text-[#16A34A] rounded-full mb-3">
              {a.status}
            </span>

            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl">
                <Mail className="w-3.5 h-3.5 text-[#6A7282]" />
                <span className="text-xs text-[#4A5565]">{a.email}</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl">
                <Phone className="w-3.5 h-3.5 text-[#6A7282]" />
                <span className="text-xs text-[#4A5565]">{a.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Assistant */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center mb-3">
          <Plus className="w-5 h-5 text-[#0284C7]" />
        </div>
        <h3 className="text-sm font-bold text-[#101828]">Add Assistant</h3>
        <p className="text-xs text-[#6A7282] mt-1">Assign a new team member</p>
      </div>

      <EditAssistantDialog open={!!editAssistant} onClose={() => setEditAssistant(null)} data={editAssistant} />
      <DeleteConfirmDialog
        open={!!deleteAssistant}
        onClose={() => setDeleteAssistant(null)}
        title="Delete Assistant"
        description={`Are you sure you want to remove ${deleteAssistant?.name ?? "this assistant"}? This action cannot be undone.`}
      />
    </div>
  );
}
