import postgres from "postgres";
import { env } from "../env";
import { drizzle } from "drizzle-orm/postgres-js";
import { schema } from "../db/schema";

export const sql = postgres(
  env.SERVER_ENV === "DEV" ? env.POSTGRES_URL_DEV : env.POSTGRES_URL,
);
export const db = drizzle(sql, {
  schema,
  casing: "snake_case",
});
