"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function execute(id) {
    try {
        const student = await prisma.student.findFirst({ where: { id } });
        if (!student)
            throw Error("STUDENT_NOT_FOUND");
        return student;
    }
    catch (error) {
        console.error(error);
    }
}
exports.execute = execute;
//# sourceMappingURL=getOneStudent.service.js.map