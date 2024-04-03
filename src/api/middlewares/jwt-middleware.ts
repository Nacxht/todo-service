import { Request, Response, NextFunction } from "express";
import { decodeJwt } from "../utils/jwt.js";
import { UserData } from "../../../types/UserData.js";
import { logger } from "../utils/winston.js";

export const jwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		res.status(401).json({
			status: false,
			error: { name: "AuthError", message: "Unauthorized" },
		});
		return;
	}

	try {
		const decode = await decodeJwt(token!);
		req.user = decode as UserData;

		next();
	} catch (err: any) {
		logger.error(`${err.name} - ${err.message}`);

		res.status(500).json({
			status: false,
			message: "An error occured",
		});
	}
};
