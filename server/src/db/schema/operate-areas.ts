import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

const operateAreas = pgTable("operate_areas", {
  operAreasId: uuid("oper_areas_id").primaryKey().defaultRandom(),
  shippingCompany: text("shipping_company"),
  avgDeliveryTime: text("avg_delivery_time"),
  shippingTax: integer("shipping_tax"),
  city: text("city").notNull(),
  state: text("state").notNull(),
  country: text("country").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: uuid("created_by").references(() => users.userId),
});

export { operateAreas };
