import { Router } from "express";
import {
  loginUserMiddleware,
  registerUserMiddleware,
  userUpdateMiddleWare,
} from "../middlewares/user.middlewares";
import {
  deleteUserInfoController,
  getAllUsersController,
  getUserInfoController,
  loginUserController,
  registerUserController,
  searchUsersControllers,
  updateUserInfoController,
} from "../controllers/user.controllers";
import { authTokenMiddleware } from "../utils/token";

const userRouter = Router();

userRouter.post("/register", registerUserMiddleware, registerUserController);
userRouter.post("/login", loginUserMiddleware, loginUserController);
userRouter.get("/user-info", authTokenMiddleware, getUserInfoController);
userRouter.patch(
  "/update-info",
  userUpdateMiddleWare,
  authTokenMiddleware,
  updateUserInfoController
);
userRouter.delete(
  "/delete-info",
  authTokenMiddleware,
  deleteUserInfoController
);
userRouter.get("/get-all", authTokenMiddleware, getAllUsersController);
userRouter.get("/all-user", authTokenMiddleware, searchUsersControllers);

export default userRouter;
