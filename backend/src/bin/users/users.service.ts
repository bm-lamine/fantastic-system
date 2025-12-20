import redis from "@/core/redis";
import { db, schema } from "@/db";
import { eq } from "drizzle-orm";
import { USER_KEY, USER_TTL, USERS_KEY, USERS_TTL } from "./users.keys";
import type { InsertUser, User } from "./users.model";
import UsersModel from "./users.model";

export default class UsersService {
  static query = db.select().from(schema.users).$dynamic();

  static async getAll() {
    const cache = await redis.get(USERS_KEY);

    if (cache) {
      const parsed = UsersModel.selectMany.safeParse(JSON.parse(cache));
      if (parsed.success) return parsed.data;
    }

    const users = await this.query.execute();
    await redis.setex(USERS_KEY, USERS_TTL, JSON.stringify(users));
    return users;
  }

  static async getOneByEmail(email: string) {
    const [found] = await this.query
      .where(eq(schema.users.email, email))
      .limit(1);
    return found;
  }

  static async insertOne(data: InsertUser) {
    const [insert] = await db.insert(schema.users).values(data).returning();
    return insert;
  }

  static async cacheOne(user: User) {
    await Promise.all([
      redis.del(USERS_KEY),
      redis.setex(USER_KEY(user.id), USER_TTL, JSON.stringify(user)),
    ]);
  }
}
