import TelehealthSession from "./TelehealthSession";
import TodaySchedule from "./TodaySchedule";
import UpcomingAppointments from "./UpcomingAppointments";
import TodoList from "./TodoList";
import PatientQueue from "./PatientQueue";

export default function DoctorDashboardMain() {
  return (
    <div className="space-y-5">
      {/* Top row: Telehealth + Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <TelehealthSession />
        </div>
        <TodaySchedule />
      </div>

      {/* Middle row: Appointments + Todo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <UpcomingAppointments />
        </div>
        <TodoList />
      </div>

      {/* Bottom: Patient Queue */}
      <PatientQueue />
    </div>
  );
}
