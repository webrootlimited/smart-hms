"use client";

import { useState, useEffect, useCallback } from "react";
import { User, Heart, Shield } from "lucide-react";
import instance from "@/utils/instance";
import getToken from "@/auth/getToken";
import PatientProfileBanner from "./PatientProfileBanner";
import PersonalInfoTab from "./PersonalInfoTab";
import MedicalInfoTab from "./MedicalInfoTab";
import EmergencyContactTab from "./EmergencyContactTab";

const TABS = [
  { id: "personal", label: "Personal Information", icon: User },
  { id: "medical", label: "Medical Information", icon: Heart },
  { id: "emergency", label: "Emergency Contact", icon: Shield },
] as const;

type TabId = (typeof TABS)[number]["id"];

export interface PatientProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dob: string | null;
  gender: string;
  address: {
    line1?: string;
    line2?: string;
    city?: string;
    postcode?: string;
    country?: string;
  };
  blood_group: string;
  nhs_number: string;
  photo_url: string;
  emergency_contact: {
    name: string;
    phone: string;
    relationship: string;
  } | null;
}

export async function authHeaders() {
  const token = await getToken();
  return { Authorization: `Bearer ${token}` };
}

export default function PatientSettingsMain() {
  const [activeTab, setActiveTab] = useState<TabId>("personal");
  const [patient, setPatient] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const headers = await authHeaders();
      const res = await instance.get("/api/patient/profile", { headers });
      setPatient(res.data.patient);
    } catch (err) {
      console.error("Failed to fetch patient profile:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-3 border-[#0284C7] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <PatientProfileBanner patient={patient} />

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

        <div className="p-6">
          {activeTab === "personal" && <PersonalInfoTab patient={patient} onSaved={fetchProfile} />}
          {activeTab === "medical" && <MedicalInfoTab patient={patient} onSaved={fetchProfile} />}
          {activeTab === "emergency" && <EmergencyContactTab patient={patient} onSaved={fetchProfile} />}
        </div>
      </div>
    </div>
  );
}
