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
      clinic={doctor.clinic ? {
        id: doctor.clinic.id,
        name: doctor.clinic.name,
        address: doctor.clinic.address,
      } : null}
      onBack={onBack}
    />
  );
}
