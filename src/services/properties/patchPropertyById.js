import { PrismaClient } from "@prisma/client";

const patchPropertyById = async (id, updatedProperty) => {
  const prisma = new PrismaClient();
  const { amenitiesIds } = updatedProperty;

  //Check if id exists

  const existingProperty = await prisma.property.findUnique({
    where: { id },
  });

  //Return null if id does not exist, if id exists update record and return it

  if (existingProperty) {
    const property = await prisma.property.update({
      where: { id },
      data: {
        amenitiesIds,
        amenities: amenitiesIds
          ? {
              connect: amenitiesIds.split(",").map((id) => ({ id: id })),
            }
          : undefined,
      },
    });

    return property;
  } else return null;
};

export default patchPropertyById;
