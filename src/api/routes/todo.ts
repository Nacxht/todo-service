import { Router } from "express";
import { jwtMiddleware } from "../middlewares/jwt-middleware.js";
import { todoCreateController, todoDeleteController, todoIndexController, todoUpdateController } from "../controller/todo-controllers.js";

export const todoRouter: Router = Router();

// JWT Middleware
todoRouter.use(jwtMiddleware);

todoRouter.get("/", todoIndexController);
todoRouter.post("/create", todoCreateController);
todoRouter.delete("/delete/:todoId", todoDeleteController);
todoRouter.patch("/update/:todoId", todoUpdateController);
