import {
  boolean,
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { products } from "./products";
import { users } from "./users";
import { relations } from "drizzle-orm";

const productVariants = pgTable("product_variants", {
  productVariantId: uuid("product_variant_id").primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .references(() => products.productId)
    .notNull(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  color: text("color"),
  weight: decimal("weight", { precision: 10, scale: 2 }),
  width: decimal("width", { precision: 10, scale: 2 }),
  height: decimal("height", { precision: 10, scale: 2 }),
  size: text("size"),
  priceInCents: integer("price_in_cents").notNull(),
  rawMaterial: text("raw_material"),
  imageUrl: text("image_url"),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: uuid("created_by").references(() => users.userId),
});

const productVariantsRelations = relations(productVariants, ({ one }) => ({
  product: one(products, {
    fields: [productVariants.productId],
    references: [products.productId],
  }),
  creator: one(users, {
    fields: [productVariants.createdBy],
    references: [users.userId],
  }),
}));

export { productVariants, productVariantsRelations };
