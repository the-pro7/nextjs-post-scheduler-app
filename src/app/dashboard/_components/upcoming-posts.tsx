import { getPendingPosts } from "@/drizzle/db/queries/queries";

function formatPostDate(date: Date | null) {
  if (!date) {
    return "No date";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(date);
}

function DatePill({ label, value }: { label: string; value: Date | null }) {
  return (
    <div className="rounded-2xl border border-[#171717]/10 bg-[#f7f5ef] px-3 py-2">
      <p className="text-[11px] font-bold uppercase tracking-wide text-[#777]">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-[#171717]">
        {formatPostDate(value)}
      </p>
    </div>
  );
}

export default async function UpcomingPosts({ userId }: { userId: string }) {
  const posts = await getPendingPosts(userId);

  return (
    <div className="rounded-3xl border border-white/70 bg-white/75 p-6 shadow-xl shadow-black/5 backdrop-blur sm:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-[#171717]">
          Upcoming Posts
        </h2>
        <span className="flex h-7 w-7 aspect-square items-center justify-center rounded-full border border-white/70 bg-slate-100 text-sm font-bold text-[#171717]">
          {posts.length}
        </span>
      </div>

      {posts.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-[#171717]/10 bg-white/70 px-5 py-8 text-center">
          <p className="font-semibold text-[#171717]">No pending posts</p>
          <p className="mt-2 text-sm leading-6 text-[#6b6b6b]">
            Posts waiting to be published will show up here.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-2xl border border-[#171717]/10 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="truncate text-base font-semibold text-[#171717]">
                    {post.title}
                  </h3>
                  <p className="mt-2 max-h-12 overflow-hidden text-sm leading-6 text-[#6b6b6b]">
                    {post.body}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  Pending
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-3 border-[#171717]/10 border-t pt-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="grid gap-2 sm:grid-cols-2">
                  <DatePill label="Scheduled for" value={post.scheduledFor} />
                  <DatePill label="Created at" value={post.createdAt} />
                </div>

                <button
                  type="button"
                  className="shrink-0 rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Publish now
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
