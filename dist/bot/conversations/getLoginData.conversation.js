"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoginDataConversation = void 0;
const __1 = require("..");
async function getLoginDataConversation(conversation, ctx) {
    var _a, _b;
    try {
        const firstMsg = await ctx.reply("Quyidagilarni kiriting:", {});
        conversation.session.in_conversation = true;
        await ctx.reply("Login:");
        const login = await conversation.form.text();
        if (login == "/cancel") {
            const lastMsg = await ctx.reply("Kirish bekor qilindi");
            ctx.session.in_conversation = false;
            for (let i = lastMsg.message_id - 1; i >= firstMsg.message_id; i--)
                await __1.bot.api.deleteMessage(Number((_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.id), i);
            return;
        }
        await ctx.reply("Parol:");
        const pwd = await conversation.form.text();
        if (pwd == "/cancel") {
            const lastMsg = await ctx.reply("Kirish bekor qilindi");
            ctx.session.in_conversation = false;
            for (let i = lastMsg.message_id - 1; i >= firstMsg.message_id; i--)
                await __1.bot.api.deleteMessage(Number((_b = ctx.chat) === null || _b === void 0 ? void 0 : _b.id), i);
            return;
        }
        await ctx.reply(`Login: ${login}\nParol: ${pwd}`);
        //
        return;
    }
    catch (error) {
        try {
            await ctx.reply("Xatolik yuz berdi. Birozdan keyin urinib ko'ring");
            conversation.session.in_conversation = false;
            return;
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.getLoginDataConversation = getLoginDataConversation;
//# sourceMappingURL=getLoginData.conversation.js.map