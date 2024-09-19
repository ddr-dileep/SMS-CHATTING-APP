import { Router } from "express";
import { getAllBlogController } from "../controllers/blog.controllers";

const blogRouters = Router();

blogRouters.get("/get-all-blogs", getAllBlogController);

export default blogRouters;
