import { Composer } from "grammy";
import { Context } from "../types/context";
import { bot } from "..";
import { getAllAttendanceService } from "./../../services";

export const composer = new Composer<Context>();
const feature = composer.chatType("private");

feature.command("help", async (ctx) => {
  try {
    if (ctx.session.in_conversation) return;
    await ctx.replyWithChatAction("typing");

    await bot.api.setMyCommands([
      { command: "start", description: "Botni qayta ishga tushirish 🔄" },
      { command: "login", description: "Akkauntga kirish 🔐" },
      { command: "help", description: "Yo'riqnoma 🤖" },
      { command: "attendance", description: "Davomat qilish" },
    ]);
    console.log(await getAllAttendanceService());
    return;
  } catch (error) {
    console.error(error);
    try {
      await ctx.reply("Xatolik yuz berdi. Birozdan keyin urinib ko'ring");
    } catch (error) {
      console.error(error);
    }
  }
});
