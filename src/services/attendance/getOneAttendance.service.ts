import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function execute(id: number) {
  try {
    const attendance = await prisma.lesson_date.findFirst({
      where: { id },
      include: { attendances: true },
    });
    if (!attendance) throw Error("ATTENDANCE_NOT_FOUND");
    return attendance;
  } catch (error) {
    console.error(error);
  }
}
