import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { stocks } from "./stocks";
import { productVariants } from "./product-variants";
import { users } from "./users";

const stockFluxes = pgTable("stock_fluxes", {
  stockFluxId: uuid("stock_flux_id").primaryKey().defaultRandom(),
  stockId: uuid("stock_id")
    .references(() => stocks.stockId)
    .notNull(),
  productVariantId: uuid("product_variant_id")
    .references(() => productVariants.productVariantId)
    .notNull(),
  movementType: text("movement_type")
    .$type<"IN" | "OUT">()
    .default("IN")
    .notNull(),
  quantity: integer("quantity").notNull(),
  nature: text("nature")
    .$type<"PURCHASE" | "SALE" | "ADJUSTMENT" | "RETURN">()
    .default("PURCHASE")
    .notNull(),
  priceInCents: integer("price_in_cents"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: uuid("created_by").references(() => users.userId),
});

export { stockFluxes };
