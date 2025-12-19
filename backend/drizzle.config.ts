import { env } from "@/core/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: { url: env.DATABASE_URL },
  schema: "./src/db/schema.ts",
  out: "./out/migrations",
  tablesFilter: ["*_tbl"],
});
