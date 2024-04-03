import { Router } from "express";
import { jwtMiddleware } from "../middlewares/jwt-middleware.js";
import { todoCreateController, todoDeleteController, todoIndexController } from "../controller/todo-controllers.js";

export const todoRouter: Router = Router();

todoRouter.use(jwtMiddleware);

todoRouter.get("/", todoIndexController);
todoRouter.post("/create", todoCreateController);
todoRouter.delete("/delete", todoDeleteController);
