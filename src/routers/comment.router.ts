import { Router } from "express";
import { authTokenMiddleware } from "../utils/token";
import {
  createCommentController,
  deleteCommentController,
  updateCommentController,
} from "../controllers/comment.controllers";
import { createCommentMiddleware } from "../middlewares/comment.middlewares";

const commentRouter = Router();
export default commentRouter;

commentRouter.post(
  "/create",
  createCommentMiddleware,
  authTokenMiddleware,
  createCommentController
);
commentRouter.patch(
  "/update/:commentId",
  authTokenMiddleware,
  updateCommentController
);
commentRouter.patch(
  "/delete/:commentId",
  authTokenMiddleware,
  deleteCommentController
);
