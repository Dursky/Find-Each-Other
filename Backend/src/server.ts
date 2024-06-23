import mongoose from "mongoose"
import app from "./app"

const PORT = process.env.PORT || 8080
const MONGO_URI = `mongodb://${process.env.MONGO_ADDRESS}:${process.env.MONGO_PORT}/booking-system`

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("-> Connected to MongoDB")
		app.listen(PORT, () => {
			console.log(`-> Server is running on port ${PORT}`)
		})
	})
	.catch((err) => {
		console.error(`-> Error message: ${err}`)
	})

export default app
