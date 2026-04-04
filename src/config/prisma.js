const { PrismaClient } = require("@prisma/client");

let prisma;

if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
prisma = global.prisma;

module.exports = prisma;

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit();
});