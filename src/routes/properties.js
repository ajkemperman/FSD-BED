import { Router } from "express";
import getProperties from "../services/properties/getProperties.js";
import createProperty from "../services/properties/createProperty.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import patchPropertyById from "../services/properties/patchPropertyById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { location, pricePerNight, amenities } = req.query;
    const price = pricePerNight ? Number(pricePerNight) : undefined;

    if (pricePerNight && Number.isNaN(price)) {
      return res
        .status(400)
        .json({ message: "Bad Request: pricePerNight must be a valid number" });
    }
    const properties = await getProperties(location, price, amenities);

    if (properties.length === 0) {
      res.status(404).json({ message: `Properties not found` });
    } else {
      res.status(200).json(properties);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      image,
      hostId,
      amenitiesIds,
    } = req.body;
    const newProperty = await createProperty(
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      image,
      hostId,
      amenitiesIds
    );
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(400).json({ message: error.message }); // Bad request Response
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await getPropertyById(id);

    if (!property) {
      res.status(404).json({ message: `Property with id ${id} not found` });
    } else {
      res.status(200).json(property);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await deletePropertyById(id);

    if (property) {
      res.status(200).json({
        message: `Property with id ${id} successfully deleted`,
      });
    } else {
      res.status(404).json({
        message: `Property with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      image,
      hostId,
      amenitiesIds,
    } = req.body;
    const property = await updatePropertyById(id, {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      image,
      hostId,
      amenitiesIds,
    });

    if (property) {
      res.status(200).json({
        message: `Property with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `Property with id ${id} not found`,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message }); // Bad request Response
  }
});
router.patch("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amenitiesIds } = req.body;
    const property = await patchPropertyById(id, {
      amenitiesIds,
    });

    if (property) {
      res.status(200).json({
        message: `Property with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `Property with id ${id} not found`,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message }); // Bad request Response
  }
});

export default router;
