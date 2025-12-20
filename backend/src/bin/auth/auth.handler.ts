import UsersService from "@/bin/users/users.service";
import { createApp, createError, parser } from "@/core/utils";
import { STATUS_CODE } from "@/lib/status-code";
import { auth_ee } from "./auth.events";
import AuthModel from "./auth.model";
import AuthService from "./auth.service";

const auth = createApp()
  .basePath("/auth")
  .post("/register", parser("json", AuthModel.register), async (ctx) => {
    const values = ctx.req.valid("json");
    const found = await UsersService.getOneByEmail(values.email);

    if (found) {
      return ctx.json(
        createError([{ path: ["email"], message: "User Already Exist" }]),
        STATUS_CODE.UNPROCESSABLE_ENTITY
      );
    }

    const newUser = await UsersService.insertOne({
      ...values,
      password: await AuthService.hash(values.password),
    });

    if (!newUser) {
      return ctx.json(
        { message: "Internal Server Error" },
        STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }

    await auth_ee.emitAsync(ctx, "user:register", newUser);

    return ctx.json(
      {
        user: { ...newUser, password: null },
        message: "User Created Successfully",
      },
      STATUS_CODE.OK
    );
  });

export default auth;
