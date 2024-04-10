import { Request, Response } from "express";
import { loginValidation, registerValidation } from "../validations/auth-validators.js";
import { loginService, registerService } from "../services/auth-services.js";
import { bcryptHash } from "../utils/bcrypt.js";
import { generateJwt } from "../utils/jwt.js";
import { errorResponser } from "../utils/err-responser.js";

export const registerController = async (req: Request, res: Response) => {
	try {
		let { username, password } = await registerValidation.validateAsync(req.body);

		password = await bcryptHash(password);
		await registerService(username, password);

		res.status(201).json({
			status: "success",
			message: "Registration process successfully",
		});
	} catch (err: any) {
		const errResponse = await errorResponser(err);
		res.status(errResponse.statusCode).json(errResponse);
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
		const errResponse = await errorResponser(err);
		res.status(errResponse.statusCode).json(errResponse);
	}
};
