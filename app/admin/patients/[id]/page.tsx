import PatientDetailMain from "@/components/Patients/PatientDetail/PatientDetailMain";

export default async function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PatientDetailMain patientId={id} />;
}
