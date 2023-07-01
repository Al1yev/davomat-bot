"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function execute(dto) {
    const data = {
        name: dto.name,
    };
    const group = await prisma.group.create({
        data,
    });
    return group;
}
exports.execute = execute;
//# sourceMappingURL=createGroup.service.js.map