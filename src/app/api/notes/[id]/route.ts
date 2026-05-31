import z from "zod";
type NotesRouteParams = {
  readonly params: Promise<{ id: string }>;
};

const noteIdSchema = z
  .string({ error: "Invalid note id" })
  .trim()
  .min(1, { error: "Invalid note id" });

const updateNoteSchema = z
  .object({
    title: z
      .string({ error: "Title must be a string" })
      .min(8, { error: "Title must be at least 8 characters" })
      .trim()
      .optional(),
    expiresAt: z.coerce.date({ error: "Provide a valid date" }).optional(),
  })
  .strict();

export async function GET(req: Request, { params }: NotesRouteParams) {
  const { id } = await params;
  return Response.json({ message: `get note ${id}` }, { status: 200 });
}

export async function PATCH(req: Request, { params }: NotesRouteParams) {
  const { id } = await params;
  const validatedId = noteIdSchema.safeParse(id);

  if (!validatedId.success) {
    return Response.json({ message: "Invalid note id" }, { status: 400 });
  }

  try {
    const body = await req.json();

    if (
      body == null ||
      typeof body !== "object" ||
      Array.isArray(body) ||
      Object.keys(body).length === 0
    ) {
      return Response.json(
        { message: "At least one valid field is required" },
        { status: 400 },
      );
    }

    const validatedData = updateNoteSchema.safeParse(body);

    if (!validatedData.success) {
      return Response.json(
        { error: z.treeifyError(validatedData.error).errors },
        { status: 400 },
      );
    }

    return Response.json(
      {
        message: `Alter resource ${validatedId.data}`,
        note: validatedData.data,
      },
      { status: 200 },
    );
  } catch {
    return Response.json({ message: "An error occurred"  }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: NotesRouteParams) {
  const { id } = await params;
  return Response.json({ message: `Delete resource ${id}` }, { status: 200 });
}