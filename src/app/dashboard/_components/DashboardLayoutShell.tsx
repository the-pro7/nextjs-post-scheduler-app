"use client";

import { type ReactNode, useState } from "react";
import Sidebar from "./Sidebar";


type DashboardLayoutShellProps = {
  children: ReactNode;
  displayName: string;
};


export function DashboardLayoutShell({
  children,
  displayName,
}: DashboardLayoutShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen min-h-0 overflow-hidden">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        displayName={displayName}
      />

      <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto px-6 py-8 sm:px-8 lg:px-10">
       {children}
      </section>
    </div>
  );
}
