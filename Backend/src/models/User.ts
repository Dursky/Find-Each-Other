import {Schema, model, Document} from "mongoose"
import bcrypt from "bcryptjs"

interface IUser extends Document {
	username: string
	email: string
	password: string
	comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new Schema<IUser>({
	username: {type: String, required: true, unique: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
})

userSchema.pre("save", async function (next) {
	const user = this as IUser
	if (!user.isModified("password")) return next()
	const salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(user.password, salt)
	next()
})

userSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
	return bcrypt.compare(candidatePassword, this.password)
}

const User = model<IUser>("User", userSchema)

export default User
export {IUser}
