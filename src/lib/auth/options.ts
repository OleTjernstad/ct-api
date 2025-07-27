import { BetterAuthOptions } from "better-auth";
import { username } from "better-auth/plugins";

/**
 * Custom options for Better Auth
 *
 * Docs: https://www.better-auth.com/docs/reference/options
 */
export const betterAuthOptions: BetterAuthOptions = {
  /**
   * The name of the application.
   */
  appName: "Cachetur",
  /**
   * Base path for Better Auth.
   * @default "/api/auth"
   */
  basePath: "/api/auth",
  plugins: [username()],
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      partitioned: true, // New browser standards will mandate this for foreign cookies
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
};
