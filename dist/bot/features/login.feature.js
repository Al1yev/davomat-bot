"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composer = void 0;
const grammy_1 = require("grammy");
const __1 = require("..");
exports.composer = new grammy_1.Composer();
const feature = exports.composer.chatType("private");
feature.command("login", async (ctx) => {
    try {
        if (ctx.session.in_conversation)
            return;
        await ctx.replyWithChatAction("typing");
        await __1.bot.api.setMyCommands([
            { command: "start", description: "Botni qayta ishga tushirish 🔄" },
            { command: "login", description: "Akkauntga kirish 🔐" },
            { command: "help", description: "Yo'riqnoma 🤖" },
            { command: "attendance", description: "Davomat qilish ✅" },
        ]);
        await ctx.conversation.enter("getLoginDataConversation");
        return;
    }
    catch (error) {
        console.error(error);
        try {
            await ctx.reply("Xatolik yuz berdi. Birozdan keyin urinib ko'ring.");
        }
        catch (error) {
            console.error(error);
        }
    }
});
//# sourceMappingURL=login.feature.js.map