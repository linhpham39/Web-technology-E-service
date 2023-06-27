import Express from "express";
import { booking, cancelBooking, getBookings, payBooking } from "../controllers/booking.js";
const router = Express.Router();

router.post("/", booking);
router.delete("/:id", cancelBooking);
router.get("/", getBookings);
router.post("/pay/:id",payBooking);
export default router;