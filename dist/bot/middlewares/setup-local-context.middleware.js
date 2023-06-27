"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const context_1 = require("../context");
const middleware = () => (ctx, next) => {
    return context_1.context.run({}, () => {
        ctx.local = context_1.context.getStore();
        return next();
    });
};
exports.middleware = middleware;
//# sourceMappingURL=setup-local-context.middleware.js.map