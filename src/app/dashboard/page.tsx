import { count, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/drizzle/db";
import { posts } from "@/drizzle/db/schemas";
import { auth } from "@/lib/auth";
import { DashboardShell } from "./_components/DashboardShell";

export default async function UserDashboard() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user == null) {
    redirect("/sign-in");
  }

  const postCounts = await db
    .select({
      status: posts.status,
      count: count(),
    })
    .from(posts)
    .where(eq(posts.userId, session.user.id))
    .groupBy(posts.status);

  const stats = {
    published: 0,
    failed: 0,
    pending: 0,
  };

  for (const row of postCounts) {
    stats[row.status] = row.count;
  }

  return <DashboardShell stats={stats} user={session.user} />;
}
