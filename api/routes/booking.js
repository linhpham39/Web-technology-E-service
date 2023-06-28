import Express from "express";
import { booking, cancelBooking, getBookings, } from "../controllers/booking.js";
const router = Express.Router();

router.post("/", booking);
router.delete("/:id", cancelBooking);
router.get("/", getBookings);
export default router;