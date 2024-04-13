import dotenv from "dotenv";
import { Config } from "../../types/Config.js";
// import { readFileSync } from "fs";
dotenv.config();

const SERVER_PORT = process.env.PORT || 3000;
const BASE_URL = process.env.HOST || "";
const NODE_ENV = process.env.NODE_ENV || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const MONGO_URL = process.env.MONGO_URL || "";

export const config: Config = {
	server: {
		port: Number(SERVER_PORT),
		secret: PRIVATE_KEY,
		env: NODE_ENV,
		url: BASE_URL,
	},
	mongo: {
		url: MONGO_URL,
	},
};
