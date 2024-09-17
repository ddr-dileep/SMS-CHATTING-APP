import { NextFunction, Request, Response } from "express";
import apiResponse from "../utils/api.response";

export const createGroupMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, users } = req.body;
  if (!name || !users) {
    return res.status(400).json(
      apiResponse.ERROR({
        name: name ? undefined : "Group Name is required",
        users:
          users && users?.length >= 1
            ? undefined
            : "Group must have at least 2 users",
      })
    );
  }
  next();
};
