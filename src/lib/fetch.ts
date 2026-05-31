import { db } from "@/drizzle/db";
import { comments, posts, users } from "@/drizzle/db/schemas/post-schema";
import { asc, count, eq } from "drizzle-orm";

const POSTS_PER_PAGE = 10;

export async function getAllPosts(page = 1) {
  try {
    const allPosts = await db
      .select({
        id: posts.id,
        title: posts.title,
        body: posts.body,
        author: users.name,
        commentsCount: count(comments.id).as("commentsCount"),
      })
      .from(posts)
      .innerJoin(users, eq(posts.userId, users.id))
      .leftJoin(comments, eq(comments.postId, posts.id))
      .groupBy(posts.id, posts.title, users.name, posts.body, users.name)
      .orderBy(asc(posts.id))
      .limit(POSTS_PER_PAGE)
      .offset((page - 1) * POSTS_PER_PAGE);

    return allPosts;
  } catch (error) {
    console.log(error);
  }
}

export async function getPost(id: string) {
  try {
    const [post] = await db
      .select()
      .from(posts)
      .where(eq(posts.id, parseInt(id)))
      .limit(1);

    if (!post) throw new Error("No post found for id", id);

    return post;
  } catch (error) {
    console.log(error);
  }
}
