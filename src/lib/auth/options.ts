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
  trustedOrigins: ["http://localhost:3000"],
  plugins: [username()],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      console.log(
        "Sending verification email to",
        user.email,
        "with token",
        token,
        "and URL",
        url
      );
    },
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
