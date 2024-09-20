import { NextFunction, Request, Response } from "express";
import apiResponse from "../utils/api.response";

export const createCommentMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { content, blog } = req.body;
  if (!content || !blog) {
    return res.status(400).json(
      apiResponse.ERROR({
        content: content ? undefined : "Content is required",
        blog: blog ? undefined : "Blog-Id is required",
      })
    );
  }
  next();
};
