import { NextFunction, Request, Response } from "express";
import apiResponse from "../utils/api.response";

export const creatCategoryMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json(
      apiResponse.ERROR({
        name: name ? undefined : "Category name is required",
      })
    );
  }
  next();
};
