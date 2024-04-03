import Joi from "joi";

export const registerValidation = Joi.object({
	username: Joi.string().required().min(3).max(20),
	password: Joi.string().required().min(8),
	confirmPassword: Joi.ref("password"),
});

export const loginValidation = Joi.object({
	username: Joi.string().required().min(3).max(20),
	password: Joi.string().required().min(8),
});

export const userIdValidation = Joi.object({
	userId: Joi.string().required(),
});
