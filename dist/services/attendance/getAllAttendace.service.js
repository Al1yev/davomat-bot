"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function execute(queryDto) {
    try {
        return await prisma.attendance.findMany({
            where: { date: queryDto === null || queryDto === void 0 ? void 0 : queryDto.date },
            include: { students: true },
        });
    }
    catch (error) {
        console.error(error);
    }
}
exports.execute = execute;
//# sourceMappingURL=getAllAttendace.service.js.map