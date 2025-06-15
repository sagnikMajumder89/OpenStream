// lib/logger.ts
import pino from "pino";

const isDev = process.env.NODE_ENV !== "production";

const logger = pino({
  level: isDev ? "debug" : "info",
  formatters: {
    level: (label) => ({ level: label }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;
