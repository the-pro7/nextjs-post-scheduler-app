import { GoPlus } from "react-icons/go";
import Button from "@/components/button";
import { formatDate } from "@/lib/utils";
import { getUserPosts } from "@/drizzle/db/queries/queries";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableCaption
} from "@/components/ui/table";

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
            <Table>
              {/* <TableCaption>A list of all your posts</TableCaption> */}
              <TableHeader>
                <TableRow className="p-4">
                  <TableHead>Title</TableHead>
                  <TableHead>Scheduled For</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userPosts.map((post) => (
                  <TableRow key={post.id} className="odd:bg-[#f9f9f9]">
                    <TableCell>{post.title}</TableCell>
                    <TableCell className="text-[#6b6b6b]">
                      {formatDate(post.scheduledFor)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(post.status)}`}
                      >
                        {post.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button>
                        {post.status === "pending"
                          ? "Publish Now"
                          : post.status === "failed"
                            ? "Retry"
                            : "View"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
}
