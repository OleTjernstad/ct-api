import { PrismaClient } from "@/generated/prisma";
import { betterAuth } from "better-auth";
import { betterAuthOptions } from "./options";
import { prismaAdapter } from "better-auth/adapters/prisma";

/**
 * Better Auth Instance
 */
export const auth = (
  env: CloudflareBindings
): ReturnType<typeof betterAuth> => {
  const prisma = new PrismaClient();

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
