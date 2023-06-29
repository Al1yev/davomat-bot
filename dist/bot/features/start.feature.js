"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composer = void 0;
const grammy_1 = require("grammy");
const keyboards_1 = require("../keyboards");
const __1 = require("..");
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
        // Rendering inline keyboard
        sutdents.forEach((val) => {
            keyboards_1.studentKeyboard
                .text(`${val.first_name} ${val.last_name} ✅`, `true ${sutdents.indexOf(val)}`)
                .row();
        });
        keyboards_1.studentKeyboard.text(`Saqlash`);
        await ctx.reply("Click", { reply_markup: keyboards_1.studentKeyboard });
        __1.bot.on("callback_query", async (ctx) => {
            const data = ctx.callbackQuery.data;
            const isHere = data === null || data === void 0 ? void 0 : data.split(" ")[0];
            const indexStd = Number(data === null || data === void 0 ? void 0 : data.split(" ")[1]);
            const updatedStudent = sutdents[Number(data === null || data === void 0 ? void 0 : data.split(" ")[1])];
            // Checking students
            if (isHere == "true") {
                keyboards_1.studentKeyboard.inline_keyboard[indexStd][0] = {
                    text: `${updatedStudent.first_name} ${updatedStudent.last_name} ❌`,
                    callback_data: `false ${indexStd}`,
                };
            }
            else {
                keyboards_1.studentKeyboard.inline_keyboard[indexStd][0] = {
                    text: `${updatedStudent.first_name} ${updatedStudent.last_name} ✅`,
                    callback_data: `true ${indexStd}`,
                };
            }
            await ctx.editMessageText("Click", { reply_markup: keyboards_1.studentKeyboard });
        });
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