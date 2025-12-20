import { type User } from "@/bin/users/users.model";
import UsersService from "@/bin/users/users.service";
import { createEmitter } from "@hono/event-emitter";
import AuthService from "./auth.service";

export const auth_ee = createEmitter<AuthEvents>({
  "user:register": [
    async (ctx, payload) => await UsersService.cacheOne(payload),
    async (ctx, payload) =>
      await AuthService.createEmailVerification(payload.email),
  ],
});

export type AuthEvents = { "user:register": User };
