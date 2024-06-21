import {Schema, model, Document} from "mongoose"

interface IBooking extends Document {
	name: string
	date: Date
	object: string
}

const bookingSchema = new Schema<IBooking>({
	name: {type: String, required: true},
	date: {type: Date, required: true},
	object: {type: String, required: true},
})

const Booking = model<IBooking>("Booking", bookingSchema)

export default Booking
export {IBooking}
