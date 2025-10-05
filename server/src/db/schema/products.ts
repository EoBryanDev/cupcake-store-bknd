import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { categories } from "./categories";
import { users } from "./users";

const products = pgTable("products", {
  productId: uuid("product_id").primaryKey().defaultRandom(),
  categoryId: uuid("category_id")
    .references(() => categories.categoryId)
    .notNull(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  unit: text("unit"),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: uuid("created_by").references(() => users.userId),
});

export { products };
