import { pgTable, text, timestamp, index } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

// Tracks each analysis a user performs, so we can enforce per-tier usage limits.
export const analysisLog = pgTable(
  "analysis_log",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("analysis_log_userId_idx").on(table.userId)]
);
