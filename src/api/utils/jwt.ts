import jwt from "jsonwebtoken";
import { config } from "../../config/config.js";
import { logger } from "./winston.js";

export const generateJwt = async (payload: object) => {
	const expiresIn: number = 60 * 60 * 1;

	try {
		return jwt.sign(payload, config.server.secret, { algorithm: "RS256", expiresIn });
	} catch (err) {
		logger.error("Error generating JWT");
		throw err;
	}
};

export const decodeJwt = async (token: string) => {
	try {
		return jwt.verify(token, config.server.secret);
	} catch (err) {
		logger.error("Error decoding JWT");
		throw err;
	}
};
