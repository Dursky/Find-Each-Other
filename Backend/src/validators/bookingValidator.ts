import Joi from "joi"

const bookingSchema = Joi.object({
	name: Joi.string().min(3).max(50).required(),
	date: Joi.date().iso().required(),
	object: Joi.string().min(3).max(50).required(),
})

export {bookingSchema}
