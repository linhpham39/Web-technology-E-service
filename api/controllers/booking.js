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
  
  export const payBooking = async (req, res, next) => {
    //pay booking by booking ID through paypal
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);
    var create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3000/booking",
          "cancel_url": "http://localhost:3000/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": `${booking.hotelName}`,
                  "price": "1.00",
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": "1.00"
          },
          "description": "This is the payment description."
      }]
  };
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        console.log("Create Payment Response");
        console.log(payment);
    }
});

  }
    