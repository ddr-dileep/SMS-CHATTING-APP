import { Router } from "express";
import {
  getAllBlogController,
  getLastestBlogController,
} from "../controllers/blog.controllers";

const blogRouters = Router();

blogRouters.get("/get-all-blogs", getAllBlogController);
blogRouters.get("/get-blog-latest", getLastestBlogController);

export default blogRouters;
