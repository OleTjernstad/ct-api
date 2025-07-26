import { PrismaClient } from "@/generated/prisma";
import { betterAuth } from "better-auth";
import { betterAuthOptions } from "@/lib/auth/options";
import { prismaAdapter } from "better-auth/adapters/prisma";

const { DATABASE_URL, BETTER_AUTH_URL, BETTER_AUTH_SECRET } = process.env;

const prisma = new PrismaClient();

export const auth: ReturnType<typeof betterAuth> = betterAuth({
  ...betterAuthOptions,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: BETTER_AUTH_URL,
  secret: BETTER_AUTH_SECRET,
});
