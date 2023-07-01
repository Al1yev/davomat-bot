"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composer = void 0;
const grammy_1 = require("grammy");
const services_1 = require("./../../services");
exports.composer = new grammy_1.Composer();
const feature = exports.composer.chatType("private");
const sutdents = [
    {
        id: 1,
        first_name: "A",
        last_name: "A",
    },
    {
        id: 2,
        first_name: "B",
        last_name: "B",
    },
    {
        id: 3,
        first_name: "C",
        last_name: "C",
    },
    {
        id: 4,
        first_name: "D",
        last_name: "D",
    },
    {
        id: 5,
        first_name: "E",
        last_name: "E",
    },
];
feature.command("start", async (ctx) => {
    try {
        await ctx.reply("Hello!");
        // console.log(await GetOneStudentService(2));
        console.log(await (0, services_1.GetOneStudentService)(2));
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