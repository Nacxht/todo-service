import { Request, Response } from "express";
import { todoCreateService, todoDeleteService, todoIndexService } from "../services/todo-services.js";
import { todoCreateValidators, todoIdValidators } from "../validations/todo-validators.js";
import { logger } from "../utils/winston.js";
import { userIdValidation } from "../validations/auth-validators.js";

export const todoIndexController = async (req: Request, res: Response) => {
	try {
		const { userId } = await userIdValidation.validateAsync({ userId: req.user.userId });
		const todos = todoIndexService(userId);

		res.status(201).json({
			status: true,
			message: 'Success get "Todos" data',
			todos,
		});
	} catch (err: any) {
		switch (err.name) {
			case "ValidationError":
				res.status(422).json({
					status: false,
					error: { name: err.name, message: err.message },
				});
				break;

			case "MongoServerError":
				res.status(422).json({
					status: false,
					error: { name: err.name, message: err.message, code: err.code },
				});
				break;

			default:
				logger.error(`${err.name} - ${err.message}`);
				res.status(500).json({
					status: false,
					error: { name: err.name, message: "An error occured" },
				});
				break;
		}
	}
};

export const todoCreateController = async (req: Request, res: Response) => {
	try {
		const { userId } = await userIdValidation.validateAsync(req.user.userId);
		const { title, description } = await todoCreateValidators.validateAsync(req.body);
		await todoCreateService(userId, title, description);

		res.status(201).json({
			status: true,
			message: "Success created a new Todo",
		});
	} catch (err: any) {
		switch (err.name) {
			case "ValidationError":
				res.status(422).json({
					status: false,
					error: { name: err.name, message: err.message },
				});
				break;

			case "MongoServerError":
				res.status(422).json({
					status: false,
					error: { name: err.name, message: err.message, code: err.code },
				});
				break;

			default:
				logger.error(`${err.name} - ${err.message}`);
				res.status(500).json({
					status: false,
					error: { name: err.name, message: "An error occured" },
				});
				break;
		}
	}
};

export const todoDeleteController = async (req: Request, res: Response) => {
	try {
		const { todoId } = await todoIdValidators.validateAsync(req.body);
		await todoDeleteService(todoId);
	} catch (err: any) {
		switch (err.name) {
			case "ValidationError":
				res.status(422).json({
					status: false,
					error: { name: err.name, message: err.message },
				});
				break;

			case "MongoServerError":
				res.status(422).json({
					status: false,
					error: { name: err.name, message: err.message, code: err.code },
				});
				break;

			default:
				logger.error(`${err.name} - ${err.message}`);
				res.status(500).json({
					status: false,
					error: { name: err.name, message: "An error occured" },
				});
				break;
		}
	}
};
