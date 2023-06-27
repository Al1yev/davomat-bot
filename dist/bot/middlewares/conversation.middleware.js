"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const middleware = async (ctx, next) => {
    await next();
};
exports.middleware = middleware;
//# sourceMappingURL=conversation.middleware.js.map