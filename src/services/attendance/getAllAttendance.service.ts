import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type query = {
  date?: string;
  group_id?: number;
};

export async function execute(queryDto?: query) {
  try {
    return await prisma.lesson_date.findMany({
      include: { attendances: true },
      where: { date: queryDto?.date },
    });
  } catch (error) {
    console.error(error);
  }
}
