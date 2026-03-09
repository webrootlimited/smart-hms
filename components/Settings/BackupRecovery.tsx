"use client";

import { useState } from "react";
import { Database, Download, RotateCcw } from "lucide-react";

export default function BackupRecovery() {
  const [autoBackup, setAutoBackup] = useState(true);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#F0FDF4] flex items-center justify-center">
          <Database className="w-4 h-4 text-[#16A34A]" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[#101828]">Backup & Recovery</h2>
          <p className="text-xs text-[#6A7282]">Data backup configuration</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Auto backup toggle */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[#101828]">Automatic Backups</p>
            <p className="text-xs text-[#6A7282]">Daily automated database backup</p>
          </div>
          <button
            onClick={() => setAutoBackup(!autoBackup)}
            className={`w-11 h-6 rounded-full relative transition cursor-pointer ${
              autoBackup ? "bg-[#16A34A]" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
                autoBackup ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Backup info */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-[#6A7282]">Backup Frequency</span>
            <span className="font-medium text-[#101828]">Daily at 2:00 AM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6A7282]">Last Backup</span>
            <span className="font-medium text-[#101828]">2 hours ago</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6A7282]">Backup Size</span>
            <span className="font-medium text-[#101828]">1.4 GB</span>
          </div>
        </div>

        {/* Backup location */}
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">Backup Location</label>
          <input
            type="text"
            defaultValue="/backups/hms/"
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
          />
        </div>

        {/* Retention */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-[#334155]">Retention Period</p>
            <span className="text-[10px] text-[#6A7282]">Keep backups for 90 days</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              defaultValue={30}
              className="w-20 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
            <span className="text-sm text-[#6A7282]">days</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
            <Download className="w-3.5 h-3.5" /> Download Backup
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#16A34A] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
            <RotateCcw className="w-3.5 h-3.5" /> Restore Backup
          </button>
        </div>
      </div>
    </div>
  );
}
