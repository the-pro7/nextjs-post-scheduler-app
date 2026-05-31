"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

type AuthType = "signin" | "signup";

type AuthFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const formContent = {
  signin: {
    eyebrow: "Welcome back",
    title: "Sign in to Next Scheduler",
    description:
      "Plan posts, manage your calendar, and keep publishing on time.",
    submitLabel: "Sign in",
    switchText: "New here?",
    switchLabel: "Create an account",
    switchHref: "/sign-up",
  },
  signup: {
    eyebrow: "Start scheduling",
    title: "Create your account",
    description: "Draft posts now and schedule them to publish later.",
    submitLabel: "Sign up",
    switchText: "Already have an account?",
    switchLabel: "Sign in",
    switchHref: "/sign-in",
  },
};

export default function AuthForm({ type }: { type: AuthType }) {
  const content = formContent[type];
  const isSignup = type === "signup";
  const { register, handleSubmit } = useForm<AuthFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f5ef] px-6 py-12 text-[#171717]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(20,184,166,0.2),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(251,146,60,0.18),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.94),rgba(247,245,239,0.82))]" />
      <div className="absolute -bottom-28 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[#171717]/10 blur-3xl" />

      <section className="relative w-full max-w-md rounded-[2rem] border border-white/70 bg-white/80 p-7 shadow-2xl shadow-black/10 backdrop-blur sm:p-9">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold text-teal-700">
            {content.eyebrow}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            {content.title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#5f5f5f]">
            {content.description}
          </p>
        </div>

        <button
          type="button"
          className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-[#171717]/10 bg-white px-5 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#171717] focus:ring-offset-2"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-base font-bold text-[#4285f4]">
            G
          </span>
          Continue with Google
        </button>

        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#171717]/10" />
          <span className="text-xs font-medium uppercase text-[#777]">or</span>
          <div className="h-px flex-1 bg-[#171717]/10" />
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(() => undefined)}>
          {isSignup ? (
            <label className="block">
              <span className="text-sm font-medium">Name</span>
              <input
                {...register("name")}
                type="text"
                autoComplete="name"
                placeholder="Emmanuel Ameyaw"
                className="mt-2 h-12 w-full rounded-2xl border border-[#171717]/10 bg-white px-4 text-sm outline-none transition placeholder:text-[#9a9a9a] focus:border-[#171717]/35 focus:ring-4 focus:ring-teal-500/10"
              />
            </label>
          ) : null}

          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="mt-2 h-12 w-full rounded-2xl border border-[#171717]/10 bg-white px-4 text-sm outline-none transition placeholder:text-[#9a9a9a] focus:border-[#171717]/35 focus:ring-4 focus:ring-teal-500/10"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Password</span>
            <input
              {...register("password")}
              type="password"
              autoComplete={isSignup ? "new-password" : "current-password"}
              placeholder="Enter your password"
              className="mt-2 h-12 w-full rounded-2xl border border-[#171717]/10 bg-white px-4 text-sm outline-none transition placeholder:text-[#9a9a9a] focus:border-[#171717]/35 focus:ring-4 focus:ring-teal-500/10"
            />
          </label>

          {isSignup ? (
            <label className="block">
              <span className="text-sm font-medium">Confirm password</span>
              <input
                {...register("confirmPassword")}
                type="password"
                autoComplete="new-password"
                placeholder="Confirm your password"
                className="mt-2 h-12 w-full rounded-2xl border border-[#171717]/10 bg-white px-4 text-sm outline-none transition placeholder:text-[#9a9a9a] focus:border-[#171717]/35 focus:ring-4 focus:ring-teal-500/10"
              />
            </label>
          ) : null}

          <button
            type="submit"
            className="h-12 w-full rounded-full bg-[#171717] px-5 text-sm font-semibold text-white shadow-xl shadow-black/15 transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#171717] focus:ring-offset-2"
          >
            {content.submitLabel}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-[#5f5f5f]">
          {content.switchText}{" "}
          <Link
            href={content.switchHref}
            className="font-semibold text-[#171717] underline-offset-4 hover:underline"
          >
            {content.switchLabel}
          </Link>
        </p>
      </section>
    </main>
  );
}
