import { Middleware } from "grammy";
import { Context } from "../types/context";
import { rawLogger } from "../../logger";

export const middleware = (): Middleware<Context> => (ctx, next) => {
  ctx.local.logger = rawLogger.child({
    update_id: ctx.update.update_id,
  });

  return next();
};
