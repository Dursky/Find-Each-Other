import express from "express"
import mongoose from "mongoose"
import bookingRoutes from "./routes/bookingRoutes"
import userRoutes from "./routes/userRoutes"
import auth from "./middleware/auth"
import "dotenv/config"

const app = express()
const PORT = process.env.PORT || 8080
const MONGO_URI = `mongodb://${process.env.MONGO_ADDRESS}:${process.env.MONGO_PORT}/booking-system`

app.use(express.json())
app.use("/api", userRoutes)
app.use("/api", auth, bookingRoutes)

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
