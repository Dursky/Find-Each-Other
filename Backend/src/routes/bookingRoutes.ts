import {Router} from "express"
import {createBooking, getBookings} from "../controllers/bookingController"

const router = Router()

router.post("/bookings", createBooking)
router.get("/bookings", getBookings)

export default router
