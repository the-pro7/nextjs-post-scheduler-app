export default function UpcomingPosts() {
  return (
    <div className="rounded-3xl border border-white/70 bg-white/75 p-6 shadow-xl shadow-black/5 backdrop-blur sm:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-[#171717]">
          Upcoming Posts
        </h2>
        <span className="h-6 w-6 aspect-square flex items-center justify-center rounded-full bg-slate-100 text-xl font-semibold border border-white/70">
          {/* {posts.length} */}0
        </span>
      </div>
    </div>
  );
}
