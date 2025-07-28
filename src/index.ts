import { Hono } from "hono";
import { Variables } from "./types/bindings";
import { auth } from "./lib/auth";
import authRoute from "./routes/auth";
import { cors } from "hono/cors";
import users from "./routes/users";

const app = new Hono<Variables>();

app.get("/", (c) => c.json({ message: "Cachetur API is running!" }));
app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

app.use(
  "/api/*",
  cors({
    origin: ["http://localhost:3000", "https://cachetur.vercel.app"],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.use("*", async (c, next) => {
  const session = await auth(c.env).api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }
  const user = {
    ...session.user,
    image: session.user.image ?? null,
    username: (session.user as any).username ?? null,
    displayUsername: (session.user as any).displayUsername ?? null,
  };
  c.set("user", user);
  c.set("session", {
    ...session.session,
    ipAddress: session.session.ipAddress ?? null,
    userAgent: session.session.userAgent ?? null,
  });
  return next();
});

app.route("/api/users", users);
app.route("/api/auth", authRoute);

export default app;
