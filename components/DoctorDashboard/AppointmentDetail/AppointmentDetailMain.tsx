"use client";

import { useParams } from "next/navigation";
import { APPOINTMENTS_DATA } from "./mockData";
import AppointmentHeader from "./AppointmentHeader";
import PatientBanner from "./PatientBanner";
import PatientDemographics from "./PatientDemographics";
import TelehealthCard from "./TelehealthCard";
import MedicalHistory from "./MedicalHistory";
import PreVisitForm from "./PreVisitForm";
import UploadedDocuments from "./UploadedDocuments";
import FinalizeVisit from "./FinalizeVisit";

export default function AppointmentDetailMain() {
  const params = useParams();
  const appointmentId = params.appointmentId as string;
  const appointment = APPOINTMENTS_DATA[appointmentId];

  if (!appointment) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-lg font-bold text-[#101828]">Appointment Not Found</p>
          <p className="text-sm text-[#6A7282] mt-1">No appointment found with ID: {appointmentId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <AppointmentHeader appointment={appointment} />
      <PatientBanner appointment={appointment} />

      {/* Main grid: Left (2/3) + Right (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-5">
          <PatientDemographics appointment={appointment} />
          <MedicalHistory appointment={appointment} />
          <UploadedDocuments appointment={appointment} />
        </div>

        {/* Right column */}
        <div className="space-y-5">
          <TelehealthCard appointment={appointment} />
          <PreVisitForm appointment={appointment} />
          <FinalizeVisit />
        </div>
      </div>
    </div>
  );
}
