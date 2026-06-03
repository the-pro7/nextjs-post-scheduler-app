import { GoPlus } from "react-icons/go";
import Button from "@/components/button";
import { formatDate } from "@/lib/utils";
import { getUserPosts } from "@/drizzle/db/queries/queries";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

function getStatusClasses(status: string) {
  const map: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700",
    published: "bg-emerald-50 text-emerald-700",
    failed: "bg-rose-50 text-rose-700",
  };

  return map[status] ?? "bg-slate-100 text-slate-700";
}

export default async function DashboardPostsPage() {
  const user = await auth.api
    .getSession({ headers: await headers() })
    .then((session) => session?.user);
  const userPosts = await getUserPosts(user?.id as string);

  return (
    <div className="mx-auto w-full max-w-6xl">
      <header className="page-header">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-wide">Posts</h1>
            <p className="page-subtext">
              Track all posts in one place. Manage, publish and retry failed
              posts.
            </p>
          </div>
          <Button
            type="button"
            className="mt-0! inline-flex w-full shrink-0 items-center justify-center gap-2 sm:w-auto"
          >
            <GoPlus className="text-xl" aria-hidden="true" />
            <span>New post</span>
          </Button>
        </div>
      </header>

      <main className="mt-8">
        {userPosts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#171717]/10 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#171717]">
              No posts yet
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6b6b6b]">
              You don&apos;t have any posts yet. Use the button above to create
              a new post and start tracking your content.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-[#171717]/10 bg-white shadow-sm">
            <div className="grid gap-4 border-b border-[#171717]/10 px-6 py-4 text-sm font-semibold text-[#4a4a4a] sm:grid-cols-[2fr_140px_160px_140px]">
              <span>Post</span>
              <span className="hidden sm:block">Status</span>
              <span className="hidden md:block">Scheduled</span>
              <span>Created</span>
              <span>Action</span>
            </div>

            <div>
              {userPosts.map((post) => (
                <article
                  key={post.id}
                  className="border-b border-[#171717]/10 px-6 py-5 last:border-b-0"
                >
                  <div className="grid gap-4 sm:grid-cols-[1fr_140px_160px_140px]">
                    <div>
                      <p className="text-base font-semibold text-[#171717]">
                        {post.title}
                      </p>
                      <p className="mt-2 max-h-12 overflow-hidden text-sm leading-6 text-[#6b6b6b]">
                        {post.body}
                      </p>
                    </div>

                    <div className="flex items-center">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                          post.status,
                        )}`}
                      >
                        {post.status}
                      </span>
                    </div>

                    <div className="hidden items-center md:flex">
                      <p className="text-sm text-[#4a4a4a]">
                        {formatDate(post.scheduledFor)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm text-[#4a4a4a]">
                        {formatDate(post.createdAt)}
                      </p>
                      <Button
                        type="button"
                        className="inline-flex h-fit rounded-full px-3 py-1 text-sm font-semibold"
                      >
                        {post.status === "failed"
                          ? "Retry"
                          : post.status === "pending"
                            ? "Publish"
                            : "View"}
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
