import { Router } from "express";
import { loginController, registerController } from "../controller/auth-controllers.js";
export const authRouter: Router = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
