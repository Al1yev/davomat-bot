import { PrismaClient } from "@prisma/client";
import { TStudent } from "../types";

const prisma = new PrismaClient();

export async function execute(dto: TStudent) {
  const data = {
    first_name: dto.first_name,
    last_name: dto.last_name,
    group_id: dto.group_id,
  };

  const student = await prisma.student.create({
    data,
  });
  console.log(student);
  return student;
}
