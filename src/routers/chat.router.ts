import { Router } from "express";
import { authTokenMiddleware } from "../utils/token";
import {
  addUserToGroupController,
  createGroupController,
  getAllChatsControllers,
} from "../controllers/chat.controllers";
import {
  addMemberToGroupMiddleware,
  createGroupMiddleware,
} from "../middlewares/chat.middlewares";

const chatRouters = Router();

chatRouters.post(
  "/create-group",
  createGroupMiddleware,
  authTokenMiddleware,
  createGroupController
);
chatRouters.post(
  "/add-member",
  addMemberToGroupMiddleware,
  authTokenMiddleware,
  addUserToGroupController
);
chatRouters.get("/get-all-chat", authTokenMiddleware, getAllChatsControllers);

export default chatRouters;
