import { PrismaClient } from "@prisma/client";

const getLogo = async () => {
  const prisma = new PrismaClient();

  return await prisma.logo.findMany();
};

export default getLogo;
