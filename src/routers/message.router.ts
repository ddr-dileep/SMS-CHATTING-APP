import { Router } from "express";
import { sendMessageController } from "../controllers/message.controllers";
import { authTokenMiddleware } from "../utils/token";

const messageRouter = Router();

messageRouter.post("/send-message", authTokenMiddleware, sendMessageController);

export default messageRouter;
