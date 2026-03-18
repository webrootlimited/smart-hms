"use client";

import { useState } from "react";
import PatientSidebar from "@/components/PatientDashboard/PatientSidebar";
import PatientTopbar from "@/components/PatientDashboard/PatientTopbar";
import SocketProvider from "@/components/utils/SocketProvider";

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SocketProvider>
      <div className="flex h-screen bg-[#F8FAFC]">
        <PatientSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <PatientTopbar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </SocketProvider>
  );
}
