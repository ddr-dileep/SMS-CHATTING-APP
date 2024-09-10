import { NextFunction, Request, Response } from "express";
import apiResponse from "../utils/api.response";

export const registerUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, email } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json(
      apiResponse.ERROR({
        username: username ? undefined : "Username is required",
        password: password ? undefined : "Password is required",
        email: email ? undefined : "Email is required",
      })
    );
  }
  next();
};

export const loginUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json(
      apiResponse.ERROR({
        username: username ? undefined : "Username is required",
        password: password ? undefined : "Password is required",
      })
    );
  }
  next();
};
