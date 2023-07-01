import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function execute(id: number) {
  try {
    const group = await prisma.group.findFirst({ where: { id } });
    if (!group) throw Error("GROUP_NOT_FOUND");
    return group;
  } catch (error) {
    console.error(error);
  }
}
