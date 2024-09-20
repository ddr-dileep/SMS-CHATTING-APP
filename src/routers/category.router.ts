import { Router } from "express";
import { createCategoryController } from "../controllers/category.controllers";
import { authTokenMiddleware } from "../utils/token";
import { creatCategoryMiddleware } from "../middlewares/category.middlewares";

const categoryRouters = Router();
export default categoryRouters;

categoryRouters.post(
  "/create",
  creatCategoryMiddleware,
  authTokenMiddleware,
  createCategoryController
);
