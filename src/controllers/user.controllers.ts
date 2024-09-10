import { Request, Response } from "express";
import apiResponse from "../utils/api.response";
import UserModal from "../models/user.models";

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const user = new UserModal(req.body);
    await user.save();

    res.json(apiResponse.SUCCESS({ user }, "User registered successfully"));
  } catch (error) {
    apiResponse.OTHER(error);
  }
};
