import type { JwtPayload } from "@/bin/auth/auth.model";
import { STATUS_CODE } from "@/lib/status-code";
import { zValidator } from "@hono/zod-validator";
import { Hono, type ValidationTargets } from "hono";
import type { JwtVariables } from "hono/jwt";
import type { ZodType } from "zod";

export const createApp = () =>
  new Hono<{
    Variables: JwtVariables<JwtPayload>;
  }>();

export const createError = (errors: Array<ApiError>) => ({ errors });

export const parser = function <
  T extends ZodType,
  Target extends keyof ValidationTargets
>(target: Target, schema: T) {
  return zValidator(target, schema, (result, ctx) => {
    if (!result.success)
      return ctx.json(
        createError(
          result.error.issues.map((issue) => ({
            path: issue.path,
            message: issue.message,
          }))
        ),
        STATUS_CODE.UNPROCESSABLE_ENTITY
      );
  });
};

export type ApiError = {
  path?: readonly PropertyKey[];
  message: string;
};
