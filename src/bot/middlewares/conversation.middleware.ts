import { NextFunction } from "grammy";
import { Context } from "../types/context";

export const middleware = async (
  ctx: Context,
  next: NextFunction
): Promise<void> => {
  await next();
};
