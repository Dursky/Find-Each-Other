import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"

interface AuthRequest extends Request {
	user?: string
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
	const token = req.header("x-auth-token")
	if (!token) return res.status(401).json({message: "No token, authorization denied"})

	try {
		if (!process.env.JWT_SECRET) {
			console.error("-> Not found JWT_SECRET at process.env")
			return res.status(500)
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		req.user = (decoded as any).id

		next()
	} catch (err) {
		res.status(401).json({message: "Token is not valid"})
	}
}

export default auth
