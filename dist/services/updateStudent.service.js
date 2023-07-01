"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function execute(id, dto) {
    try {
        const student = await prisma.student.findFirst({ where: { id } });
        if (!student)
            throw Error("STUDENT_NOT_FOUND");
        return await prisma.student.update({ where: { id }, data: dto });
    }
    catch (error) {
        console.error(error);
    }
}
exports.execute = execute;
//# sourceMappingURL=updateStudent.service.js.map