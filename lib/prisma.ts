import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (!prisma) {
  prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });
}

export default prisma;
