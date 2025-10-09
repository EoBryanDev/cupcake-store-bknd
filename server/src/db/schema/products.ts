import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { categories } from "./categories";
import { users } from "./users";
import { productVariants } from "./product-variants";
import { relations } from "drizzle-orm";

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

const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.categoryId],
  }),
  creator: one(users, {
    fields: [products.createdBy],
    references: [users.userId],
  }),
  variants: many(productVariants),
}));

export { products, productsRelations };
