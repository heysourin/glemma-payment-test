import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/schema.ts",
  out: "./drizzle", //where is the migration
  dbCredentials: {
    // database: "database",
    // resourceArn: "resourceArn",
    // secretArn: "secretArn",
    url: process.env.DATABASE_URL!,
  },
});
