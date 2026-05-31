import { drizzle } from "drizzle-orm/neon-http";
import { seed, reset } from "drizzle-seed";
import "dotenv/config";
import * as schema from "./schemas/post-schema";

if (!process.env.DATABASE_URL) throw new Error("No env found");

async function seedDb() {
  const db = drizzle(process.env.DATABASE_URL as string);
  await reset(db, schema);
  await seed(db, schema).refine((f) => ({
    users: {
      count: 10,
      columns: {
        name: f.fullName(),
        email: f.email(),
      },
      with: {
        posts: 10,
        comments: 10,
      },
    },
  }));
}

seedDb();
