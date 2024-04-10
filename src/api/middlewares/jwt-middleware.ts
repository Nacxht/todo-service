import { Request, Response, NextFunction } from "express";
import { decodeJwt } from "../utils/jwt.js";
import { UserData } from "../../../types/UserData.js";
import { errorResponser } from "../utils/err-responser.js";

export const jwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		throw { name: "EmptyAuthToken" };
	}

	try {
		const decode = await decodeJwt(token!);
		req.user = decode as UserData;

		next();
	} catch (err: any) {
		const errResponse = await errorResponser(err);
		res.status(errResponse.statusCode).json(errResponse);
	}
};
