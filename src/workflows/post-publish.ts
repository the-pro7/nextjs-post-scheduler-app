import { getPendingPosts } from "@/drizzle/db/queries/queries";
import { sleep } from "workflow";

export async function handlePostPublish(userId: string) {
    "use workflow";

    const pendingPosts = await getPendingPostsStep(userId);

    // Sleep time with should be post's scheduled time minus current time
    for (const post of pendingPosts) {
        const sleepTime = post.scheduledFor.getTime() - Date.now();

        if (sleepTime > 0) {
            await sleep(sleepTime);
        }

        // Here you would add the logic to publish the post, e.g., update its status in the database
        console.log(`Post with ID ${post.id} is now published!`);
       
        return {userId, postId: post.id}
    }



}

async function getPendingPostsStep(userId: string) {
    "use step"

    return await getPendingPosts(userId)
}



