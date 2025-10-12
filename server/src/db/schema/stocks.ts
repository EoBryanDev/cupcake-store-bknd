import { decimal, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";

const stocks = pgTable("stocks", {
  stockId: uuid("stock_id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type"),
  maxVolume: decimal("max_volume", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: uuid("created_by").references(() => users.userId),
});

export { stocks };
