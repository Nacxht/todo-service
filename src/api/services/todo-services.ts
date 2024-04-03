import { Todo } from "../models/todo.js";
import { logger } from "../utils/winston.js";

export const todoIndexService = async (userId: string) => {
	try {
		const data = await Todo.find({ userId });
		return data;
	} catch (err) {
		logger.error('Can\'t get "Todo" data');
		throw err;
	}
};

export const todoCreateService = async (userId: string, title: string, description: string, isComplete: boolean = false) => {
	try {
		const newTodo = new Todo({ userId, title, description, isComplete });
		await newTodo.save();
	} catch (err) {
		logger.error("Failed to create a new Todo");
		throw err;
	}
};

export const todoDeleteService = async (todoId: string) => {
	try {
		await Todo.findByIdAndDelete(todoId);
	} catch (err) {
		logger.error(`Failed to delete Todo with ID: ${todoId}`);
		throw err;
	}
};
