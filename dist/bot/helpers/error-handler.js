"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const logger_1 = require("./../../logger");
const handleError = (error) => {
    const { ctx } = error;
    const err = error.error;
    logger_1.logger.error({
        update_id: ctx.update.update_id,
        err,
    });
};
exports.handleError = handleError;
//# sourceMappingURL=error-handler.js.map