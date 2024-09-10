import { Router } from "express";
import { registerUserMiddleware } from "../middlewares/user.middlewares";
import { registerUserController } from "../controllers/user.controllers";

const userRouter = Router();

userRouter.post("/register", registerUserMiddleware, registerUserController);

export default userRouter;
