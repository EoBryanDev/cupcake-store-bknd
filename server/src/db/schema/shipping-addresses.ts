import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

const shippingAddresses = pgTable("shipping_addresses", {
  shippingAddrId: uuid("shipping_addr_id").primaryKey().defaultRandom(),
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
  mainAddress: boolean("main_address").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export { shippingAddresses };
