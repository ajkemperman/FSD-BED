import { PrismaClient } from "@prisma/client";

const getHosts = async (name) => {
  const prisma = new PrismaClient();

  // Search made case insensitive

  return await prisma.host.findMany({
    where: {
      name: { contains: name },
    },
  });
};

export default getHosts;
