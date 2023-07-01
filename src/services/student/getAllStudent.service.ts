import { PrismaClient } from "@prisma/client";
import { TStudent } from "../types";
const prisma = new PrismaClient();

type query = {
  groupId: number;
};

export async function execute(queryDto?: query) {
  try {
    return await prisma.student.findMany({
      where: { group_id: queryDto?.groupId },
      include: { group: true },
    });
  } catch (error) {
    console.error(error);
  }
}
