"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";

const postCreateSchema = z.object({
  title: z
    .string({ error: "Title is required" })
    .min(8, { error: "Title must contain at least 8 characters" })
    .max(100, { error: "Title cannot exceed 100 characters" }),
  body: z
    .string({ error: "Body is required" })
    .min(30, { error: "Post body must contain at least 30 characters" }),
  imageUrl: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .transform((value) => {
      if (!value || typeof value !== "string") return undefined;
      const trimmed = value.trim();
      return trimmed.length ? trimmed : undefined;
    })
    .refine((value) => value === undefined || /^https?:\/\//.test(value), {
      message: "Image URL must be a valid https:// or http:// URL",
    }),
  scheduledFor: z
    .string({ error: "Scheduled date and time are required" })
    .min(1, { error: "Scheduled date and time are required" }),
});

export type NewPostFormValues = z.input<typeof postCreateSchema>;

export default function NewPostPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<NewPostFormValues>({
    resolver: zodResolver(postCreateSchema),
    defaultValues: {
      title: "",
      body: "",
      imageUrl: "",
      scheduledFor: "",
    },
  });

  async function onSubmit(values: NewPostFormValues) {
    setError("root", {message: ""});
    console.log(JSON.stringify(values));

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        cache: "no-store",
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        const errorMessage =
          result?.error?.message || result?.message || "Unable to create post.";
        setError("root", {
            message: String(errorMessage)
        })
        return;
      }

      router.push("/dashboard/posts");
    } catch (error) {
      setError("root", {
        message: "Something went wrong while creating the post."
      });
      console.error("Post creation failed:", error);
    }
  }

  return (
    <main className="relatve flex items-center justify-center">
      <div className="w-full max-w-3xl rounded-[32px] border border-[#171717]/10 bg-white p-8 shadow-xl shadow-black/5 sm:p-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            New post
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
            Schedule a new post
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Fill in the post details below. The form values are strongly typed
            and can be re-used with Drizzle on the backend.
          </p>
        </div>

        <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
          {errors.root ? (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {errors.root.message}
            </div>
          ): null}

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Title</span>
            <input
              {...register("title")}
              type="text"
              placeholder="Write a clear post title"
              className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
            <span className="min-h-5 text-sm text-rose-600">
              {errors.title?.message}
            </span>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">Body</span>
            <textarea
              {...register("body")}
              rows={6}
              placeholder="Add the content for this post"
              className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
            <span className="min-h-5 text-sm text-rose-600">
              {errors.body?.message}
            </span>
          </label>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">
                Schedule date & time
              </span>
              <input
                {...register("scheduledFor")}
                type="datetime-local"
                className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
              <span className="min-h-[1.25rem] text-sm text-rose-600">
                {errors.scheduledFor?.message}
              </span>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">
                Image URL
              </span>
              <input
                {...register("imageUrl")}
                type="url"
                placeholder="https://example.com/image.png"
                className="rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
              <span className="min-h-[1.25rem] text-sm text-rose-600">
                {errors.imageUrl?.message}
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-3xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Saving post..." : "Save post"}
          </button>
        </form>
      </div>
    </main>
  );
}
