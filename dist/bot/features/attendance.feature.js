"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composer = void 0;
const grammy_1 = require("grammy");
const __1 = require("..");
const services_1 = require("../../services");
const keyboards_1 = require("../keyboards");
exports.composer = new grammy_1.Composer();
const feature = exports.composer.chatType("private");
feature.command("attendance", async (ctx) => {
    try {
        if (ctx.session.in_conversation)
            return;
        console.log("Keldi");
        await ctx.replyWithChatAction("typing");
        await __1.bot.api.setMyCommands([
            { command: "start", description: "Botni qayta ishga tushirish 🔄" },
            { command: "login", description: "Akkauntga kirish 🔐" },
            { command: "help", description: "Yo'riqnoma 🤖" },
            { command: "attendance", description: "Davomat qilish ✅" },
        ]);
        const groups = await (0, services_1.getAllGroupService)();
        if (!(groups === null || groups === void 0 ? void 0 : groups.length)) {
            await ctx.reply("Guruhlar mavjud emas!");
            return;
        }
        // Rendering Groups
        for (let ind in groups) {
            const grp = groups[Number(ind)];
            keyboards_1.groupKeyboard.text(`${grp.name} `, `group_${grp.id}`).row();
        }
        keyboards_1.groupKeyboard.text("Bekor qilish ❌", "cancel");
        const renderedGroup = await ctx.reply("Guruhni tanlang:", {
            reply_markup: keyboards_1.groupKeyboard,
        });
        __1.bot.on("callback_query:data", async (ctx) => {
            var _a;
            try {
                const clbData = ctx.callbackQuery.data;
                // Button sorting
                if (clbData.startsWith("group")) {
                    ctx.session.group_id = Number(clbData.split("_")[1]);
                    console.log(!ctx.session.group_id);
                    console.log(ctx.session.group_id);
                    if (!ctx.session.group_id) {
                        ctx.reply("Xatolik yuz berdi. Birozdan keyin qaytadan urinib ko'ring");
                        return;
                    }
                    await __1.bot.api.deleteMessage(Number((_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.id), renderedGroup.message_id);
                    const students = await (0, services_1.getAllStudentService)({
                        groupId: Number(ctx.session.group_id),
                    });
                    if (students) {
                        for (let ind in students) {
                            const std = students[Number(ind)];
                            keyboards_1.studentKeyboard
                                .text(`${std.first_name} ${std.last_name} ✅`, `student_true_${ind}`)
                                .row();
                        }
                        keyboards_1.studentKeyboard
                            .text("Bekor qilish ❌", "cancel")
                            .text("Saqlash ✅", "save");
                        await ctx.reply("Guruh a'zolari: ", {
                            reply_markup: keyboards_1.studentKeyboard,
                        });
                    }
                    // Sho'rgacha ishladi
                }
                else if (clbData.startsWith("student")) {
                    console.log(clbData);
                    // Clicking student buttons
                    const students = await (0, services_1.getAllStudentService)({
                        groupId: ctx.session.group_id,
                    });
                    if (students === null || students === void 0 ? void 0 : students.length) {
                        const isHere = clbData === null || clbData === void 0 ? void 0 : clbData.split("_")[1];
                        const indexStd = Number(clbData === null || clbData === void 0 ? void 0 : clbData.split("_")[2]);
                        const updatedStudent = students[indexStd];
                        // Checking students
                        if (isHere == "true") {
                            keyboards_1.studentKeyboard.inline_keyboard[indexStd][0] = {
                                text: `${updatedStudent.first_name} ${updatedStudent.last_name} ❌`,
                                callback_data: `student_false_${indexStd}`,
                            };
                        }
                        else {
                            keyboards_1.studentKeyboard.inline_keyboard[indexStd][0] = {
                                text: `${updatedStudent.first_name} ${updatedStudent.last_name} ✅`,
                                callback_data: `student_true_${indexStd}`,
                            };
                        }
                        await ctx.editMessageText("Guruh a'zolari: ", {
                            reply_markup: keyboards_1.studentKeyboard,
                        });
                    }
                    else {
                        await ctx.reply("Bu guruhda o'quvchilar mavjud emas", {
                            reply_markup: { remove_keyboard: true },
                        });
                        return;
                    }
                }
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
/**
 *         // Getting students
        const students = await getAllStudentService({
          groupId: Number(clbData),
        });

        // Rendering students
        if (students) {
          for (let ind in students) {
            const std = students[Number(ind)];
            studentKeyboard
              .text(`${std.first_name} ${std.last_name} ✅`, `true ${ind}`)
              .row();
          }
          studentKeyboard
            .text("Bekor qilish ❌", "cancel")
            .text("Saqlash ✅", "save");

          await ctx.reply("Guruh a'zolari: ", {
            reply_markup: studentKeyboard,
          });

          bot.on("callback_query", async (ctx) => {
            const data = ctx.callbackQuery.data;
            if (data == "save") {
              await ctx.deleteMessage();
              await ctx.reply("Ma'lumotlar saqlandi!");
              return;
            }
            const isHere = data?.split(" ")[0];
            const indexStd = Number(data?.split(" ")[1]);
            const updatedStudent = students[Number(data?.split(" ")[1])];

            // Checking students
            if (isHere == "true") {
              studentKeyboard.inline_keyboard[indexStd][0] = {
                text: `${updatedStudent.first_name} ${updatedStudent.last_name} ❌`,
                callback_data: `false ${indexStd}`,
              };
            } else {
              studentKeyboard.inline_keyboard[indexStd][0] = {
                text: `${updatedStudent.first_name} ${updatedStudent.last_name} ✅`,
                callback_data: `true ${indexStd}`,
              };
            }

            await ctx.editMessageText("Click", {
              reply_markup: studentKeyboard,
            });
          });
        }
 */
//# sourceMappingURL=attendance.feature.js.map