import { createApp } from "@/core/utils";
import { STATUS_CODE } from "@/lib/status-code";
import UsersService from "./users.service";

const users = createApp()
  .basePath("/users")
  .get("/", async (ctx) => {
    const users = await UsersService.getAll();
    return ctx.json({ users }, STATUS_CODE.OK);
  });

export default users;
