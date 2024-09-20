import { Router } from "express";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  getoneCategoryByIdController,
  updateCategoryController,
} from "../controllers/category.controllers";
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
categoryRouters.get("/get-all", getAllCategoryController);
categoryRouters.patch(
  "/update/:categoryId",
  authTokenMiddleware,
  updateCategoryController
);
categoryRouters.delete(
  "/delete/:categoryId",
  authTokenMiddleware,
  deleteCategoryController
);
categoryRouters.get("/get-one/:categoryId", getoneCategoryByIdController);
