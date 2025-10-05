import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { orders } from "./orders";
import { productVariants } from "./product-variants";

const orderItems = pgTable("order_items", {
  orderItemId: uuid("order_item_id").primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .references(() => orders.orderId)
    .notNull(),
  productVariantId: uuid("product_variant_id")
    .references(() => productVariants.productVariantId)
    .notNull(),
  name: text("name").notNull(),
  color: text("color"),
  imageUrl: text("image_url"),
  quantity: integer("quantity").notNull(),
  priceInCents: integer("price_in_cents").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export { orderItems };
