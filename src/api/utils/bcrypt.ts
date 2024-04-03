import bcrypt from "bcrypt";
import { logger } from "./winston.js";
const saltRounds = 10;

export const bcryptHash = async (value: string) => {
	try {
		return await bcrypt.hash(value, saltRounds);
	} catch (err) {
		logger.error("Hash process failed");
		throw err;
	}
};

export const bcryptCompare = async (value: string, hashedValue: string) => {
	try {
		return await bcrypt.compare(value, hashedValue);
	} catch (err) {
		logger.error("Hash checking process failed");
		throw err;
	}
};
