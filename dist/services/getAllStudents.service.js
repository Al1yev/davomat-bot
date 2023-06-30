"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStudents = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getAllStudents() {
    try {
        return await prisma.group.findMany();
    }
    catch (error) {
        console.error(error);
    }
}
exports.getAllStudents = getAllStudents;
//# sourceMappingURL=getAllStudents.service.js.map