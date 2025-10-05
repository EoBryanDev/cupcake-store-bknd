import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

const orders = pgTable("orders", {
  orderId: uuid("order_id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.userId)
    .notNull(),
  receiverName: text("receiver_name").notNull(),
  street: text("street").notNull(),
  number: text("number").notNull(),
  complement: text("complement"),
  referencePoint: text("reference_point"),
  neighborhood: text("neighborhood").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  country: text("country").notNull(),
  zipCode: text("zip_code").notNull(),
  phoneNumber: text("phone_number"),
  shippingCompany: text("shipping_company"),
  shippingTax: integer("shipping_tax"),
  discount: integer("discount"),
  totalPriceInCents: integer("total_price_in_cents").notNull(),
  status: text("status")
    .$type<
      "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELED" | "FAILED"
    >()
    .default("PENDING")
    .notNull(),
  approval: text("approval")
    .$type<"APPROVED" | "PENDING" | "REJECTED">()
    .default("PENDING"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export { orders };
