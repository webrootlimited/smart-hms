"use client";

import type { ClinicDoctor } from "./FindClinicDoctor";
import SelectClinicDateSlot from "./SelectClinicDateSlot";

export default function ClinicDoctorDetail({
  doctor,
  onBack,
}: {
  doctor: ClinicDoctor;
  onBack: () => void;
}) {
  if (!doctor.clinic) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-[#6A7282]">This doctor has no clinic assigned.</p>
        <button onClick={onBack} className="text-sm text-[#0284C7] mt-3 hover:underline">Go back</button>
      </div>
    );
  }

  return (
    <SelectClinicDateSlot
      doctor={{
        id: doctor.id,
        name: doctor.name,
        initials: doctor.initials,
        specialty: doctor.specialty,
        consultFee: doctor.consultFee,
        photo_url: doctor.photo_url,
      }}
      clinic={{
        id: doctor.clinic.id,
        name: doctor.clinic.name,
        address: doctor.clinic.address,
      }}
      onBack={onBack}
    />
  );
}
