import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  hotel: {
    type: String,
    required: true,
  },
  room: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Booking", bookingSchema);
