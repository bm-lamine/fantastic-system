import { Hono } from "hono";
import { etag } from "hono/etag";
import { logger } from "hono/logger";

const app = new Hono();

app.use(etag(), logger());

app.get("/", (c) => c.text("Hono!"));

export default app;
