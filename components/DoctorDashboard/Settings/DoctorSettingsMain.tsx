"use client";

import { useState } from "react";
import { User, Briefcase, Clock, MapPin, Video } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import ProfileBanner from "./ProfileBanner";
import PersonalInfoTab from "./PersonalInfoTab";
import ProfessionalDetailsTab from "./ProfessionalDetailsTab";
import WorkHoursTab from "./WorkHoursTab";
import LocationsTab from "./LocationsTab";
import TelehealthSettingsTab from "./TelehealthSettingsTab";

const TABS = [
  { id: "personal", label: "Personal Information", icon: User },
  { id: "professional", label: "Professional Details", icon: Briefcase },
  { id: "hours", label: "Work Hours", icon: Clock },
  { id: "locations", label: "Locations", icon: MapPin },
  { id: "telehealth", label: "Telehealth Settings", icon: Video },
] as const;

type TabId = (typeof TABS)[number]["id"];

export interface DoctorProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  specialization: string;
  experience_years: number;
  consultation_fee: number;
  bio: string;
  dob: string | null;
  gender: string;
  address: string;
  department: string;
  online_consultation: boolean;
  photo_url: string;
  status: string;
  license_number: string;
  verification_status: string;
}

export default function DoctorSettingsMain() {
  const [activeTab, setActiveTab] = useState<TabId>("personal");

  const { data: doctor = null, isLoading } = useQuery({
    queryKey: queryKeys.doctorProfile,
    queryFn: async () => {
      const res = await apiFetch<{ success: boolean; doctor: DoctorProfile }>("/api/doctor/profile");
      return res.doctor;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-3 border-[#0284C7] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <ProfileBanner doctor={doctor} />

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-1 px-5 pt-4 border-b border-gray-100 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition cursor-pointer ${
                activeTab === tab.id
                  ? "border-[#0284C7] text-[#0284C7]"
                  : "border-transparent text-[#6A7282] hover:text-[#101828]"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-6">
          {activeTab === "personal" && <PersonalInfoTab doctor={doctor} />}
          {activeTab === "professional" && <ProfessionalDetailsTab doctor={doctor} />}
          {activeTab === "hours" && <WorkHoursTab />}
          {activeTab === "locations" && <LocationsTab />}
          {activeTab === "telehealth" && <TelehealthSettingsTab doctor={doctor} />}
        </div>
      </div>
    </div>
  );
}
