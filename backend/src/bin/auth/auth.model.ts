import z from "zod";

export default class AuthModel {
  static register = z.object({
    email: z.email(),
    password: z.string(),
  });
}

export type RegisterModel = z.infer<typeof AuthModel.register>;

export type JwtPayload = {
  sub: string;
  email: string;
};
