import { NextFunction, Request, Response } from "express";
import apiResponse from "../utils/api.response";

export const createBlogMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json(
      apiResponse.ERROR({
        title: title ? undefined : "Title is required",
        content: content ? undefined : "Content is required",
      })
    );
  }
  next();
};
