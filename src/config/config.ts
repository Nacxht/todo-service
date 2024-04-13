import dotenv from "dotenv";
// import { readFileSync } from "fs";
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "";
const BASE_URL = process.env.BASE_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const MONGO_URL = process.env.MONGO_URL || "";

export const config = {
	server: {
		port: SERVER_PORT,
		secret: PRIVATE_KEY,
		env: NODE_ENV,
		url: BASE_URL,
	},
	mongo: {
		url: MONGO_URL,
	},
};
