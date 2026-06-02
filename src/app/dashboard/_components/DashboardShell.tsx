"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Link from "next/link";
import UpcomingPosts from "./upcoming-posts";

type PostStats = {
  published: number;
  failed: number;
  pending: number;
};

type DashboardShellProps = {
  user: {
    name?: string | null;
    email?: string | null;
    signinCount?: number | null;
  };
  stats: PostStats;
};

const statCards: Array<{
  label: string;
  key: keyof PostStats;
  description: string;
}> = [
  {
    label: "Published posts",
    key: "published",
    description: "Posts that have gone live.",
  },
  {
    label: "Failed posts",
    key: "failed",
    description: "Posts that need attention.",
  },
  {
    label: "Pending posts",
    key: "pending",
    description: "Posts waiting to be published.",
  },
];

export function DashboardShell({ user, stats }: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const displayName = user.name || user.email || "there";

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#171717]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          displayName={displayName}
        />

        <section className="flex min-w-0 flex-1 flex-col px-6 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto w-full max-w-6xl">
            <header className="rounded-3xl border border-white/70 bg-white/75 p-6 shadow-xl shadow-black/5 backdrop-blur sm:p-8">
              <p className="text-lg font-semibold text-teal-700">Dashboard</p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                {user.signinCount && user.signinCount > 1
                  ? "Welcome back"
                  : "Hi there"}
                , {displayName}
              </h1>
              <p className="mt-3 max-w-2xl text-[#5f5f5f] leading-7">
                Here is a quick look at how your scheduled posts are doing.
              </p>
            </header>
            {/* <Link href="/feed">
              <button className="cursor-pointer mt-3 font-medium text-lg bg-black text-white rounded-full py-2 px-4 justify-end transition hover:bg-black/70 active:outline-1">
                Go to Feed
              </button>
            </Link> */}
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {statCards.map((card) => (
                <article
                  key={card.key}
                  className="rounded-3xl border border-[#171717]/10 bg-white p-6 shadow-sm"
                >
                  <p className="text-sm font-semibold text-[#5f5f5f]">
                    {card.label}
                  </p>
                  <p className="mt-4 text-5xl font-bold tracking-tight">
                    {stats[card.key]}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-[#6b6b6b]">
                    {card.description}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-6">
              <UpcomingPosts />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
