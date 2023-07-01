import { PrismaClient } from "@prisma/client";
import { TStudent } from "../types";
const prisma = new PrismaClient();

export async function execute() {
  try {
    return await prisma.group.findMany({});
  } catch (error) {
    console.error(error);
  }
}
