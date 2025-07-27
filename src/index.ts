import { Hono } from "hono";
import { auth } from "./lib/auth";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/", (c) => c.json({ message: "Cachetur API is running!" }));
app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

app.use(
  "/api/*",
  cors({
    origin: "http://localhost:3000",
    allowHeaders: ["Access-Control-Allow-Credentials", "Content-Type"],
    credentials: true,
  })
);

app.on(["GET", "POST"], "/api/auth/*", (c) => {
  return auth(c.env).handler(c.req.raw);
});
export default app;
