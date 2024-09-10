import { Request, Response } from "express";
import apiResponse from "../utils/api.response";
import UserModal from "../models/user.models";
import { hashPassword } from "../utils/bcrypt";

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const user = new UserModal({
      ...req.body,
      password: await hashPassword(req.body.password),
    });
    await user.save();

    res.json(
      apiResponse.SUCCESS({ user: req.body }, "User registered successfully")
    );
  } catch (error) {
    return res.status(400).json(apiResponse.OTHER(error));
  }
};
