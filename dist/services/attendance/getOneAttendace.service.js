"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function execute(id) {
    try {
        const attendance = await prisma.attendance.findFirst({
            where: { id },
            include: { students: true },
        });
        if (!attendance)
            throw Error("ATTENDANCE_NOT_FOUND");
        return attendance;
    }
    catch (error) {
        console.error(error);
    }
}
exports.execute = execute;
//# sourceMappingURL=getOneAttendace.service.js.map