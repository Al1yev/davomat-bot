"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composer = void 0;
const grammy_1 = require("grammy");
exports.composer = new grammy_1.Composer();
const feature = exports.composer.chatType("private");
feature.command("start", async (ctx) => {
    try {
        await ctx.reply("Hello!");
        return;
    }
    catch (error) {
        console.error(error);
        try {
            await ctx.reply("Error occured. PLease, try again later!");
        }
        catch (error) {
            console.error(error);
        }
    }
});
//# sourceMappingURL=start.feature.js.map