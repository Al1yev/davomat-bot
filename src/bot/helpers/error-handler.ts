import { BotError } from "grammy";
import { Context } from "../types/context";
import { logger } from "./../../logger";

export const handleError = (error: BotError<Context>) => {
  const { ctx } = error;
  const err = error.error;

  logger.error({
    update_id: ctx.update.update_id,
    err,
  });
};
