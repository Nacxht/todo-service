import Joi from "joi";

export const todoIdValidators = Joi.object({
	todoId: Joi.string().required(),
});

export const todoCreateValidators = Joi.object({
	title: Joi.string().min(3).max(20).lowercase().required(),
	description: Joi.string().min(3).max(150),
});
