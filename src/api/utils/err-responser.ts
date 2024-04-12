import { ErrorResponseSchema } from "../../../types/ErrorResponseSchema.js";
import { logger } from "./winston.js";

export const errorResponser = async (error: any) => {
	// JSON schema
	let errorResponseSchema: ErrorResponseSchema = {
		status: null,
		statusCode: null,
		error: { name: "", path: "", message: "" },
	};

	// Error checking
	if (error.name === "ValidationError" && error.isJoi && error.details[0].path[0] === "username") {
		switch (error.details[0].type) {
			default:
				return (errorResponseSchema = {
					status: false,
					statusCode: 422,
					error: { name: error.name, path: "username", message: error.details[0].message },
				});
		}
	} else if (
		(error.name === "ValidationError" && error.isJoi && error.details[0].path[0] === "password") ||
		(error.name === "ValidationError" && error.isJoi && error.details[0].path[0] === "confirmPassword")
	) {
		switch (error.details[0].type) {
			case "any.only":
				return (errorResponseSchema = {
					status: false,
					statusCode: 422,
					error: { name: `Joi${error.name}`, path: "confirmPassword", message: `"Confirm Password" must match with "Password"` },
				});

			default:
				return (errorResponseSchema = {
					status: false,
					statusCode: 422,
					error: { name: `Joi${error.name}`, path: "password", message: error.details[0].message },
				});
		}
	} else if (error.name === "MongoServerError") {
		switch (error.code) {
			case 11000:
				const path = Object.keys(error.keyValue)[0];
				return (errorResponseSchema = {
					status: false,
					statusCode: 422,
					error: { name: error.name, path, message: "Duplicate key" },
				});

			default:
				logger.error(`${error.name} - ${error.message} - ${error.code}`);
				return (errorResponseSchema = {
					status: false,
					statusCode: 422,
					error: { name: error.name, path: "", message: error.message },
				});
		}
	} else {
		switch (error.name) {
			case "ValidationError":
				return (errorResponseSchema = {
					status: false,
					statusCode: 422,
					error: { name: `Joi${error.name}`, path: error.details[0].path[0], message: error.details[0].message },
				});

			case "User not found":
				return (errorResponseSchema = {
					status: false,
					statusCode: 404,
					error: { name: "CredentialError", path: "username", message: error.name },
				});

			case "Wrong password":
				return (errorResponseSchema = {
					status: false,
					statusCode: 400,
					error: { name: "CredentialError", path: "password", message: "Your password is incorrect" },
				});

			case "EmptyAuthToken":
				return (errorResponseSchema = {
					status: false,
					statusCode: 401,
					error: { name: "EmptyAuthToken", path: "", message: "Unauthorized" },
				});

			case "TokenExpiredError":
				return (errorResponseSchema = {
					status: false,
					statusCode: 401,
					error: { name: error.name, path: "", message: "Unauthorized" },
				});

			default:
				logger.error(`${error.name} - ${error.message}`);
				return (errorResponseSchema = {
					status: false,
					statusCode: 500,
					error: { name: error.name, path: "", message: "Internal server error" },
				});
		}
	}
};
