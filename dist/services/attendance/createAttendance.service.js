"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function execute(dto) {
    const data = {
        date: dto.date,
    };
    const attendance = await prisma.lesson_date.create({
        data: {
            date: dto.date,
            attendances: {
                create: dto.attendances,
            },
        },
    });
    return attendance;
}
exports.execute = execute;
//# sourceMappingURL=createAttendance.service.js.map