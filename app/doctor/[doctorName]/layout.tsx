"use client";

import { useState } from "react";
import DoctorSidebar from "@/components/DoctorDashboard/DoctorSidebar";
import DoctorTopbar from "@/components/DoctorDashboard/DoctorTopbar";
import SocketProvider from "@/components/utils/SocketProvider";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SocketProvider>
      <div className="flex h-screen bg-[#F8FAFC]">
        <DoctorSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DoctorTopbar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </SocketProvider>
  );
}
