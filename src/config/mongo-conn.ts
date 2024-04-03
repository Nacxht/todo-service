import mongoose from "mongoose";
import { logger } from "../api/utils/winston.js";
import { config } from "./config.js";

export const mongoInit = async () => {
	await mongoose
		.connect(config.mongo.url, { retryWrites: true, w: "majority" })
		.then(() => {
			logger.info(`Connected to MongoDB`);
		})
		.catch((err) => {
			logger.error("Unable to connect");
			throw err;
		});
};
