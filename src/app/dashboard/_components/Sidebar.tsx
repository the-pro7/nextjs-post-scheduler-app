import { type Dispatch, type SetStateAction, useState } from "react";
import Link from "next/link";
import LogoutButton from "./logout-button";

const navigationLinks = [
  { label: "Home", href: "/dashboard" },
  { label: "Posts", href: "/dashboard/posts" },
  { label: "Schedule", href: "/dashboard/schedule" },
  { label: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  displayName,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  displayName: string;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <aside
      className={`flex shrink-0 flex-col border-[#171717]/10 border-r bg-white/80 px-4 py-6 shadow-sm backdrop-blur transition-[width] duration-300 ${
        isSidebarOpen ? "w-68" : "w-22"
      }`}
      aria-label="Dashboard navigation"
    >
      <div className="flex min-h-12 items-start justify-between gap-3">
        <Link
          href="/dashboard"
          className="min-w-0 font-bold text-lg leading-tight tracking-tight"
        >
          {isSidebarOpen ? (
            <>
              <h1 className="font-semibold tracking-wide">Next Scheduler</h1>
              <span className="text-xs text-blue-500 tracking-wider font-medium">
                USER DASHBOARD
              </span>
            </>
          ) : (
            "NS"
          )}
        </Link>
        <button
          type="button"
          onClick={() => setIsSidebarOpen((current) => !current)}
          className="h-9 aspect-square shrink-0 rounded-full border border-[#171717]/10 px-3 text-xs font-semibold transition hover:bg-[#171717] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#171717] focus:ring-offset-2"
          aria-expanded={isSidebarOpen}
        >
          {isSidebarOpen ? "<" : ">"}
        </button>
      </div>

      <nav className="mt-8 space-y-2">
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block rounded-2xl px-4 py-3 text-sm font-semibold text-[#4a4a4a] transition hover:bg-[#171717] hover:text-white`}
          >
            {isSidebarOpen ? link.label : link.label.slice(0, 1)}
          </Link>
        ))}
      </nav>

      <div
        className={`mt-auto border-[#171717]/10 border-t pt-5 flex justify-between items-center ${!isSidebarOpen && "flex-col gap-1"}`}
      >
        <div>
          <p
            className={`text-xs font-semibold text-teal-700 block ${!isSidebarOpen && "hidden"}`}
          >
            Signed in as
          </p>
          <p
            className={`mt-1 truncate text-sm font-semibold ${!isSidebarOpen && "text-center h-10 w-10 aspect-square rounded-full mx-auto shadow-md flex items-center justify-center bg-amber-500 text-white"}`}
          >
            {isSidebarOpen ? displayName : displayName.slice(0, 1)}
          </p>
        </div>
        <LogoutButton
          isSidebarOpen={isSidebarOpen}
          setLoading={setLoading}
          loading={loading}
        />
      </div>
    </aside>
  );
}
