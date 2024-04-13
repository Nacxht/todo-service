import { Request, Response, Router } from "express";
export const indexRouter = Router();

indexRouter.get("/", async (req: Request, res: Response) => {
	res.status(201).json({
		message: "This API Work!",
	});
});
