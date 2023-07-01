"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function execute(id) {
    try {
        const group = await prisma.group.findFirst({ where: { id } });
        if (!group)
            throw Error("GROUP_NOT_FOUND");
        return group;
    }
    catch (error) {
        console.error(error);
    }
}
exports.execute = execute;
//# sourceMappingURL=getOneGroup.service.js.map