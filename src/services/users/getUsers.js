import { PrismaClient } from "@prisma/client";

const getUsers = async (username, email) => {
  const prisma = new PrismaClient();

  // Search made case insensitive

  return await prisma.user.findMany({
    where: {
      username: { contains: username },
      email: { contains: email },
    },
    // no password is selected
    omit: {
      password: true,
    },
  });
};

export default getUsers;
