import { PrismaClient } from "@prisma/client";
import { TCreateLessonDate } from "../types";

const prisma = new PrismaClient();

export async function execute(dto: TCreateLessonDate) {
  const data = {
    date: dto.date,
  };

  const attendance = await prisma.lesson_date.create({
    data: {
      date: dto.date,
      attendances: {
        create: dto.attendances,
      },
    },
  });
  return attendance;
}
