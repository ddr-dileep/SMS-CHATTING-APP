import { Router } from "express";
import { authTokenMiddleware } from "../utils/token";
import {
  addUserToGroupController,
  createChatController,
  createGroupController,
  deleteGroupController,
  getAllChatsControllers,
  getOneChatController,
  removeUserToGroupController,
  updateChatInfoController,
} from "../controllers/chat.controllers";
import {
  addMemberToGroupMiddleware,
  createGroupMiddleware,
  removeMemberMiddleware,
} from "../middlewares/chat.middlewares";

const chatRouters = Router();

chatRouters.post(
  "/create-group",
  createGroupMiddleware,
  authTokenMiddleware,
  createGroupController
);
chatRouters.delete(
  "/delete-group/:groupId",
  authTokenMiddleware,
  deleteGroupController
);
chatRouters.post(
  "/add-member",
  addMemberToGroupMiddleware,
  authTokenMiddleware,
  addUserToGroupController
);
chatRouters.post(
  "/remove-member",
  removeMemberMiddleware,
  authTokenMiddleware,
  removeUserToGroupController
);
chatRouters.get("/get-chat/:chatId", authTokenMiddleware, getOneChatController);
chatRouters.patch(
  "/update-chat/:chatId",
  authTokenMiddleware,
  updateChatInfoController
);
chatRouters.get("/get-all-chat", authTokenMiddleware, getAllChatsControllers);
chatRouters.post(
  "/create/:receiverId",
  authTokenMiddleware,
  createChatController
);

export default chatRouters;
