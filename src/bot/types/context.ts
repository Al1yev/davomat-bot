import { Context as DefaultContext, SessionFlavor } from "grammy";
import { ParseModeFlavor } from "@grammyjs/parse-mode";

import { LocalContext } from "~/bot/context";
import { SessionData } from "./session";
import { ConversationFlavor } from "@grammyjs/conversations";

export interface LocalContextFlavor {
  local: LocalContext;
}

export type Context = ParseModeFlavor<
  DefaultContext &
    SessionFlavor<SessionData> &
    LocalContextFlavor &
    ConversationFlavor
>;
