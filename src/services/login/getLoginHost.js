import { PrismaClient } from "@prisma/client";

const getLoginHost = async (username, password) => {
  const prisma = new PrismaClient();

  // Find username and password

  return await prisma.host.findUnique({
    where: {
      username,
      password,
    },
  });
};

export default getLoginHost;
