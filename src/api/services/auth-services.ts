import { User } from "../models/user.js";
import { bcryptCompare } from "../utils/bcrypt.js";
import { logger } from "../utils/winston.js";

export const registerService = async (username: string, password: string) => {
	try {
		const newUser = new User({ username, password });
		await newUser.save();
	} catch (err) {
		logger.error("Failed to create a new user");
		throw err;
	}
};

export const loginService = async (username: string, password: string) => {
	try {
		const isUserExist = await User.findOne({ username });
		if (!isUserExist) throw { name: "User not found" };

		const isPasswordMatch = await bcryptCompare(password, isUserExist.password);
		if (!isPasswordMatch) throw { name: "Wrong password" };

		return { userId: isUserExist._id };
	} catch (err) {
		logger.error("Login checking process failed");
		throw err;
	}
};
