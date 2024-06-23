import express from "express"
import bookingRoutes from "./routes/bookingRoutes"
import userRoutes from "./routes/userRoutes"
import auth from "./middleware/auth"

const app = express()

app.use(express.json())
app.use("/api", userRoutes)
app.use("/api", auth, bookingRoutes)

export default app
