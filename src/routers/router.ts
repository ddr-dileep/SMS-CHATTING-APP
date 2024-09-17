import { Router } from "express";
import userRouter from "./user.router";
import chatRouters from "./chat.router";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/chat", chatRouters);

export default rootRouter;
