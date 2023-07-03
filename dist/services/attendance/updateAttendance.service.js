"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function execute(id, dto) {
    try {
        const attendance = await prisma.lesson_date.findFirst({ where: { id } });
        if (!attendance)
            throw Error("ATTENDANCE_NOT_FOUND");
        return await prisma.lesson_date.update({ where: { id }, data: dto });
    }
    catch (error) {
        console.error(error);
    }
}
exports.execute = execute;
//# sourceMappingURL=updateAttendance.service.js.map