import { PrismaClient } from "@prisma/client";
import propertyData from "../data/properties.json" assert { type: "json" };
import userData from "../data/users.json" assert { type: "json" };
import reviewData from "../data/reviews.json" assert { type: "json" };
import hostData from "../data/hosts.json" assert { type: "json" };
import bookingData from "../data/bookings.json" assert { type: "json" };
import amenityData from "../data/amenities.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { users } = userData;
  const { reviews } = reviewData;
  const { properties } = propertyData;
  const { hosts } = hostData;
  const { bookings } = bookingData;
  const { amenities } = amenityData;

  // Create user table

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  // Create host table

  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
  }

  // Create amenity table

  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: amenity,
    });
  }

  // Create property table

  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: {
        id: property.id,
        title: property.title,
        description: property.description,
        location: property.location,
        pricePerNight: property.pricePerNight,
        bedroomCount: property.bedroomCount,
        bathRoomCount: property.bathRoomCount,
        maxGuestCount: property.maxGuestCount,
        rating: property.rating,
        image: property.image,
        amenitiesIds: property.amenitiesIds, // Stored as String
        host: {
          connect: { id: property.hostId },
        },

        amenities: {
          connect: property.amenitiesIds.split(",").map((id) => ({ id })),
        },
      },
    });
  }

  // Create review table

  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: {
        id: review.id,
        rating: review.rating,
        comment: review.comment,

        user: {
          connect: { id: review.userId },
        },
        property: {
          connect: { id: review.propertyId },
        },
      },
    });
  }

  // Create booking table

  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: {
        id: booking.id,
        checkinDate: booking.checkinDate,
        checkoutDate: booking.checkoutDate,
        numberOfGuests: booking.numberOfGuests,
        totalPrice: booking.totalPrice,
        bookingStatus: booking.bookingStatus,

        user: {
          connect: { id: booking.userId },
        },
        property: {
          connect: { id: booking.propertyId },
        },
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
