import { UserData } from "./UserData.js";

declare global {
	namespace Express {
		export interface Request {
			user: UserData;
		}
	}
}
