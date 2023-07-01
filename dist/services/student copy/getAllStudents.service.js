"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function execute(queryDto) {
    try {
        return await prisma.student.findMany({
            where: { group_id: queryDto === null || queryDto === void 0 ? void 0 : queryDto.groupId },
        });
    }
    catch (error) {
        console.error(error);
    }
}
exports.execute = execute;
//# sourceMappingURL=getAllStudents.service.js.map