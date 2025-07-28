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
users.get("/:id", async (c) => {
  const userSession = c.get("user");

  if (!userSession) return c.body(null, 401);

  const prisma = getPrisma(c.env.DATABASE_URL);
  const user = await prisma.user.findUnique({
    where: { id: c.req.param("id") },
  });
  return c.json({ user }, 200);
});

export default users;
