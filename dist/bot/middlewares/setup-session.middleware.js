"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = exports.getSessionKey = void 0;
const grammy_1 = require("grammy");
function getSessionKey(ctx) {
    var _a;
    return (_a = ctx.chat) === null || _a === void 0 ? void 0 : _a.id.toString();
}
exports.getSessionKey = getSessionKey;
const middleware = () => (0, grammy_1.session)({
    initial: () => ({}),
    getSessionKey,
});
exports.middleware = middleware;
//# sourceMappingURL=setup-session.middleware.js.map