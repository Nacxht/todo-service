import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		username: {
			type: String,
			lowercase: true,
			minLenght: 3,
			maxLength: 20,
			unique: true,
			required: true,
		},

		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export const User = mongoose.model("Users", userSchema);
