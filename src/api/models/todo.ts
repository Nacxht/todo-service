import mongoose from "mongoose";
const { Schema } = mongoose;

const todoSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "users",
			required: true,
		},

		title: {
			type: String,
			minLength: 3,
			maxLength: 20,
			lowercase: true,
			required: true,
		},

		description: {
			type: String,
			minLength: 3,
			maxLength: 150,
		},

		isComplete: {
			type: Boolean,
			default: false,
			required: true,
		},
	},
	{ timestamps: true }
);

export const Todo = mongoose.model("Todos", todoSchema);
