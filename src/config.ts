import { cleanEnv, str } from "envalid";
import "dotenv/config";

export const config = cleanEnv(process.env, {
  BOT_TOKEN: str(),
  BACKEND_API_URL: str(),
  LOG_LEVEL: str({
    choices: ["trace", "debug", "info", "warn", "error", "fatal", "silent"],
  }),
});
