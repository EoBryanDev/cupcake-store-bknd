import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

const categories = pgTable("categories", {
  categoryId: uuid("category_id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  description: text("description"),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: uuid("created_by").references(() => users.userId),
});

export { categories };
