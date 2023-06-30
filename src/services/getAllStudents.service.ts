import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllStudents() {
  try {
    return await prisma.student.findMany();
  } catch (error) {
    console.error(error);
  }
}
