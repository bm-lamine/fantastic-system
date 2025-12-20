import { schema } from "@/db";
import type { InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import z from "zod";

export default class UsersModel {
  static selectOne = createSelectSchema(schema.users, {
    id: z.nanoid(),
    email: z.email(),
  });

  static selectMany = z.array(this.selectOne);

  static insertOne = createInsertSchema(schema.users, {
    email: z.email(),
  }).omit({ id: true });
}

export type User = InferSelectModel<typeof schema.users>;
export type InsertUser = z.infer<typeof UsersModel.insertOne>;
