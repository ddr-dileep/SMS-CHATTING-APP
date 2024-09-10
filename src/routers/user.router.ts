import { Router } from "express";
import {
  loginUserMiddleware,
  registerUserMiddleware,
} from "../middlewares/user.middlewares";
import {
  loginUserController,
  registerUserController,
} from "../controllers/user.controllers";

const userRouter = Router();

userRouter.post("/register", registerUserMiddleware, registerUserController);
userRouter.post("/login", loginUserMiddleware, loginUserController);

export default userRouter;
