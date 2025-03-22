import { PrismaClient } from "@prisma/client";

const updatePropertyById = async (id, updatedProperty) => {
  const prisma = new PrismaClient();
  const { amenitiesIds, hostId, ...rest } = updatedProperty;

  //Check if id exists

  const existingProperty = await prisma.property.findUnique({
    where: { id },
  });

  //Return null if id does not exist, if id exists update record and return it

  if (existingProperty) {
    const property = await prisma.property.update({
      where: { id },
      data: {
        ...rest,
        amenitiesIds,
        host: hostId
          ? {
              connect: { id: hostId },
            }
          : undefined,
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

export default updatePropertyById;
