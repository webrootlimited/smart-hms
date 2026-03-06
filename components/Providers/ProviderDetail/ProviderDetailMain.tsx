"use client";

import { useState, useRef } from "react";
import {
  User,
  Clock,
  MapPin,
  Settings,
  Video,
  Award,
  FileText,
  Users,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { providerDetail } from "./detailData";
import PersonalInfoTab from "./PersonalInfoTab";
import WorkScheduleTab from "./WorkScheduleTab";
import LocationsTab from "./LocationsTab";
import AppointmentRulesTab from "./AppointmentRulesTab";
import TelehealthTab from "./TelehealthTab";
import CertificationsTab from "./CertificationsTab";
import DocumentsTab from "./DocumentsTab";
import AssistantsTab from "./AssistantsTab";

const TABS = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "schedule", label: "Work Schedule", icon: Clock },
  { id: "locations", label: "Locations", icon: MapPin },
  { id: "rules", label: "Appointment Rules", icon: Settings },
  { id: "telehealth", label: "Telehealth", icon: Video },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "assistants", label: "Assistants", icon: Users },
];

export default function ProviderDetailMain() {
  const [activeTab, setActiveTab] = useState("personal");
  const scrollRef = useRef<HTMLDivElement>(null);

  const renderTab = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInfoTab data={providerDetail} />;
      case "schedule":
        return <WorkScheduleTab data={providerDetail} />;
      case "locations":
        return <LocationsTab data={providerDetail} />;
      case "rules":
        return <AppointmentRulesTab data={providerDetail} />;
      case "telehealth":
        return <TelehealthTab data={providerDetail} />;
      case "certifications":
        return <CertificationsTab data={providerDetail} />;
      case "documents":
        return <DocumentsTab data={providerDetail} />;
      case "assistants":
        return <AssistantsTab data={providerDetail} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-5">
      {/* Back button */}
      <Link
        href="/providers"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#6A7282] hover:text-[#101828] transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Providers
      </Link>

      {/* Horizontal scrollable tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div
          ref={scrollRef}
          className="flex items-center gap-1 p-1.5 overflow-x-auto scrollbar-hide"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl whitespace-nowrap transition cursor-pointer shrink-0 ${
                activeTab === tab.id
                  ? "bg-[#0284C7] text-white"
                  : "text-[#6A7282] hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {renderTab()}
    </div>
  );
}
