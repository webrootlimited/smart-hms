import AdminAppointmentDetail from "@/components/Appointments/AdminAppointmentDetail";

export default async function AppointmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <AdminAppointmentDetail appointmentId={id} />;
}
