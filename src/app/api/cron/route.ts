export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (
    !authHeader ||
    authHeader !== `Bearer ${process.env.VERCEL_CRON_SECRET}`
  ) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    console.log("Executing cron job...");
    return new Response(
      JSON.stringify({ message: "Cron job executed successfully", success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error: any) {
    console.log("Error executing cron job:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
