import { Request, Response } from "express";
import { todoCreateService, todoDeleteService, todoIndexService, todoUpdateService } from "../services/todo-services.js";
import { todoCreateValidators, todoIdValidators, todoUpdateValidators } from "../validations/todo-validators.js";
import { userIdValidation } from "../validations/auth-validators.js";
import { errorResponser } from "../utils/err-responser.js";

export const todoIndexController = async (req: Request, res: Response) => {
	try {
		const { userId } = await userIdValidation.validateAsync({ userId: req.user.userId });
		const todos = await todoIndexService(userId);

		res.status(201).json({
			status: true,
			message: 'Success get "Todos" data',
			data: todos,
		});
	} catch (err: any) {
		const errResponse = await errorResponser(err);
		res.status(errResponse.statusCode).json(errResponse);
	}
};

export const todoCreateController = async (req: Request, res: Response) => {
	try {
		const { userId } = await userIdValidation.validateAsync({ userId: req.user.userId });
		const { title, description } = await todoCreateValidators.validateAsync(req.body);
		await todoCreateService(userId, title, description);

		res.status(201).json({
			status: true,
			message: "Success created a new Todo",
		});
	} catch (err: any) {
		const errResponse = await errorResponser(err);
		res.status(errResponse.statusCode).json(errResponse);
	}
};

export const todoDeleteController = async (req: Request, res: Response) => {
	try {
		const { todoId } = await todoIdValidators.validateAsync(req.body);
		await todoDeleteService(todoId);

		res.status(201).json({
			status: true,
			message: "Success deleted a Todo",
		});
	} catch (err: any) {
		const errResponse = await errorResponser(err);
		res.status(errResponse.statusCode).json(errResponse);
	}
};

export const todoUpdateController = async (req: Request, res: Response) => {
	try {
		const { todoId, title, description, isComplete } = await todoUpdateValidators.validateAsync(req.body);
		await todoUpdateService(todoId, title, description, isComplete);
		res.status(201).json({
			status: true,
			message: "Success updated a Todo",
		});
	} catch (err: any) {
		const errResponse = await errorResponser(err);
		res.status(errResponse.statusCode).json(errResponse);
	}
};
