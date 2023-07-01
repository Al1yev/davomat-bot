import { PrismaClient } from "@prisma/client";
import { TUpdateStudent } from "../types";

const prisma = new PrismaClient();

export async function execute(id: number, dto: TUpdateStudent) {
  try {
    const student = await prisma.student.findFirst({ where: { id } });
    if (!student) throw Error("STUDENT_NOT_FOUND");
    return await prisma.student.update({ where: { id }, data: dto });
  } catch (error) {
    console.error(error);
  }
}
