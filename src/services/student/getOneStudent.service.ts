import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function execute(id: number) {
  try {
    const student = await prisma.student.findFirst({
      where: { id },
      include: { group: true },
    });
    if (!student) throw Error("STUDENT_NOT_FOUND");
    return student;
  } catch (error) {
    console.error(error);
  }
}
