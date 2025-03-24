import { PrismaClient } from "@prisma/client";

const updateLogo = async (id, image) => {
  const prisma = new PrismaClient();
  const logo = await prisma.logo.updateMany({
    where: { id },
    data: { image },
  });

  return logo.count > 0 ? id : null;
};

export default updateLogo;
