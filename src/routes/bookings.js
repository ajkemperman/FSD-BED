import { Router } from "express";
import getBookings from "../services/bookings/getBookings.js";
import createBooking from "../services/bookings/createBooking.js";
import getBookingById from "../services/bookings/getBookingById.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { userId } = req.query;
    const bookings = await getBookings(userId);
    if (bookings.length === 0) {
      res.status(404).json({ message: `Bookings not found` });
    } else {
      res.status(200).json(bookings);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;
    const newBooking = await createBooking(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message }); // Bad request Response
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);

    if (!booking) {
      res.status(404).json({ message: `Booking with id ${id} not found` });
    } else {
      res.status(200).json(booking);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await deleteBookingById(id);

    if (booking) {
      res.status(200).json({
        message: `Booking with id ${id} successfully deleted`,
      });
    } else {
      res.status(404).json({
        message: `Booking with id ${id} not found`,
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
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;
    const booking = await updateBookingById(id, {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    });

    if (booking) {
      res.status(200).json({
        message: `Booking with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `Booking with id ${id} not found`,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message }); // Bad request Response
  }
});

export default router;
