"use client";

import { useParams } from "next/navigation";
import TelehealthHeader from "./TelehealthHeader";
import PatientQueueCard from "./PatientQueueCard";
import TelehealthSidebar from "./TelehealthSidebar";
import { WAITING_PATIENTS } from "./mockData";

export default function TelehealthMain() {
  const params = useParams();
  const doctorSlug = params.doctorName as string;

  return (
    <div className="space-y-5">
      <TelehealthHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Queue list — takes 2/3 */}
        <div className="lg:col-span-2 space-y-3">
          {WAITING_PATIENTS.map((patient) => (
            <PatientQueueCard key={patient.id} patient={patient} doctorSlug={doctorSlug} />
          ))}

          {WAITING_PATIENTS.length === 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 shadow-sm text-center">
              <p className="text-sm font-semibold text-[#101828]">No patients in queue</p>
              <p className="text-xs text-[#6A7282] mt-1">Your waiting room is empty. New patients will appear here.</p>
            </div>
          )}
        </div>

        {/* Sidebar — takes 1/3 */}
        <TelehealthSidebar />
      </div>
    </div>
  );
}
