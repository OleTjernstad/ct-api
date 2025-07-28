import { Hono } from "hono";
import { Variables } from "@/types/bindings";
import { auth } from "@/lib/auth";

const authRoute = new Hono<Variables>();

authRoute.on(["GET", "POST"], "/*", (c) => {
  return auth(c.env).handler(c.req.raw);
});

export default authRoute;
