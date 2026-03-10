"use client";

import NextAppointmentCard from "./NextAppointmentCard";
import InstantConsultationCard from "./InstantConsultationCard";
import HeartRateCard from "./HeartRateCard";
import HealthActivityChart from "./HealthActivityChart";
import BookAppointmentCard from "./BookAppointmentCard";
import MessagesCard from "./MessagesCard";
import PrescriptionsCard from "./PrescriptionsCard";
import NotificationsCard from "./NotificationsCard";

export default function PatientDashboardMain() {
  return (
    <div className="space-y-5">
      {/* Row 1: Next Appointment + Instant Consultation & Heart Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <NextAppointmentCard />
        </div>
        <div className="flex flex-col gap-5">
          <InstantConsultationCard />
          <HeartRateCard />
        </div>
      </div>

      {/* Row 2: Health Activity + Book Appointment & Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <HealthActivityChart />
        </div>
        <div className="flex flex-col gap-5">
          <BookAppointmentCard />
          <MessagesCard />
        </div>
      </div>

      {/* Row 3: Prescriptions + Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <PrescriptionsCard />
        <NotificationsCard />
      </div>
    </div>
  );
}
