import { Request, Response } from "express";
import apiResponse from "../utils/api.response";
import chatModel from "../models/chat.models";

export const createGroupController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { name } = req.body;
    const adminId = req.user._id;

    const existingGroup = await chatModel.findOne({
      name,
      groupAdmin: adminId,
    });

    if (existingGroup) {
      return res
        .status(400)
        .json(
          apiResponse.ERROR("duplicate", "Group with this name already exists")
        );
    }

    const reqBody = {
      ...req.body,
      isGroupChat: true,
      groupAdmin: adminId,
    };

    const group = new chatModel(reqBody);
    await group.save();

    res.json(apiResponse.SUCCESS({ group }, "Group created successfully"));
  } catch (error) {
    return res.status(400).json(apiResponse.OTHER(error));
  }
};
