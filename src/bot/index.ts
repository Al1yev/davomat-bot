import { Bot } from "grammy";
import { config } from "../config";
import { sequentialize } from "@grammyjs/runner";
import { getSessionKey } from "./middlewares/setup-session.middleware";
import { setupLocalContext, setupLogger, setupSession } from "./middlewares";
import { Context } from "./types/context";
import { conversations, createConversation } from "@grammyjs/conversations";
import { getLoginDataConversation } from "./conversations";
import { startFeature } from "./features";

export const bot = new Bot<Context>(config.BOT_TOKEN);

bot.use(sequentialize(getSessionKey));
bot.use(setupSession());
bot.use(setupLocalContext());
bot.use(setupLogger());

bot.use(conversations());
bot.use(createConversation(getLoginDataConversation));

// Handlers
bot.use(startFeature);
