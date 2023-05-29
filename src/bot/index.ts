import { Bot } from "grammy";
import { config } from "../config";

export const bot = new Bot(config.BOT_TOKEN);
