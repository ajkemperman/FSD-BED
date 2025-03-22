import { PrismaClient } from "@prisma/client";

const updateReviewById = async (id, userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();

  //Check if id exists

  const existingReview = await prisma.review.findUnique({
    where: { id },
  });

  //Return null if id does not exist, if id exists update record and return it

  if (existingReview) {
    const review = await prisma.review.update({
      where: { id },
      data: {
        rating,
        comment,
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

    return review;
  } else return null;
};
export default updateReviewById;
