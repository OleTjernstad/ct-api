import { Hono } from "hono";
import { Variables } from "@/types/bindings";
// authors.ts
import { getPrisma } from "@/lib/prisma";

const users = new Hono<Variables>();

users.get("/", async (c) => {
  const user = c.get("user");

  if (!user) return c.body(null, 401);

  const prisma = getPrisma(c.env.DATABASE_URL);
  const users = await prisma.user.findMany();
  return c.json({ users }, 200);
});
users.post("/", (c) => c.json("create a user", 201));
users.get("/:id", (c) => c.json(`get ${c.req.param("id")}`));

export default users;
