import Booking from "../models/booking.js";
//import { paypal } from "paypal-rest-sdk";
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
  

export const getBooking = async (req, res, next) => {
    const bookingId = req.params.id;
    try {
      const booking = await Booking.findById(bookingId);
      res.status(200).json(booking);
    } catch (error) {
      next(error);
    }
  };

export const paymentBooking = async (req, res) => {
  let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Spatula company",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
}
