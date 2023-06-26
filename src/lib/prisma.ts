import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
  interface BigInt {
    toJSON(): string;
  }
}

let prisma: PrismaClient;

const { DATABASE_URL } = process.env;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL,
      },
    },
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      datasources: {
        db: {
          url: DATABASE_URL,
        },
      },
    });
  }
  prisma = global.prisma;
}

BigInt.prototype.toJSON = function () {
  return this.toString();
};

export default prisma;
