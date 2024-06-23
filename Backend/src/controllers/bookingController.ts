import {Request, Response} from "express"
import Booking, {IBooking} from "../models/Booking"

const createBooking = async (req: Request, res: Response) => {
	try {
		const {name, date, object} = req.body

		const newBooking: IBooking = new Booking({name, date, object})
		await newBooking.save()

		return res.status(201).json(newBooking)
	} catch (error) {
		const typedError = error as Error
		console.error("-> Error message:", typedError.message)

		return res.status(500).json({error: typedError.message})
	}
}

const getBookings = async (req: Request, res: Response) => {
	try {
		const bookings = await Booking.find()

		return res.status(200).json(bookings)
	} catch (error) {
		const typedError = error as Error
		console.error("-> Error message:", typedError.message)

		return res.status(500).json({error: typedError.message})
	}
}

export {createBooking, getBookings}
