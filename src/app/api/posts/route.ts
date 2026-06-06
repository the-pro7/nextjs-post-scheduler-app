import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/drizzle/db";
import { posts } from "@/drizzle/db/schemas";
import { randomUUID } from "crypto";
import { z } from "zod";

const createPostSchema = z.object({
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
  scheduledFor: z.preprocess(
    (value) => {
      if (typeof value === "string" && value.trim().length > 0) {
        const dateValue = new Date(value);
        return Number.isNaN(dateValue.getTime()) ? value : dateValue;
      }
      return value;
    },
    z.date({ error: "Schedule date and time are required" }),
  ),
});

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user?.id) {
      return Response.json(
        { message: "Authentication required" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const parsed = createPostSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: z.treeifyError(parsed.error).properties },
        { status: 400 },
      );
    }

    const newPost = await db
      .insert(posts)
      .values({
        id: randomUUID(),
        userId: session.user.id,
        title: parsed.data.title,
        body: parsed.data.body,
        imageUrl: parsed.data.imageUrl || "",
        scheduledFor: parsed.data.scheduledFor,
      })
      .returning({ id: posts.id });

    return Response.json(
      { message: "Post created successfully", id: newPost[0]?.id },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create post", error);
    return Response.json({ message: "Unable to create post" }, { status: 500 });
  }
}
