import { PrismaClient } from "@prisma/client";

const getLoginUser = async (username, password) => {
  const prisma = new PrismaClient();

  // Find username and password

  return await prisma.user.findUnique({
    where: {
      username,
      password,
    },
  });
};

export default getLoginUser;
