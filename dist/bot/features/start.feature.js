"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composer = void 0;
const grammy_1 = require("grammy");
const __1 = require("..");
exports.composer = new grammy_1.Composer();
const feature = exports.composer.chatType("private");
feature.command("start", async (ctx) => {
    try {
        await ctx.replyWithChatAction("typing");
        await __1.bot.api.setMyCommands([
            { command: "start", description: "Botni qayta ishga tushirish 🔄" },
            { command: "login", description: "Akkauntga kirish 🔐" },
            { command: "help", description: "Yo'riqnoma 🤖" },
            { command: "attendance", description: "Davomat qilish ✅" },
        ]);
        const ttl = `<b>Salom ${ctx.from.first_name}!</b>`;
        const wlcm = `\nDavomat botga xush kelibsiz\n`;
        const msg = `\nSiz quyidagi buyurqlardan foydalanishingiz mumkin:`;
        const str = `\n/start - botni qaytadan ishga tushirish 🔄`;
        const lgn = `\n/login - akkauntga kirish 🔐`;
        const hlp = `\n/help - botdan foydalanish uchun yo'riqnoma 🤖`;
        const atd = `\n/attendence - davomat qilish ✅`;
        const replyTxt = ttl + wlcm + msg + str + lgn + hlp + atd;
        await ctx.reply(replyTxt, { parse_mode: "HTML" });
        return;
    }
    catch (error) {
        console.error(error);
        try {
            await ctx.reply("Xatolik yuz berdi. Birozdan keyin urinib ko'ring");
        }
        catch (error) {
            console.error(error);
        }
    }
});
// // Rendering inline keyboard
// sutdents.forEach((val) => {
//   studentKeyboard
//     .text(
//       `${val.first_name} ${val.last_name} ✅`,
//       `true ${sutdents.indexOf(val)}`
//     )
//     .row();
// });
// studentKeyboard.text(`Saqlash`, "save");
// await ctx.reply("Click", { reply_markup: studentKeyboard });
// bot.on("callback_query", async (ctx) => {
//   const data = ctx.callbackQuery.data;
//   if (data == "save") {
//     await ctx.deleteMessage();
//     await ctx.reply("Ma'lumotlar saqlandi!");
//     return;
//   }
//   const isHere = data?.split(" ")[0];
//   const indexStd = Number(data?.split(" ")[1]);
//   const updatedStudent = sutdents[Number(data?.split(" ")[1])];
//   // Checking students
//   if (isHere == "true") {
//     studentKeyboard.inline_keyboard[indexStd][0] = {
//       text: `${updatedStudent.first_name} ${updatedStudent.last_name} ❌`,
//       callback_data: `false ${indexStd}`,
//     };
//   } else {
//     studentKeyboard.inline_keyboard[indexStd][0] = {
//       text: `${updatedStudent.first_name} ${updatedStudent.last_name} ✅`,
//       callback_data: `true ${indexStd}`,
//     };
//   }
//   await ctx.editMessageText("Click", { reply_markup: studentKeyboard });
// });
//# sourceMappingURL=start.feature.js.map