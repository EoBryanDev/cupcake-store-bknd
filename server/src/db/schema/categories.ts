import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { relations } from "drizzle-orm";
import { products } from "./products";

const categories = pgTable("categories", {
  categoryId: uuid("category_id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  description: text("description"),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: uuid("created_by").references(() => users.userId),
});

const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export { categories, categoriesRelations };
