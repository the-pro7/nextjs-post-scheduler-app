import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth.api.getSession({headers: await headers()})

  if (session && session.user != null) redirect("/dashboard")
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f5ef] px-6 py-16 text-[#171717]">
      <div className="radial-background" />
      <div className="radial-background-secondary" />

      <section className="relative w-full max-w-4xl text-center">
        <p className="mb-5 inline-flex rounded-full border border-[#171717]/10 bg-white/70 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur">
          Schedule posts for later with ease
        </p>
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          Welcome to Next Scheduler
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4a4a4a] sm:text-xl">
          Create posts, plan your publishing calendar, and schedule content to
          go live later so your ideas show up right on time.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/sign-in"
            className="inline-flex h-12 min-w-36 items-center justify-center rounded-full bg-[#171717] px-7 text-sm font-semibold text-white shadow-xl shadow-black/15 transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#171717] focus:ring-offset-2"
          >
            Sign in
          </a>
          <a
            href="/sign-up"
            className="inline-flex h-12 min-w-36 items-center justify-center rounded-full border border-[#171717]/15 bg-white/75 px-7 text-sm font-semibold text-[#171717] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#171717] focus:ring-offset-2"
          >
            Sign up
          </a>
        </div>
      </section>
    </main>
  );
}
