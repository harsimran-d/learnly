import { PrismaClient } from "@prisma/client";
declare const globalThis: {
  prismaClient: PrismaClient | undefined;
};

const getPrismaClient = () => {
  return new PrismaClient();
};

const prisma = globalThis.prismaClient ?? getPrismaClient();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaClient = prisma;
