"use client";

import {
  Pill,
  Beaker,
  Clock,
  Repeat,
  Hash,
  CalendarDays,
  FileDown,
  Eye,
  RefreshCw,
  MessageSquare,
  Stethoscope,
  Info,
} from "lucide-react";
import type { Prescription } from "./prescriptionsData";

export default function PrescriptionCard({ rx }: { rx: Prescription }) {
  const isRefillPending = rx.status === "refill-requested";
  const canRefill = rx.status === "active" && rx.refillsRemaining > 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Top color accent */}
      <div className="h-1" style={{ backgroundColor: rx.iconColor }} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: rx.iconBg }}
            >
              <Pill className="w-5 h-5" style={{ color: rx.iconColor }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#101828]">
                  {rx.name}
                </h3>
                <span
                  className="px-2 py-0.5 text-[10px] font-bold rounded-full"
                  style={{
                    color: rx.statusColor,
                    backgroundColor: rx.statusBg,
                  }}
                >
                  {rx.statusLabel}
                </span>
              </div>
              <p className="text-xs text-[#6A7282] mt-0.5">{rx.generic}</p>
              <p className="text-[10px] text-[#9CA3AF] mt-0.5">
                Prescription ID: {rx.id}
              </p>
            </div>
          </div>
        </div>

        {/* Dosage info grid */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="bg-[#F8FAFC] rounded-xl px-3 py-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <Beaker className="w-3 h-3 text-[#6A7282]" />
              <p className="text-[10px] text-[#6A7282] font-medium">Dosage</p>
            </div>
            <p className="text-sm font-bold text-[#101828]">{rx.dosage}</p>
          </div>
          <div className="bg-[#F8FAFC] rounded-xl px-3 py-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <Clock className="w-3 h-3 text-[#6A7282]" />
              <p className="text-[10px] text-[#6A7282] font-medium">
                Frequency
              </p>
            </div>
            <p className="text-sm font-bold text-[#101828]">{rx.frequency}</p>
          </div>
          <div className="bg-[#F8FAFC] rounded-xl px-3 py-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <Pill className="w-3 h-3 text-[#6A7282]" />
              <p className="text-[10px] text-[#6A7282] font-medium">Form</p>
            </div>
            <p className="text-sm font-bold text-[#101828]">{rx.form}</p>
          </div>
          <div className="bg-[#F8FAFC] rounded-xl px-3 py-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <CalendarDays className="w-3 h-3 text-[#6A7282]" />
              <p className="text-[10px] text-[#6A7282] font-medium">
                Duration
              </p>
            </div>
            <p className="text-sm font-bold text-[#101828]">{rx.duration}</p>
          </div>
        </div>

        {/* Prescribed by */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-7 h-7 rounded-full bg-[#FFF7ED] flex items-center justify-center text-[10px] font-bold text-[#F59E0B] shrink-0">
            {rx.prescribedBy.avatar}
          </div>
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-semibold text-[#101828]">
              Prescribed by {rx.prescribedBy.name}
            </p>
            <span className="text-[10px] text-[#6A7282]">
              · {rx.prescribedBy.specialty} · {rx.prescribedBy.clinic}
            </span>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl px-3.5 py-2.5 flex items-start gap-2 mb-4">
          <Info className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 mt-0.5" />
          <p className="text-xs text-[#92400E]">{rx.instructions}</p>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-5 mb-4 text-[11px] text-[#6A7282]">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="w-3 h-3" />
            Issued: {rx.issueDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            Last fill: {rx.lastFill}
          </span>
          <span className="flex items-center gap-1.5">
            <Repeat className="w-3 h-3" />
            Refills remaining: {rx.refillsRemaining}
          </span>
          <span className="flex items-center gap-1.5">
            <Hash className="w-3 h-3" />
            Quantity: {rx.quantity}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3.5 py-2 bg-[#0284C7] text-white text-xs font-semibold rounded-lg hover:opacity-90 transition cursor-pointer">
            <Eye className="w-3.5 h-3.5" />
            View Details
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 text-xs font-semibold text-[#4A5565] rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <FileDown className="w-3.5 h-3.5" />
            Download PDF
          </button>
          {canRefill && (
            <button className="flex items-center gap-1.5 px-3.5 py-2 bg-[#FFFBEB] border border-[#FDE68A] text-xs font-semibold text-[#92400E] rounded-lg hover:bg-[#FEF3C7] transition cursor-pointer">
              <RefreshCw className="w-3.5 h-3.5" />
              Request Refill
            </button>
          )}
          {isRefillPending && (
            <button
              disabled
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 text-xs font-semibold text-[#9CA3AF] rounded-lg cursor-not-allowed"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refill Pending
            </button>
          )}
          <button className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 text-xs font-semibold text-[#4A5565] rounded-lg hover:bg-gray-50 transition cursor-pointer ml-auto">
            <MessageSquare className="w-3.5 h-3.5" />
            Message Doctor
          </button>
        </div>
      </div>
    </div>
  );
}
