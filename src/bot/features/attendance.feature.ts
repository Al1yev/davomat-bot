import { Composer } from "grammy";
import { Context } from "../types/context";
import { bot } from "..";
import {
  createAttendanceService,
  getAllAttendanceService,
  getAllGroupService,
  getAllStudentService,
} from "../../services";
import { groupKeyboard, studentKeyboard } from "../keyboards";

export const composer = new Composer<Context>();
const feature = composer.chatType("private");

feature.command("attendance", async (ctx) => {
  try {
    if (ctx.session.in_conversation) return;
    ctx.session.students_attendance = [];

    await ctx.replyWithChatAction("typing");
    await bot.api.setMyCommands([
      { command: "start", description: "Botni qayta ishga tushirish 🔄" },
      { command: "login", description: "Akkauntga kirish 🔐" },
      { command: "help", description: "Yo'riqnoma 🤖" },
      { command: "attendance", description: "Davomat qilish ✅" },
    ]);

    // Rendering Groups
    const groups = await getAllGroupService();
    if (!groups?.length) {
      await ctx.reply("Guruhlar mavjud emas!");
      return;
    }
    for (let ind in groups) {
      const grp = groups[Number(ind)];
      groupKeyboard.text(`${grp.name} `, `group_${grp.id}`).row();
    }
    groupKeyboard.text("Bekor qilish ❌", "cancel");
    const renderedGroup = await ctx.reply("Guruhni tanlang:", {
      reply_markup: groupKeyboard,
    });
    // -------------------------------------------------------------

    // Setting up callback queries
    bot.on("callback_query:data", async (ctx) => {
      try {
        const clbData = ctx.callbackQuery.data;
        const today = `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`;

        // Button sorting
        if (clbData.startsWith("group")) {
          // Getting group id
          ctx.session.group_id = Number(clbData.split("_")[1]);
          if (!ctx.session.group_id) {
            ctx.reply(
              "Xatolik yuz berdi. Birozdan keyin qaytadan urinib ko'ring"
            );
            return;
          }
          // ----------------------------------------------------------------

          await bot.api.deleteMessage(
            Number(ctx.chat?.id),
            renderedGroup.message_id
          );

          // Checking date by group id
          const lessonDate = await getAllAttendanceService({ date: today });

          // Getting students by group id
          const students = await getAllStudentService({
            groupId: Number(ctx.session.group_id),
          });

          if (students) {
            for (let ind in students) {
              const std = students[Number(ind)];
              studentKeyboard
                .text(
                  `${std.first_name} ${std.last_name} '✅'`,
                  `student_true_${ind}`
                )
                .row();

              // Setting up students to session
              ctx.session.students_attendance.push({
                is_here: true,
                student_id: students[ind]["id"],
              });
            }
            studentKeyboard
              .text("Bekor qilish ❌", "cancel")
              .text("Saqlash ✅", "save");

            // Sending keyboard to user
            await ctx.reply("Guruh a'zolari: ", {
              reply_markup: studentKeyboard,
            });
          }
        } else if (clbData.startsWith("student")) {
          // Clicking student buttons
          const students = await getAllStudentService({
            groupId: ctx.session.group_id,
          });

          if (students?.length) {
            const isHere = clbData?.split("_")[1];
            const indexStd = Number(clbData?.split("_")[2]);
            const updatedStudent = students[indexStd];
            console.log(ctx.session.students_attendance);

            // Checking students
            if (isHere == "true") {
              studentKeyboard.inline_keyboard[indexStd][0] = {
                text: `${updatedStudent.first_name} ${updatedStudent.last_name} ❌`,
                callback_data: `student_false_${indexStd}`,
              };
              ctx.session.students_attendance[indexStd]["is_here"] = false;
            } else {
              studentKeyboard.inline_keyboard[indexStd][0] = {
                text: `${updatedStudent.first_name} ${updatedStudent.last_name} ✅`,
                callback_data: `student_true_${indexStd}`,
              };
              ctx.session.students_attendance[indexStd]["is_here"] = true;
            }
            await ctx.editMessageText("Guruh a'zolari: ", {
              reply_markup: studentKeyboard,
            });
          } else {
            await ctx.reply("Bu guruhda o'quvchilar mavjud emas", {
              reply_markup: { remove_keyboard: true },
            });
            return;
          }
        } else if (clbData == "cancel") {
          await ctx.reply("Davomat bekor qilindi");
          ctx.session.students_attendance = [];
          return;
        } else if (clbData == "save") {
          const today = new Date();
          const date = `${today.getDay()}-${today.getMonth()}-${today.getFullYear()}`;
          const attendance = await createAttendanceService({
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
      } catch (error) {
        console.error(error);
        try {
          await ctx.reply("Xatolik yuz berdi. Birozdan keyin urinib ko'ring");
        } catch (error) {
          console.error(error);
        }
      }
    });
    // -------------------------------------------------------------

    return;
  } catch (error) {
    console.error(error);
    try {
      await ctx.reply("Xatolik yuz berdi. Birozdan keyin urinib ko'ring");
    } catch (error) {
      console.error(error);
    }
  }
});
