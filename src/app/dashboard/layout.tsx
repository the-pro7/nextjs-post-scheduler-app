import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { auth } from "@/lib/auth";
import { DashboardLayoutShell } from "./_components/DashboardLayoutShell";



export default async function DashBoardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!session || user == null) {
    redirect("/sign-in");
  }

  const displayName = session.user.name || session.user.email || "stranger";

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#171717]">
      <DashboardLayoutShell displayName={displayName}>
        {children}
      </DashboardLayoutShell>
    </main>
  );
}
