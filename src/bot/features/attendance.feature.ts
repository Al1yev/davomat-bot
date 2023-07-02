import { Composer } from "grammy";
import { Context } from "../types/context";
import { bot } from "..";
import { getAllGroupService, getAllStudentService } from "../../services";
import { groupKeyboard, studentKeyboard } from "../keyboards";

export const composer = new Composer<Context>();
const feature = composer.chatType("private");

feature.command("attendance", async (ctx) => {
  try {
    if (ctx.session.in_conversation) return;
    console.log("Keldi");

    await ctx.replyWithChatAction("typing");
    await bot.api.setMyCommands([
      { command: "start", description: "Botni qayta ishga tushirish 🔄" },
      { command: "login", description: "Akkauntga kirish 🔐" },
      { command: "help", description: "Yo'riqnoma 🤖" },
      { command: "attendance", description: "Davomat qilish ✅" },
    ]);

    const groups = await getAllGroupService();
    if (!groups?.length) {
      await ctx.reply("Guruhlar mavjud emas!");
      return;
    }

    // Rendering Groups
    for (let ind in groups) {
      const grp = groups[Number(ind)];
      groupKeyboard.text(`${grp.name} `, `group_${grp.id}`).row();
    }
    groupKeyboard.text("Bekor qilish ❌", "cancel");
    const renderedGroup = await ctx.reply("Guruhni tanlang:", {
      reply_markup: groupKeyboard,
    });

    bot.on("callback_query:data", async (ctx) => {
      try {
        const clbData = ctx.callbackQuery.data;

        // Button sorting
        if (clbData.startsWith("group")) {
          ctx.session.group_id = Number(clbData.split("_")[1]);
          console.log(!ctx.session.group_id);
          console.log(ctx.session.group_id);
          if (!ctx.session.group_id) {
            ctx.reply(
              "Xatolik yuz berdi. Birozdan keyin qaytadan urinib ko'ring"
            );
            return;
          }
          await bot.api.deleteMessage(
            Number(ctx.chat?.id),
            renderedGroup.message_id
          );
          const students = await getAllStudentService({
            groupId: Number(ctx.session.group_id),
          });
          if (students) {
            for (let ind in students) {
              const std = students[Number(ind)];
              studentKeyboard
                .text(
                  `${std.first_name} ${std.last_name} ✅`,
                  `student_true_${ind}`
                )
                .row();
            }

            studentKeyboard
              .text("Bekor qilish ❌", "cancel")
              .text("Saqlash ✅", "save");

            await ctx.reply("Guruh a'zolari: ", {
              reply_markup: studentKeyboard,
            });
          }
          // Sho'rgacha ishladi
        } else if (clbData.startsWith("student")) {
          console.log(clbData);
          // Clicking student buttons
          const students = await getAllStudentService({
            groupId: ctx.session.group_id,
          });

          if (students?.length) {
            const isHere = clbData?.split("_")[1];
            const indexStd = Number(clbData?.split("_")[2]);
            const updatedStudent = students[indexStd];

            // Checking students
            if (isHere == "true") {
              studentKeyboard.inline_keyboard[indexStd][0] = {
                text: `${updatedStudent.first_name} ${updatedStudent.last_name} ❌`,
                callback_data: `student_false_${indexStd}`,
              };
            } else {
              studentKeyboard.inline_keyboard[indexStd][0] = {
                text: `${updatedStudent.first_name} ${updatedStudent.last_name} ✅`,
                callback_data: `student_true_${indexStd}`,
              };
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
