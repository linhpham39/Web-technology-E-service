import Booking from "../models/booking.js";
 import Stripe from "stripe";
//import stripe from "stripe"(process.env.STRIPE_SECRET_TEST)
const stripe= new Stripe("sk_test_51NO3EwGJKXpqwm9HWEBF3MFs2MN4OWR5COucSAoInuksEYeVLHGoRqkQmQgcQE4DHJvN6CvlbtaZx8mtRc4Xq3DW00iNlCagNn")

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
    const userId = req.params.id;
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
    console.log(stripe);
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
