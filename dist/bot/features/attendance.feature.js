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
        ctx.session.students_attendance = [];
        await ctx.replyWithChatAction("typing");
        await __1.bot.api.setMyCommands([
            { command: "start", description: "Botni qayta ishga tushirish 🔄" },
            { command: "login", description: "Akkauntga kirish 🔐" },
            { command: "help", description: "Yo'riqnoma 🤖" },
            { command: "attendance", description: "Davomat qilish ✅" },
        ]);
        // Rendering Groups
        const groups = await (0, services_1.getAllGroupService)();
        if (!(groups === null || groups === void 0 ? void 0 : groups.length)) {
            await ctx.reply("Guruhlar mavjud emas!");
            return;
        }
        for (let ind in groups) {
            const grp = groups[Number(ind)];
            keyboards_1.groupKeyboard.text(`${grp.name} `, `group_${grp.id}`).row();
        }
        keyboards_1.groupKeyboard.text("Bekor qilish ❌", "cancel");
        const renderedGroup = await ctx.reply("Guruhni tanlang:", {
            reply_markup: keyboards_1.groupKeyboard,
        });
        // -------------------------------------------------------------
        // Setting up callback queries
        __1.bot.on("callback_query:data", async (ctx) => {
            var _a;
            try {
                const clbData = ctx.callbackQuery.data;
                const today = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;
                // Button sorting
                if (clbData.startsWith("group")) {
                    // Getting group id
                    ctx.session.group_id = Number(clbData.split("_")[1]);
                    if (!ctx.session.group_id) {
                        ctx.reply("Xatolik yuz berdi. Birozdan keyin qaytadan urinib ko'ring");
                        return;
                    }
                    // ----------------------------------------------------------------
                    await __1.bot.api.deleteMessage(Number((_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.id), renderedGroup.message_id);
                    // Checking date by group id
                    const lessonDate = await (0, services_1.getAllAttendanceService)({ date: today });
                    // Getting students by group id
                    const students = await (0, services_1.getAllStudentService)({
                        groupId: Number(ctx.session.group_id),
                    });
                    if (students) {
                        for (let ind in students) {
                            const std = students[Number(ind)];
                            keyboards_1.studentKeyboard
                                .text(`${std.first_name} ${std.last_name} '✅'`, `student_true_${ind}`)
                                .row();
                            // Setting up students to session
                            ctx.session.students_attendance.push({
                                is_here: true,
                                student_id: students[ind]["id"],
                            });
                        }
                        keyboards_1.studentKeyboard
                            .text("Bekor qilish ❌", "cancel")
                            .text("Saqlash ✅", "save");
                        // Sending keyboard to user
                        await ctx.reply("Guruh a'zolari: ", {
                            reply_markup: keyboards_1.studentKeyboard,
                        });
                    }
                }
                else if (clbData.startsWith("student")) {
                    // Clicking student buttons
                    const students = await (0, services_1.getAllStudentService)({
                        groupId: ctx.session.group_id,
                    });
                    if (students === null || students === void 0 ? void 0 : students.length) {
                        const isHere = clbData === null || clbData === void 0 ? void 0 : clbData.split("_")[1];
                        const indexStd = Number(clbData === null || clbData === void 0 ? void 0 : clbData.split("_")[2]);
                        const updatedStudent = students[indexStd];
                        console.log(ctx.session.students_attendance);
                        // Checking students
                        if (isHere == "true") {
                            keyboards_1.studentKeyboard.inline_keyboard[indexStd][0] = {
                                text: `${updatedStudent.first_name} ${updatedStudent.last_name} ❌`,
                                callback_data: `student_false_${indexStd}`,
                            };
                            ctx.session.students_attendance[indexStd]["is_here"] = false;
                        }
                        else {
                            keyboards_1.studentKeyboard.inline_keyboard[indexStd][0] = {
                                text: `${updatedStudent.first_name} ${updatedStudent.last_name} ✅`,
                                callback_data: `student_true_${indexStd}`,
                            };
                            ctx.session.students_attendance[indexStd]["is_here"] = true;
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
                else if (clbData == "cancel") {
                    await ctx.reply("Davomat bekor qilindi");
                    ctx.session.students_attendance = [];
                    return;
                }
                else if (clbData == "save") {
                    const today = new Date();
                    const date = `${today.getDay()}-${today.getMonth()}-${today.getFullYear()}`;
                    const attendance = await (0, services_1.createAttendanceService)({
                        date,
                        attendances: ctx.session.students_attendance,
                    });
                    if (!attendance) {
                        await ctx.reply("Xatolik yuz berdi. Birozdan keyin urinib ko'ring");
                        ctx.session.students_attendance = [];
                        return;
                    }
                    await ctx.reply("Davomat saqlandi");
                    ctx.session.students_attendance = [];
                    return;
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
        // -------------------------------------------------------------
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
//# sourceMappingURL=attendance.feature.js.map