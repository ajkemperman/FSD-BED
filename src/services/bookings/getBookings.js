import { PrismaClient } from "@prisma/client";

const getBookings = async (userId) => {
  const prisma = new PrismaClient();

  // Search on userId not made case insensitive, because userId is unique

  return await prisma.booking.findMany({
    where: {
      userId,
    },
  });
};

export default getBookings;
