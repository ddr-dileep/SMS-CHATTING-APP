import { Router } from "express";
import {
  createBlogController,
  deleteOneBlogByIdController,
  getAllBlogController,
  getLastestBlogController,
  getOneBlogByIdController,
  updateBlogController,
} from "../controllers/blog.controllers";
import { authTokenMiddleware } from "../utils/token";
import { createBlogMiddleware } from "../middlewares/blog.middlewares";

const blogRouters = Router();

blogRouters.get("/get-all-blogs", getAllBlogController);
blogRouters.get("/get-blog-latest", getLastestBlogController);
blogRouters.post(
  "/create-blog",
  createBlogMiddleware,
  authTokenMiddleware,
  createBlogController
);
blogRouters.patch(
  "/update-blog/:blogId",
  createBlogMiddleware,
  authTokenMiddleware,
  updateBlogController
);
blogRouters.get("/:blogId", getOneBlogByIdController);
blogRouters.delete(
  "/:blogId",
  authTokenMiddleware,
  deleteOneBlogByIdController
);

export default blogRouters;
