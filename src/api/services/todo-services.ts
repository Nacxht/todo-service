import { Todo } from "../models/todo.js";

export const todoIndexService = async (userId: string) => {
	try {
		const data = await Todo.find({ userId });
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
	//
};
