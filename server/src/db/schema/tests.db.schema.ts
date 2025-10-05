import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

const tests = pgTable("tests", {
  test_id: uuid().primaryKey().defaultRandom(),
  created_at: timestamp("created_at").defaultNow(),
});

export { tests };
