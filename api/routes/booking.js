import Express from "express";
import { booking, cancelBooking, getBookings, getBooking, paymentBooking, updateBooking} from "../controllers/booking.js";
const router = Express.Router();

router.post("/", booking);
router.delete("/:id", cancelBooking);
router.get("/", getBookings);
router.get("/user/:id", getBookings);
router.get("/:id", getBooking);
router.post("/payment", paymentBooking);
router.put("/:id", updateBooking)
export default router;