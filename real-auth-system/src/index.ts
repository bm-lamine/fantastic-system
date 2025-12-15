import { Hono } from "hono";
import { logger } from "hono/logger";
import { env } from "~/env";

const app = new Hono();

app.use(logger());
app.get("/", (c) => c.text("Hello Hono!"));

export default {
  fetch: app.fetch,
  port: env.PORT,
};
