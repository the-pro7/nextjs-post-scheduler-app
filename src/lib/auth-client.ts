import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_AUTH_BASE_URL as string || "http://localhost:3000",
    // Infer additional fields
    plugins: [inferAdditionalFields<typeof auth>()]
})