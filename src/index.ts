import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { mongoInit } from "./config/mongo-conn.js";
import { routeInit } from "./api/routes/init.js";
import { config } from "./config/config.js";
import { logger } from "./api/utils/winston.js";

const app: Express = express();

try {
	if (config.server.env === "production") {
		app.use(
			cors({
				origin: ["https://zky-todo.vercel.app", "http://localhost:3000"],
			})
		);
	} else {
		app.use(cors());
	}

	app.use(bodyParser.json());

	await mongoInit();
	routeInit(app);

	if (config.server.env === "production") {
		app.listen(config.server.port, config.server.url, () => {
			logger.info(`Running on ENV = '${config.server.env}'`);
			logger.info(`Server is running at "${config.server.url}"`);
		});
	} else if (config.server.env === "development") {
		app.listen(config.server.port, () => {
			logger.info(`Running on ENV = '${config.server.env}'`);
			logger.info(`Server is running at "${config.server.url}:${config.server.port}"`);
		});
	}
} catch (err) {
	//
}
