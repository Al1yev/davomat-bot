import { PrismaClient } from "@prisma/client";
import { TUpdateGroup } from "../types";

const prisma = new PrismaClient();

export async function execute(id: number, dto: TUpdateGroup) {
  try {
    const group = await prisma.group.findFirst({
      where: { id },
      include: { students: true },
    });
    if (!group) throw Error("GROUP_NOT_FOUND");
    return await prisma.group.update({ where: { id }, data: dto });
  } catch (error) {
    console.error(error);
  }
}
