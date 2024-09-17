import { Router } from "express";
import { authTokenMiddleware } from "../utils/token";
import { createGroupController } from "../controllers/chat.controllers";
import { createGroupMiddleware } from "../middlewares/chat.middlewares";

const chatRouters = Router();

chatRouters.post(
  "/create-group",
  createGroupMiddleware,
  authTokenMiddleware,
  createGroupController
);

export default chatRouters;
