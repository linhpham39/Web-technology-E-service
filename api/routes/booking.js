import Express from "express";
import { booking, cancelBooking, getBookings, getBooking, paymentBooking} from "../controllers/booking.js";
import cors from 'cors'; 
const router = Express.Router();

router.post("/", booking);
router.delete("/:id", cancelBooking);
router.get("/", getBookings);
router.get("/user/:id", getBookings);
router.get("/:id", getBooking);
router.post("/payment", cors(), paymentBooking);
export default router;