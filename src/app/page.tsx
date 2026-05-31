export default function HomePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f5ef] px-6 py-16 text-[#171717]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(20,184,166,0.2),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(251,146,60,0.18),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.92),rgba(247,245,239,0.78))]" />
      <div className="absolute -bottom-24 left-1/2 h-64 w-136 -translate-x-1/2 rounded-full bg-[#171717]/10 blur-3xl" />

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
