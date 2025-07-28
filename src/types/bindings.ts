import { Session, User } from "@/generated/prisma";

export type Variables = {
  Bindings: CloudflareBindings;
  Variables: {
    user: User | null;
    session: Session | null;
  };
};
