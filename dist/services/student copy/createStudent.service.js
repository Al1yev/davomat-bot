"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function execute(dto) {
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
exports.execute = execute;
//# sourceMappingURL=createStudent.service.js.map