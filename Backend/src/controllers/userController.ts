import {Request, Response} from "express"
import User, {IUser} from "../models/User"
import jwt from "jsonwebtoken"

const registerUser = async (req: Request, res: Response) => {
	try {
		const {username, email, password} = req.body

		if (!process.env.JWT_SECRET) {
			console.error("-> Not found JWT_SECRET at process.env")
			return res.status(500)
		}

		const newUser: IUser = new User({username, email, password})

		await newUser.save()

		const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"})

		return res.status(201).json({token})
	} catch (error) {
		const typedError = error as Error
		console.error("-> Error message:", typedError.message)

		return res.status(500).json({error: typedError.message})
	}
}

const loginUser = async (req: Request, res: Response) => {
	try {
		const {email, password} = req.body

		if (!process.env.JWT_SECRET) {
			console.error("-> Not found JWT_SECRET at process.env")
			return res.status(500)
		}

		const user = await User.findOne({email})

		if (!user) return res.status(400).json({message: "Invalid email or password"})

		const isMatch = await user.comparePassword(password)

		if (!isMatch) return res.status(400).json({message: "Invalid email or password"})

		const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"})

		return res.status(200).json({token})
	} catch (error) {
		const typedError = error as Error
		console.error("-> Error message:", typedError.message)

		return res.status(500).json({error: typedError.message})
	}
}

export {registerUser, loginUser}
