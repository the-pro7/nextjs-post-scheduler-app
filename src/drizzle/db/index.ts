import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schemas";

if (!process.env.DATABASE_URL) throw new Error("No env found");

const sql = neon(process.env.DATABASE_URL as string);
export const db = drizzle({ client: sql, logger: true, schema });