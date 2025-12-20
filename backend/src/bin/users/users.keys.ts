export const USERS_KEY = "users";
export const USERS_TTL = 7 * 24 * 60 * 60;

export const USER_KEY = (id: string) => `users:${id}`;
export const USER_TTL = 15 * 60;

export const EMAIL_VERIFICATION_KEY = (email: string) =>
  `email_verification:${email}`;
export const EMAIL_VERIFICATION_TTL = 15 * 60;
