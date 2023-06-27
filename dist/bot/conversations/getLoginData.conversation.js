"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoginDataConversation = void 0;
const __1 = require("..");
async function getLoginDataConversation(conversation, ctx) {
    try {
        await ctx.reply("Enter the following:", {
            reply_markup: { remove_keyboard: true },
        });
        conversation.session.in_conversation = true;
        // Get first_name
        const fnmsg = await ctx.reply("First Name: ");
        const firstName = await conversation.form.text();
        if (firstName == "/cancel") {
            await ctx.reply("Registration cancelled!", {});
            conversation.session.in_conversation = false;
            return;
        }
        await __1.bot.api.deleteMessage(fnmsg.chat.id, fnmsg.message_id);
        await __1.bot.api.deleteMessage(fnmsg.chat.id, fnmsg.message_id + 1);
        // Get last_name
        await ctx.reply("Last Name: ");
        const lastName = await conversation.form.text();
        if (lastName == "/cancel") {
            await ctx.reply("Registration cancelled!", {});
            conversation.session.in_conversation = false;
            return;
        }
        // Get phone_number
        await ctx.reply("How can we contact you?", {
            parse_mode: "Markdown",
            reply_markup: {
                one_time_keyboard: true,
                resize_keyboard: true,
                remove_keyboard: true,
                keyboard: [
                    [
                        {
                            text: "Share phone number",
                            request_contact: true,
                        },
                    ],
                ],
            },
        });
        return;
    }
    catch (error) {
        try {
            await ctx.reply("Error occured. Please, try again later.");
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