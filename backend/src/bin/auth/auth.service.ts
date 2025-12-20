import { mailer } from "@/core/mailer";
import redis from "@/core/redis";
import { nanoid } from "nanoid";
import {
  EMAIL_VERIFICATION_KEY,
  EMAIL_VERIFICATION_TTL,
} from "../users/users.keys";

export default class AuthService {
  static hash = async (plain: string) => await Bun.password.hash(plain);

  static verify = async (plain: string, hash: string) =>
    await Bun.password.verify(plain, hash);

  static async createEmailVerification(email: string) {
    const otp = nanoid(6);

    await redis.setex(
      EMAIL_VERIFICATION_KEY(email),
      EMAIL_VERIFICATION_TTL,
      await Bun.password.hash(otp)
    );

    await mailer.sendMail({
      from: "<Mohammed>",
      to: email,
      subject: "Email Verification",
      html: `<h1>your otp is ${otp}</h1>`,
    });
  }
}
