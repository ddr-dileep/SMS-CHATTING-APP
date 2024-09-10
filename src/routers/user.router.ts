import { Router } from "express";
import {
  loginUserMiddleware,
  registerUserMiddleware,
} from "../middlewares/user.middlewares";
import {
  getUserInfoController,
  loginUserController,
  registerUserController,
} from "../controllers/user.controllers";
import { authTokenMiddleware } from "../utils/token";

const userRouter = Router();

userRouter.post("/register", registerUserMiddleware, registerUserController);
userRouter.post("/login", loginUserMiddleware, loginUserController);
userRouter.get("/user-info", authTokenMiddleware, getUserInfoController);

export default userRouter;
