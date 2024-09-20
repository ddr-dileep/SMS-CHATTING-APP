import { Router } from "express";
import { authTokenMiddleware } from "../utils/token";
import { createCommentController } from "../controllers/comment.controllers";
import { createCommentMiddleware } from "../middlewares/comment.middlewares";

const commentRouter = Router();
export default commentRouter;

commentRouter.post(
  "/create",
  createCommentMiddleware,
  authTokenMiddleware,
  createCommentController
);
