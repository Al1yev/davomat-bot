import { Composer } from "grammy";
import { Context } from "../types/context";

export const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("start", async (ctx) => {
  try {
    await ctx.reply("Hello!");
    return;
  } catch (error) {
    console.error(error);
    try {
      await ctx.reply("Error occured. PLease, try again later!");
    } catch (error) {
      console.error(error);
    }
  }
});
