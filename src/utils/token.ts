import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import apiResponse from "./api.response";

export const generateToken = (data: Object): string => {
  return JWT.sign(data, process.env.TOKEN_SECRET_KEY!, { expiresIn: "2d" });
};

export const authTokenMiddleware = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json(apiResponse.ERROR("unauthorized", "Token not found"));
  }

  try {
    const decoded = JWT.verify(token, process.env.TOKEN_SECRET_KEY!);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json(apiResponse.ERROR("unauthorized", "Invalid token"));
  }
};
