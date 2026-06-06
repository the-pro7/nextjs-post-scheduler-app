"use client";

import { formContent } from "@/lib/constants";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

type AuthType = "signin" | "signup";

const signInSchema = z.object({
  email: z.email({ error: "Invalid email address" }).nonoptional(),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" })
    .nonoptional(),
});

// Extend signin schema
const signUpSchema = signInSchema
  .extend({
    name: z
      .string({ error: "Name is required" })
      .min(8, { error: "Name must be at least 8 characters long" })
      .nonoptional(),
    email: z.email({ error: "Email address required" }).nonoptional(),
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters long" })
      .nonoptional(),
    confirmPassword: z
      .string()
      .min(8, { error: "Password must be at least 8 characters long" })
      .nonoptional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type AuthFormValues = z.infer<typeof signInSchema> &
  Partial<Pick<z.infer<typeof signUpSchema>, "name" | "confirmPassword">>;

export default function AuthForm({ type }: { type: AuthType }) {
  const content = formContent[type];
  const isSignup = type === "signup";

  const currentSchema = isSignup ? signUpSchema : signInSchema;

  const {
    register,
    handleSubmit: submit,
    setError,
    formState: { errors, isSubmitting},
  } = useForm<AuthFormValues>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  async function handleSubmit(values: AuthFormValues) {
    const { name, email, password } = values;

    try {
      if (isSignup) {
        await authClient.signUp.email(
          {
            name: name as string,
            email,
            password,
            signinCount: 0,
            callbackURL: "/",
          },
          {
            onRequest: () => console.log("Submitting form..."),
            onSuccess: () => {
              console.log("Signup successful");
              router.push("/dashboard");
            },
            onError: (ctx) => {
              if (
                ctx.error.status === 422 ||
                ctx.error.code === "EMAIL_ALREADY_EXISTS"
              ) {
                console.log(
                  "This is email already exists, do you want to signin instead?",
                );
              } 

              if(ctx.error.status === 500) {
                setError("root", {
                  message: `Failed to ${type}`
                })
              }

              console.error(ctx.error)
            },
          },
        );
      } else {
        await authClient.signIn.email(
          {
            email,
            password,
            callbackURL: "/dashboard",
          },
          {
            onRequest: () => console.log("Submitting form..."),
            onSuccess: () => {
              console.log("Signin successful");
              router.push("/dashboard");
            },
            onError: (ctx) => {
               if(ctx.error.status === 500) {
                setError("root", {
                  message: `Failed to ${type}, check your metwork.`
                })
              }
              console.error("An error occurred", ctx.error.message);
            },
          },
        );
      }
    } catch (error) {
      console.error("An unknown error occurred when submitting form...", error);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f5ef] px-6 py-12 text-[#171717]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(20,184,166,0.2),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(251,146,60,0.18),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.94),rgba(247,245,239,0.82))]" />
      <div className="absolute -bottom-28 left-1/2 h-72 w-xl -translate-x-1/2 rounded-full bg-[#171717]/10 blur-3xl" />

      <section className="relative w-full max-w-md rounded-4xl border border-white/70 bg-white/80 p-7 shadow-2xl shadow-black/10 backdrop-blur sm:p-9">
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
          disabled={isSubmitting}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-[#171717]/10 bg-white px-5 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#171717] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#171717]/10" />
          <span className="text-xs font-medium uppercase text-[#777]">or</span>
          <div className="h-px flex-1 bg-[#171717]/10" />
        </div>

        <form className="space-y-5" onSubmit={submit(handleSubmit)}>
          <span className="validation-error-message text-center text-xl">
            {errors.root?.message}
          </span>
          {isSignup ? (
            <label className="block">
              <span className="text-sm font-medium">Name</span>
              <input
                {...register("name")}
                type="text"
                autoComplete="name"
                placeholder="Emmanuel Ameyaw"
                className="input-box"
              />
              <span className="text-sm font-medium mt-1">
                Please enter your full name (at least 8 characters)
              </span>
              <br />
              {/* Validation error message*/}
              <span className="validation-error-message">
                {errors.name?.message}
              </span>
            </label>
          ) : null}

          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="input-box"
            />
            {/* Validation error message*/}
            <span className="validation-error-message">
              {errors.email?.message}
            </span>
          </label>

          <label className="block">
            <span className="text-sm font-medium">Password</span>
            <input
              {...register("password")}
              type="password"
              autoComplete={isSignup ? "new-password" : "current-password"}
              placeholder="Enter your password"
              className="input-box"
            />
            {/* Validation error message*/}
            <span className="validation-error-message">
              {errors.password?.message}
            </span>
          </label>

          {isSignup ? (
            <label className="block">
              <span className="text-sm font-medium">Confirm password</span>
              <input
                {...register("confirmPassword")}
                type="password"
                autoComplete="new-password"
                placeholder="Confirm your password"
                className="input-box"
              />
              {/* Validation error message*/}
              <span className="validation-error-message">
                {errors.confirmPassword?.message}
              </span>
            </label>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-full bg-[#171717] px-5 text-sm font-semibold text-white shadow-xl shadow-black/15 transition hover:-translate-y-0.5 hover:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-[#171717] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Continuing..." : content.submitLabel}
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
