import Joi from "joi";

export const todoIdValidators = Joi.object({
	todoId: Joi.string().required(),
});

export const todoListValidators = Joi.object({
	todoId: Joi.string().required(),
	isComplete: Joi.boolean().required(),
});

export const todoCreateValidators = Joi.object({
	title: Joi.string().min(3).max(20).lowercase().required(),
	description: Joi.string().min(3).max(150),
});

export const todoUpdateValidators = Joi.object({
	todoId: Joi.string().required(),
	title: Joi.string().min(3).max(20).required(),
	description: Joi.string().min(3).max(150).required(),
	isComplete: Joi.boolean().required(),
});
