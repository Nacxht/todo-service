import { Application, Router } from "express";
import { logger } from "../utils/winston.js";
import { authRouter } from "./auth.js";
import { todoRouter } from "./todo.js";

const routes: Array<[string, Router]> = [
	["auth", authRouter],
	["todo", todoRouter],
];

export const routeInit = (app: Application) => {
	if (!routes.length) {
		logger.warn("No route added");
		return;
	}

	routes.forEach((route) => {
		const [url, router] = route;
		app.use(`/api/${url}`, router);
	});
};
