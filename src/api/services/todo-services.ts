import { Todo } from "../models/todo.js";

export const todoIndexService = async (userId: string, isComplete: boolean) => {
	try {
		const data = await Todo.find({ userId, isComplete });
		return data;
	} catch (err) {
		throw err;
	}
};

export const todoCreateService = async (userId: string, title: string, description: string, isComplete: boolean = false) => {
	try {
		const newTodo = new Todo({ userId, title, description, isComplete });
		await newTodo.save();
	} catch (err) {
		throw err;
	}
};

export const todoDeleteService = async (todoId: string) => {
	try {
		await Todo.findByIdAndDelete(todoId);
	} catch (err) {
		throw err;
	}
};

export const todoUpdateService = async (todoId: string, title: string, description: string, isComplete: boolean) => {
	try {
		await Todo.findByIdAndUpdate(todoId, {
			title,
			description,
			isComplete,
		});
	} catch (err) {
		throw err;
	}
};
