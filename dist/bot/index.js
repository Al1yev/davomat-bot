"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const grammy_1 = require("grammy");
const config_1 = require("../config");
const runner_1 = require("@grammyjs/runner");
const setup_session_middleware_1 = require("./middlewares/setup-session.middleware");
const middlewares_1 = require("./middlewares");
const conversations_1 = require("@grammyjs/conversations");
const conversations_2 = require("./conversations");
const features_1 = require("./features");
const error_handler_1 = require("./helpers/error-handler");
exports.bot = new grammy_1.Bot(config_1.config.BOT_TOKEN);
exports.bot.use((0, runner_1.sequentialize)(setup_session_middleware_1.getSessionKey));
exports.bot.use((0, middlewares_1.setupSession)());
exports.bot.use((0, middlewares_1.setupLocalContext)());
exports.bot.use((0, middlewares_1.setupLogger)());
exports.bot.use((0, conversations_1.conversations)());
exports.bot.use((0, conversations_1.createConversation)(conversations_2.getLoginDataConversation));
// Handlers
exports.bot.use(features_1.startFeature);
exports.bot.use(features_1.helpFeature);
exports.bot.use(features_1.loginFeature);
exports.bot.use(features_1.attendanceFeature);
// Keyboards
if (config_1.config.isDev) {
    exports.bot.catch(error_handler_1.handleError);
}
//# sourceMappingURL=index.js.map