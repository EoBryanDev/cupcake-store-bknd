import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const users = pgTable("users", {
  userId: uuid("user_id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phoneNumber: text("phone_number"),
  legalId: text("legal_id").unique(),
  birthDate: timestamp("birth_date"),
  email: text("email").notNull().unique(),
  role: text("role")
    .$type<"ADMIN" | "CUSTOMER">()
    .default("CUSTOMER")
    .notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export { users };
