import { Request, Response } from "express";
import apiResponse from "../utils/api.response";

export const registerUserController = (req: Request, res: Response) => {
  try {
    res.json(apiResponse.SUCCESS({}, "User registered successfully"));
  } catch (error) {
    apiResponse.OTHER(error);
  }
};
