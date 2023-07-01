import { PrismaClient } from "@prisma/client";
import { TCreateGroup } from "../types";

const prisma = new PrismaClient();

export async function execute(dto: TCreateGroup) {
  const data = {
    name: dto.name,
  };

  const group = await prisma.group.create({
    data,
  });
  return group;
}
