import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function getPrismaClient(): PrismaClient | null {
  if (!process.env.DATABASE_URL) {
    return null;
  }
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  return globalForPrisma.prisma;
}

export const db = (process.env.DATABASE_URL ? (globalForPrisma.prisma || new PrismaClient()) : null) as PrismaClient;

if (process.env.NODE_ENV !== "production" && db) globalForPrisma.prisma = db;

