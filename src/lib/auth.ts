import { db } from "@/drizzle/db";
import { user } from "@/drizzle/db/schemas";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createAuthMiddleware } from "better-auth/api";
import { eq } from "drizzle-orm";

export const auth = betterAuth({
  // db config
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  // auth config
  emailAndPassword: {
    enabled: true,
  },

  // user config
  user: {
    additionalFields: {
      signinCount: {
        type: "number",
      },
    },
  },
  // Hooks
  hooks: {
    after: createAuthMiddleware(async ({ context }) => {
      const newSession = context.newSession;
      const userId = newSession?.user.id;
      if (!userId) return;

      await db
        .update(user)
        .set({ signinCount: newSession.user.signinCount + 1 })
        .where(eq(user.id, userId));
    }),
  },
});
