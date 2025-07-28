import { Session, User } from "@/generated/prisma";

export type Variables = {
  Bindings: Env;
  Variables: {
    user: User | null;
    session: Session | null;
  };
};
