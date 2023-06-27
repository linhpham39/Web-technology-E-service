import Booking from "../models/booking.js";
export const booking = async (req, res, next) => {
    try {
      const newBooking = new Booking(req.body);
      await newBooking.save();
      res.status(200).json(newBooking);
    } catch (error) {
      next(error);
    }
  };
  
  export const cancelBooking = async (req, res, next) => {
    try {
      await Booking.findByIdAndDelete(req.params.id);
      res.status(200).send("Booking Deleted");
    } catch (error) {
      next(error);
    }
  };
  
  export const getBookings = async (req, res, next) => {
    const userId = req.query.id;
    try {
      const book = await Booking.find({ user: userId });
      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  };
  