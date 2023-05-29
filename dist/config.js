"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const envalid_1 = require("envalid");
require("dotenv/config");
exports.config = (0, envalid_1.cleanEnv)(process.env, {
    BOT_TOKEN: (0, envalid_1.str)(),
});
//# sourceMappingURL=config.js.map