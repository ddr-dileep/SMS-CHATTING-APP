import { Router } from "express";
import {
  createBlogController,
  deleteOneBlogByIdController,
  getAllBlogController,
  getAllBlogOfAuthorController,
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
blogRouters.get("/get-one-blog/:blogId", getOneBlogByIdController);
blogRouters.delete(
  "/delete-blog/:blogId",
  authTokenMiddleware,
  deleteOneBlogByIdController
);
blogRouters.get(
  "/get-my-blogs",
  authTokenMiddleware,
  getAllBlogOfAuthorController
);

export default blogRouters;
