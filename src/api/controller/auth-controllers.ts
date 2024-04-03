import { Request, Response } from "express";
import { loginValidation, registerValidation } from "../validations/auth-validators.js";
import { loginService, registerService } from "../services/auth-services.js";
import { logger } from "../utils/winston.js";
import { bcryptHash } from "../utils/bcrypt.js";
import { generateJwt } from "../utils/jwt.js";

export const registerController = async (req: Request, res: Response) => {
	try {
		let { username, password } = await registerValidation.validateAsync(req.body);

		password = await bcryptHash(password);
		await registerService(username, password);

		res.status(201).json({
			status: true,
			message: "Registration process successfully",
		});
	} catch (err: any) {
		switch (err.name) {
			case "ValidationError":
				res.status(422).json({
					status: false,
					error: { name: err.name, message: err.message },
				});
				break;

			case "MongoServerError":
				res.status(422).json({
					status: false,
					error: { name: err.name, message: err.message, code: err.code },
				});
				break;

			default:
				logger.error(`${err.name} - ${err.message}`);
				res.status(500).json({
					status: false,
					error: { name: err.name, message: "An error occured" },
				});
				break;
		}
	}
};

export const loginController = async (req: Request, res: Response) => {
	try {
		const { username, password } = await loginValidation.validateAsync(req.body);

		const { userId } = await loginService(username, password);
		const token = await generateJwt({ userId, username, password });

		res.status(201).json({
			status: true,
			message: "Login process successfully",
			token,
		});
	} catch (err: any) {
		switch (err.name) {
			case "ValidationError":
				res.status(422).json({
					status: false,
					error: { name: err.name, message: err.message },
				});
				break;

			case "MongoServerError":
				res.status(422).json({
					status: false,
					error: { name: err.name, message: err.message, code: err.code },
				});
				break;

			case "User not found":
				res.status(404).json({
					status: false,
					error: { name: "CredentialError", message: err.name },
				});
				break;

			case "Wrong password":
				res.status(400).json({
					status: false,
					error: { name: "CredentialError", message: "Your password is incorrect" },
				});
				break;

			default:
				logger.error(`${err.name} - ${err.message}`);
				res.status(500).json({
					status: false,
					error: { name: err.name, message: "An error occured" },
				});
				break;
		}
	}
};
