import z from "zod";

const createNoteSchema = z.object({
  title: z
    .string({ error: "Title must be a string" })
    .min(8, { error: "Title must be 8 at most" })
    .trim()
    .nonoptional(),
  expiresAt: z.date({ error: "Provide a valid date" }).nonoptional(),
});

export async function GET(req: Request) {
  return Response.json({ message: "Get all notes" }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body == null) {
      return Response.json({ message: "Body required" }, { status: 400 });
    }

    const validatedData = createNoteSchema.safeParse(body);

    if (!validatedData.success) {
      return Response.json(
        { error: z.treeifyError(validatedData.error).properties },
        { status: 400 },
      );
    }

    return Response.json({ message: "Create new post" }, { status: 201 });
  } catch {
    return Response.json({ message: "Something happened" }, { status: 500 });
  }
}
