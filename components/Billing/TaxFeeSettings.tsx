"use client";

import { useState } from "react";
import { Settings, Save } from "lucide-react";

export default function TaxFeeSettings() {
  const [autoReminders, setAutoReminders] = useState(true);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <Settings className="w-4 h-4 text-[#0284C7]" />
        <div>
          <h2 className="text-base font-bold text-[#101828]">Tax & Fee Settings</h2>
          <p className="text-xs text-[#6A7282]">Configure taxes and penalties</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Sales Tax Rate */}
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1">Sales Tax Rate</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              defaultValue="8.5"
              className="w-20 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
            <span className="text-sm text-[#6A7282]">%</span>
          </div>
          <p className="text-[10px] text-[#6A7282] mt-1">Applied to all taxable services and products</p>
        </div>

        {/* Late Payment Fee */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-[#334155]">Late Payment Fee</label>
            <span className="text-[10px] text-[#6A7282]">Currency: £</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#6A7282]">£</span>
            <input
              type="text"
              defaultValue="25"
              className="w-20 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>
          <p className="text-[10px] text-[#6A7282] mt-1">Charged after grace period expires</p>
        </div>

        {/* Payment Grace Period */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-[#334155]">Payment Grace Period</label>
            <span className="text-[10px] text-[#6A7282]">Calendar days</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              defaultValue="30"
              className="w-20 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
            <span className="text-sm text-[#6A7282]">days</span>
          </div>
          <p className="text-[10px] text-[#6A7282] mt-1">Days before late fee is applied</p>
        </div>

        {/* Auto Reminders */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs font-semibold text-[#334155]">Automatic Payment Reminders</p>
            <p className="text-[10px] text-[#6A7282]">Send reminder before late fee</p>
          </div>
          <button
            onClick={() => setAutoReminders(!autoReminders)}
            className={`w-11 h-6 rounded-full relative transition cursor-pointer ${
              autoReminders ? "bg-[#16A34A]" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
                autoReminders ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      <button className="mt-5 flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#16A34A] text-white rounded-xl hover:opacity-90 transition cursor-pointer w-full justify-center">
        <Save className="w-4 h-4" /> Save Configuration
      </button>
    </div>
  );
}
