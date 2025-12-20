import auth from "@/bin/auth/auth.handler";
import users from "@/bin/users/users.handler";
import { env } from "@/core/env";
import { createApp } from "@/core/utils";
import { showRoutes } from "hono/dev";
import { etag } from "hono/etag";
import { logger } from "hono/logger";

const app = createApp()
  .basePath("/api")
  .use(etag(), logger())
  .route("/", auth)
  .route("/", users);

showRoutes(app);

export default {
  fetch: app.fetch,
  port: env.APP_PORT,
};
