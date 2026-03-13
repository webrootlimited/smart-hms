"use client";

import { useState, useEffect, useCallback } from "react";
import { Clock, Building2, Globe, Loader2, Check } from "lucide-react";
import { authHeaders } from "./DoctorSettingsMain";
import instance from "@/utils/instance";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

type ScheduleType = "OFFLINE" | "ONLINE";

interface DaySchedule {
  day: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  active: boolean;
}

const buildEmpty = (): DaySchedule[] =>
  DAY_NAMES.map((day, i) => ({ day, day_of_week: i, start_time: "", end_time: "", active: false }));

export default function WorkHoursTab() {
  const [activeType, setActiveType] = useState<ScheduleType>("OFFLINE");
  const [offlineSchedule, setOfflineSchedule] = useState<DaySchedule[]>(buildEmpty());
  const [onlineSchedule, setOnlineSchedule] = useState<DaySchedule[]>(buildEmpty());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const schedule = activeType === "OFFLINE" ? offlineSchedule : onlineSchedule;
  const setSchedule = activeType === "OFFLINE" ? setOfflineSchedule : setOnlineSchedule;

  const applyAvailability = useCallback(
    (avail: { day_of_week: number; start_time: string; end_time: string }[], setter: (s: DaySchedule[]) => void) => {
      if (avail && avail.length > 0) {
        setter(
          DAY_NAMES.map((day, i) => {
            const found = avail.find((a) => a.day_of_week === i);
            return found
              ? { day, day_of_week: i, start_time: found.start_time, end_time: found.end_time, active: true }
              : { day, day_of_week: i, start_time: "", end_time: "", active: false };
          })
        );
      } else {
        setter(buildEmpty());
      }
    },
    []
  );

  useEffect(() => {
    const fetchBoth = async () => {
      try {
        const headers = await authHeaders();
        const [offRes, onRes] = await Promise.all([
          instance.get("/api/doctor/availability?type=OFFLINE", { headers }),
          instance.get("/api/doctor/availability?type=ONLINE", { headers }),
        ]);
        applyAvailability(offRes.data.availability, setOfflineSchedule);
        applyAvailability(onRes.data.availability, setOnlineSchedule);
      } catch (err) {
        console.error("Failed to fetch availability:", err);
      }
    };
    fetchBoth();
  }, [applyAvailability]);

  const toggleDay = (idx: number) => {
    setSchedule((prev) => prev.map((d, i) => (i === idx ? { ...d, active: !d.active } : d)));
  };

  const updateTime = (idx: number, field: "start_time" | "end_time", value: string) => {
    setSchedule((prev) => prev.map((d, i) => (i === idx ? { ...d, [field]: value } : d)));
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const headers = await authHeaders();
      await instance.put("/api/doctor/availability", { schedule, type: activeType }, { headers });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Failed to save work hours");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#101828]">Work Hours</h3>
          <p className="text-xs text-[#6A7282]">Configure your weekly availability for in-person and online consultations</p>
        </div>
        <div className="flex items-center gap-2">
          {saved && <span className="flex items-center gap-1 text-xs text-[#16A34A]"><Check className="w-3.5 h-3.5" /> Saved</span>}
          {error && <span className="text-xs text-[#DC2626]">{error}</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer disabled:opacity-60"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Changes
          </button>
        </div>
      </div>

      {/* Sub-tabs: In-Person / Online */}
      <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl w-fit">
        <button
          onClick={() => setActiveType("OFFLINE")}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition cursor-pointer ${
            activeType === "OFFLINE"
              ? "bg-white text-[#101828] shadow-sm"
              : "text-[#6A7282] hover:text-[#101828]"
          }`}
        >
          <Building2 className="w-4 h-4" />
          In-Person
        </button>
        <button
          onClick={() => setActiveType("ONLINE")}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition cursor-pointer ${
            activeType === "ONLINE"
              ? "bg-white text-[#101828] shadow-sm"
              : "text-[#6A7282] hover:text-[#101828]"
          }`}
        >
          <Globe className="w-4 h-4" />
          Online
        </button>
      </div>

      {/* Schedule rows */}
      <div className="space-y-3">
        {schedule.map((s, idx) => (
          <div key={s.day} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
            <button
              onClick={() => toggleDay(idx)}
              className={`w-11 h-6 rounded-full relative transition cursor-pointer shrink-0 ${
                s.active ? "bg-[#0284C7]" : "bg-gray-300"
              }`}
            >
              <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
                s.active ? "translate-x-5" : "translate-x-0"
              }`} />
            </button>

            <span className={`text-sm font-semibold w-24 ${s.active ? "text-[#101828]" : "text-[#9CA3AF]"}`}>
              {s.day}
            </span>

            {s.active ? (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
                  <input
                    type="time"
                    value={s.start_time}
                    onChange={(e) => updateTime(idx, "start_time", e.target.value)}
                    className="pl-8 pr-2 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] w-32"
                  />
                </div>
                <span className="text-xs text-[#6A7282]">to</span>
                <div className="relative">
                  <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
                  <input
                    type="time"
                    value={s.end_time}
                    onChange={(e) => updateTime(idx, "end_time", e.target.value)}
                    className="pl-8 pr-2 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] w-32"
                  />
                </div>
              </div>
            ) : (
              <span className="text-xs text-[#9CA3AF]">Day off</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
