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
        name: doctor.name,
        avatar: doctor.avatar,
        specialty: doctor.specialty,
        specialtyColor: doctor.specialtyColor,
        consultFee: doctor.consultFee,
      }}
      clinic={{
        name: doctor.clinic,
        address: doctor.clinicAddress,
      }}
      onBack={onBack}
    />
  );
}
