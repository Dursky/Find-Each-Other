import request from "supertest"
import mongoose from "mongoose"
import {MongoMemoryServer} from "mongodb-memory-server"
import app from "../src/app"
import User from "../src/models/User"
import dotenv from "dotenv"

dotenv.config()

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

describe("User API Test", () => {
	it("register a user successfully", async () => {
		const res = await request(app).post("/api/register").send({
			username: "testuser",
			email: "test@test.com",
			password: "123456",
		})
		expect(res.statusCode).toBe(201)
		expect(res.body).toHaveProperty("token")
	})

	it("login a user successfully", async () => {
		const user = new User({
			username: "testuser2",
			email: "test2@test.com",
			password: "123456",
		})
		await user.save()

		const res = await request(app).post("/api/login").send({
			email: "test2@test.com",
			password: "123456",
		})

		expect(res.statusCode).toBe(200)
		expect(res.body).toHaveProperty("token")
	})

	it("should not register a user with existing email", async () => {
		const res = await request(app).post("/api/register").send({
			username: "testuser3",
			email: "test@test.com", // duplicate email
			password: "123456",
		})
		expect(res.statusCode).toBe(409)
		expect(res.body).toHaveProperty("error")
	})

	it("should not login with incorrect password", async () => {
		const res = await request(app).post("/api/login").send({
			email: "test@test.com",
			password: "wrongpassword",
		})
		expect(res.statusCode).toBe(400)
		expect(res.body).toHaveProperty("message")
	})
})
