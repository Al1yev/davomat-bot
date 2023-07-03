import { PrismaClient } from "@prisma/client";
import { TUpdateLessonDate } from "../types";

const prisma = new PrismaClient();

export async function execute(id: number, dto: TUpdateLessonDate) {
  try {
    const attendance = await prisma.lesson_date.findFirst({ where: { id } });
    if (!attendance) throw Error("ATTENDANCE_NOT_FOUND");
    return await prisma.lesson_date.update({ where: { id }, data: dto });
  } catch (error) {
    console.error(error);
  }
}
