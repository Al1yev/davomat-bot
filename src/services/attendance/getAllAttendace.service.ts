import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type query = {
  date: string;
};

export async function execute(queryDto?: query) {
  try {
    return await prisma.lesson_date.findMany({
      where: { date: queryDto?.date },
      include: { attendances: true },
    });
  } catch (error) {
    console.error(error);
  }
}
