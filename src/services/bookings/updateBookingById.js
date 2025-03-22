import { PrismaClient } from "@prisma/client";

const updateBookingById = async (id, updatedBooking) => {
  const prisma = new PrismaClient();
  const { userId, propertyId, ...rest } = updatedBooking;

  //Check if id exists

  const existingBooking = await prisma.booking.findUnique({
    where: { id },
  });

  //Return null if id does not exist, if id exists update record and return it

  if (existingBooking) {
    const booking = await prisma.booking.update({
      where: { id },
      data: {
        ...rest,
        user: userId
          ? {
              connect: { id: userId },
            }
          : undefined,
        property: propertyId
          ? {
              connect: { id: propertyId },
            }
          : undefined,
      },
    });

    return booking;
  } else return null;
};

export default updateBookingById;
