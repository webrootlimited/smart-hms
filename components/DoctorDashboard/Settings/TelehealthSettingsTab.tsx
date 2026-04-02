"use client";

import { useState, useEffect } from "react";
import { Globe, Clock, Bell, Check, Building2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPut } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { DoctorProfile } from "./DoctorSettingsMain";

interface Props {
  doctor: DoctorProfile | null;
}

export default function TelehealthSettingsTab({ doctor }: Props) {
  const queryClient = useQueryClient();
  const [onlineConsultation, setOnlineConsultation] = useState(false);
  const [offlineConsultation, setOfflineConsultation] = useState(true);
  const [waitingRoom, setWaitingRoom] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (doctor) {
      setOnlineConsultation(doctor.online_consultation);
      setOfflineConsultation(doctor.offline_consultation ?? true);
    }
  }, [doctor]);

  const { mutate, isPending } = useMutation({
    mutationFn: () => apiPut("/api/doctor/profile", { online_consultation: onlineConsultation, offline_consultation: offlineConsultation }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.doctorProfile });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    },
  });

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`w-11 h-6 rounded-full relative transition cursor-pointer shrink-0 ${
        on ? "bg-[#0284C7]" : "bg-gray-300"
      }`}
    >
      <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
        on ? "translate-x-5" : "translate-x-0"
      }`} />
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#101828]">Telehealth Settings</h3>
          <p className="text-xs text-[#6A7282]">Configure your virtual consultation preferences</p>
        </div>
        <div className="flex items-center gap-2">
          {saved && <span className="flex items-center gap-1 text-xs text-[#16A34A]"><Check className="w-3.5 h-3.5" /> Saved</span>}
          <button
            onClick={() => mutate()}
            disabled={isPending}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* In-Person Consultations */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#F0F9FF] flex items-center justify-center">
              <Building2 className="w-4 h-4 text-[#0284C7]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#101828]">In-Person Consultations</p>
              <p className="text-[11px] text-[#6A7282]">Allow patients to book clinic visits with you</p>
            </div>
          </div>
          <Toggle on={offlineConsultation} onToggle={() => setOfflineConsultation(!offlineConsultation)} />
        </div>

        {/* Online Consultations */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#F0FDF4] flex items-center justify-center">
              <Globe className="w-4 h-4 text-[#16A34A]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#101828]">Online Consultations</p>
              <p className="text-[11px] text-[#6A7282]">Allow patients to book virtual appointments with you</p>
            </div>
          </div>
          <Toggle on={onlineConsultation} onToggle={() => setOnlineConsultation(!onlineConsultation)} />
        </div>

        {/* Waiting Room */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#F0F9FF] flex items-center justify-center">
              <Clock className="w-4 h-4 text-[#0284C7]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#101828]">Enable Waiting Room</p>
              <p className="text-[11px] text-[#6A7282]">Patients wait until you admit them</p>
            </div>
          </div>
          <Toggle on={waitingRoom} onToggle={() => setWaitingRoom(!waitingRoom)} />
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#FFF7ED] flex items-center justify-center">
              <Bell className="w-4 h-4 text-[#EA580C]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#101828]">Patient Join Notifications</p>
              <p className="text-[11px] text-[#6A7282]">Get notified when a patient enters the waiting room</p>
            </div>
          </div>
          <Toggle on={notifications} onToggle={() => setNotifications(!notifications)} />
        </div>
      </div>

      {/* Note about session duration */}
      <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-xl px-4 py-3">
        <p className="text-xs text-[#0284C7] font-medium">
          Session duration is configured in the Work Hours tab as "Slot Duration" for each schedule type.
        </p>
      </div>
    </div>
  );
}
