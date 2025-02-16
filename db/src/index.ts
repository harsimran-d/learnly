import {
  PrismaClient,
  Prisma,
  PublishStatus,
} from "../generated/client/index.js";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export { prisma, Prisma, PublishStatus };
