import { Request, Response } from "express";
import apiResponse from "../utils/api.response";
import UserModal from "../models/user.models";
import { hashPassword, verifyPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/token";

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

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const user: any = await UserModal.findOne({ username: req.body.username });

    if (!user) {
      return res
        .status(401)
        .json(
          apiResponse.ERROR(
            "invalid_credentials",
            "User with the username " + req.body.username + " does not exist"
          )
        );
    }
    const passwordVerified = await verifyPassword(
      req.body.password,
      user.password
    );

    if (!passwordVerified) {
      return res
        .status(401)
        .json(apiResponse.ERROR("invalid_credentials", "Incorrect password"));
    }

    const token = await generateToken({
      _id: user._id,
      username: user.username,
      email: user.email,
      isActive: user.isActive,
    });

    res.json(apiResponse.SUCCESS({ token }, "User logged in successfully"));
  } catch (error) {
    return res.status(400).json(apiResponse.OTHER(error));
  }
};

export const getUserInfoController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const user = await UserModal.findById(req.user._id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json(apiResponse.ERROR("user_not_found", "User not found"));
    }

    res.json(
      apiResponse.SUCCESS({ user }, "User information retrieved successfully")
    );
  } catch (error) {
    return res.status(400).json(apiResponse.OTHER(error));
  }
};
