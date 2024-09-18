import { Router } from "express";
import {
  deleteMessageController,
  getAllmessagesController,
  getOneMessageController,
  sendMessageController,
  updateMessageController,
} from "../controllers/message.controllers";
import { authTokenMiddleware } from "../utils/token";

const messageRouter = Router();

messageRouter.post("/send-message", authTokenMiddleware, sendMessageController);
messageRouter.get(
  "/get-chat-messages/:chatId",
  authTokenMiddleware,
  getAllmessagesController
);
messageRouter.delete(
  "/delete-message/:messageId",
  authTokenMiddleware,
  deleteMessageController
);
messageRouter.patch(
  "/update-chat-messages/:messageId",
  authTokenMiddleware,
  updateMessageController
);
messageRouter.get(
  "/get-one-message/:messageId",
  authTokenMiddleware,
  getOneMessageController
);

export default messageRouter;
