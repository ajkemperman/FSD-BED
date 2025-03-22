import { PrismaClient } from "@prisma/client";

const getProperties = async (location, pricePerNight, amenities) => {
  const prisma = new PrismaClient();

  // Get id(s) from name amenities from table amenity, only when amneties is searched for
  // Search made case insensitive

  if (amenities) {
    const amenityIds = await prisma.amenity.findMany({
      where: { name: { contains: amenities } },
      select: { id: true },
    });

    // if id(s) found, search id(s) of amenities in table property. If id(s) not found return empty array.
    // Also location made case insensitive

    if (amenityIds.length > 0) {
      return await prisma.property.findMany({
        where: {
          location: { contains: location },
          pricePerNight,
          amenities: {
            some: { id: { in: amenityIds.map((amenity) => amenity.id) } },
          },
        },
      });
    } else {
      return [];
    }
  } else {
    return await prisma.property.findMany({
      where: {
        location: { contains: location },
        pricePerNight,
      },
    });
  }
};

export default getProperties;
