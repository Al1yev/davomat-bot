import { Middleware } from "grammy";

import { context, LocalContext } from "../context";
import { Context } from "../../bot/types/context";

export const middleware = (): Middleware<Context> => (ctx, next) => {
  return context.run({}, () => {
    ctx.local = context.getStore() as LocalContext;
    return next();
  });
};
