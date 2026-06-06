"use server";

import { eq } from "drizzle-orm";
import { db } from "..";
import { posts } from "../schemas";

type Payload = Omit<
  typeof posts.$inferInsert,
  "id" | "createdAt" | "updatedAt" | "status"
>;

const getPendingPosts = async (userId: string) => {
  try {
    const posts = await db.query.posts.findMany({
      where: (posts, { eq, and }) =>
        and(eq(posts.status, "pending"), eq(posts.userId, userId)),
      limit: 5,
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  } catch (error) {
    console.error("Error fetching pending posts:", error);
    return [];
  }
};

const getUserPosts = async (userId: string) => {
  try {
    const posts = await db.query.posts.findMany({
      where: (posts, { eq }) => eq(posts.userId, userId),
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return [];
  }
};

// Create
const createNewPost = async (userId: string, payload: Payload) => {
  // const {title, body, scheduledFor, imageUrl} = payload;
  try {
    const newPost = await db
      .insert(posts)
      .values({ ...payload, userId } as typeof posts.$inferInsert)
      .returning({ id: posts.id });

    console.log(`Post created with ID: ${newPost[0].id}`);
  } catch (error) {
    console.error(`An error occuured while creating post ${error}`);
  }
};

export { getPendingPosts, getUserPosts, createNewPost };
