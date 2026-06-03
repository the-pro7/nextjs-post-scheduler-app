"use server";

import { db } from "..";

const getPendingPosts = async (userId: string) => {
  try {
    const posts = await db.query.posts.findMany({
      where: (posts, { eq, and }) => and(eq(posts.status, "pending"), eq(posts.userId, userId)),
      limit: 5,
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });
    
    return posts;
  } catch (error) {
    console.error("Error fetching pending posts:", error);
    return [];
  }
}

const getUserPosts = async (userId: string) => {
  try {
    const posts = await db.query.posts.findMany({
      where: (posts, {eq}) => eq(posts.userId, userId),
      orderBy: (posts, {desc}) => desc(posts.createdAt),
    })

    return posts;
  } catch(error) {
    console.error("Error fetching user posts:", error)
    return []
  }
}



export {
    getPendingPosts,
    getUserPosts
}