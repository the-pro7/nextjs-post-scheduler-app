"use server";

import { db } from "..";
import { unstable_cache } from "next/cache";

const getPendingPosts = unstable_cache(async () => {
  try {
    const posts = await db.query.posts.findMany({
      where: (posts, { eq }) => eq(posts.status, "pending"),
    });
    return posts;
  } catch (error) {
    console.error("Error fetching pending posts:", error);
    return [];
  }
}
)


export {
    getPendingPosts
}