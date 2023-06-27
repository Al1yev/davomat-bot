"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const logger_1 = require("../../logger");
const middleware = () => (ctx, next) => {
    ctx.local.logger = logger_1.rawLogger.child({
        update_id: ctx.update.update_id,
    });
    return next();
};
exports.middleware = middleware;
//# sourceMappingURL=setup-logger.middleware.js.map