import { Router } from "express";
import userRouter from "./user.router";
import chatRouters from "./chat.router";
import messageRouter from "./message.router";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/chat", chatRouters);
rootRouter.use("/message", messageRouter);

export default rootRouter;
