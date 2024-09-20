import { Router } from "express";
import userRouter from "./user.router";
import chatRouters from "./chat.router";
import messageRouter from "./message.router";
import blogRouters from "./blog.router";
import categoryRouters from "./category.router";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/chat", chatRouters);
rootRouter.use("/message", messageRouter);
rootRouter.use("/blog", blogRouters);
rootRouter.use("/category", categoryRouters);

export default rootRouter;
