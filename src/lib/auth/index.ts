import { betterAuth } from "better-auth";
import { betterAuthOptions } from "./options";
import { getPrisma } from "../prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";

/**
 * Better Auth Instance
 */
export const auth = (
  env: CloudflareBindings
): ReturnType<typeof betterAuth> => {
  const prisma = getPrisma(env.DATABASE_URL);

  return betterAuth({
    ...betterAuthOptions,
    database: prismaAdapter(prisma, {
      provider: "postgresql",
    }),
    baseURL: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,

    // Additional options that depend on env ...
  });
};
