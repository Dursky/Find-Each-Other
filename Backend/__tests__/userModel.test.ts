import User, {IUser} from "../src/models/User"
import mongoose from "mongoose"
import {MongoMemoryServer} from "mongodb-memory-server"

let mongoServer: MongoMemoryServer

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create()
	const uri = mongoServer.getUri()
	await mongoose.connect(uri)
})

afterAll(async () => {
	await mongoose.disconnect()
	await mongoServer.stop()
})

describe("User Model Test", () => {
	it("create & save user successfully", async () => {
		const userData = {username: "testuser", email: "test@test.com", password: "123456"}
		const validUser = new User(userData)
		const savedUser = await validUser.save()

		expect(savedUser._id).toBeDefined()
		expect(savedUser.username).toBe(userData.username)
		expect(savedUser.email).toBe(userData.email)
		expect(savedUser.password).toBeDefined()
	})

	it("should hash the password before saving", async () => {
		const userData = {username: "testuser2", email: "test2@test.com", password: "123456"}
		const validUser = new User(userData)
		await validUser.save()

		expect(validUser.password).not.toBe(userData.password)
	})

	it("should compare password correctly", async () => {
		const userData = {username: "testuser3", email: "test3@test.com", password: "123456"}
		const validUser = new User(userData)
		await validUser.save()

		const isMatch = await validUser.comparePassword(userData.password)
		expect(isMatch).toBe(true)
	})
})
