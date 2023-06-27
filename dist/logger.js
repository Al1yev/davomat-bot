"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.rawLogger = void 0;
const pino_1 = __importDefault(require("pino"));
const config_1 = require("./config");
const context_1 = require("./bot/context");
const options = {
    level: config_1.config.LOG_LEVEL,
};
const transport = pino_1.default.transport({
    targets: [
        {
            target: "pino-pretty",
            level: config_1.config.LOG_LEVEL,
            options: {
                ...(config_1.config.isDev && {
                    ignore: "pid,hostname",
                    colorize: true,
                    translateTime: true,
                }),
            },
        },
    ],
});
exports.rawLogger = (0, pino_1.default)(options, transport);
exports.logger = new Proxy(exports.rawLogger, {
    get(target, property, receiver) {
        var _a;
        // eslint-disable-next-line no-param-reassign
        target = ((_a = context_1.context.getStore()) === null || _a === void 0 ? void 0 : _a.logger) || target;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return Reflect.get(target, property, receiver);
    },
});
//# sourceMappingURL=logger.js.map