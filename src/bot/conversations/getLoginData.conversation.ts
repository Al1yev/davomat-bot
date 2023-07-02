import { MyConversation } from "~/bot/types/conversation";
import { Context } from "../types/context";
import { bot } from "..";

export async function getLoginDataConversation(
  conversation: MyConversation,
  ctx: Context
) {
  try {
    const firstMsg = await ctx.reply("Quyidagilarni kiriting:", {});
    conversation.session.in_conversation = true;

    await ctx.reply("Login:");
    const login = await conversation.form.text();

    if (login == "/cancel") {
      const lastMsg = await ctx.reply("Kirish bekor qilindi");
      ctx.session.in_conversation = false;
      for (let i = lastMsg.message_id - 1; i >= firstMsg.message_id; i--)
        await bot.api.deleteMessage(Number(ctx.chat?.id), i);
      return;
    }

    await ctx.reply("Parol:");
    const pwd = await conversation.form.text();

    if (pwd == "/cancel") {
      const lastMsg = await ctx.reply("Kirish bekor qilindi");
      ctx.session.in_conversation = false;
      for (let i = lastMsg.message_id - 1; i >= firstMsg.message_id; i--)
        await bot.api.deleteMessage(Number(ctx.chat?.id), i);
      return;
    }

    await ctx.reply(`Login: ${login}\nParol: ${pwd}`);

    //
    return;
  } catch (error) {
    try {
      await ctx.reply("Xatolik yuz berdi. Birozdan keyin urinib ko'ring");
      conversation.session.in_conversation = false;
      return;
    } catch (error) {
      console.error(error);
    }
  }
}
