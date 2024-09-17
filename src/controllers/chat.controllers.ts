import { Request, Response } from "express";
import apiResponse from "../utils/api.response";

export const createGroupController = async (req: Request, res: Response) => {
  try {
    // Create group logic here
    res.json(apiResponse.SUCCESS({}, "Group created successfully"));
  } catch (error) {
    return res.status(400).json(apiResponse.OTHER(error));
  }
};
