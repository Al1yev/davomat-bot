import { Middleware, session } from "grammy";
import { Context } from "../types/context";

export function getSessionKey(ctx: any) {
  return ctx.chat?.id.toString();
}

export const middleware = (): Middleware<Context> =>
  session({
    initial: () => ({}),
    getSessionKey,
  });
