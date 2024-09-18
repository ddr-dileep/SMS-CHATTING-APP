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

export const addUserToGroupController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { userId, chatId } = req.body;

    const group = await chatModel
      .findById(chatId)
      .populate("users", "_id username email profilePicture");

    if (!group) {
      return res
        .status(400)
        .json(apiResponse.ERROR("not found", "Chat not found"));
    }

    const isUserAlreadyInGroup = group.users.some(
      (user: any) => user._id.toString() === userId
    );

    if (isUserAlreadyInGroup) {
      return res
        .status(400)
        .json(
          apiResponse.ERROR(
            "duplicate",
            "User is already a member of the group"
          )
        );
    }

    group.users.push(userId);
    await group.save();

    res.json(
      apiResponse.SUCCESS({ group }, "User added to the group successfully")
    );
  } catch (error) {
    return res.status(400).json(apiResponse.OTHER(error));
  }
};

export const removeUserToGroupController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { userId, chatId } = req.body;

    // Find the group to check if the user is exit
    const group = await chatModel
      .findById(chatId)
      .populate("users", "_id username email profilePicture");

    if (!group) {
      return res
        .status(400)
        .json(apiResponse.ERROR("not found", "Chat not found"));
    }

    // Check if the user exists in the group
    const userExists = group.users.some(
      (user: any) => user._id.toString() === userId
    );

    if (!userExists) {
      return res
        .status(400)
        .json(
          apiResponse.ERROR(
            "not found",
            "User is not part of the group or already removed"
          )
        );
    }

    // If user exists, then remove user
    const updatedGroup = await chatModel
      .findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true })
      .populate("users", "_id username email profilePicture");

    res.json(
      apiResponse.SUCCESS(
        { group: updatedGroup },
        "User removed from the group successfully"
      )
    );
  } catch (error) {
    return res.status(400).json(apiResponse.OTHER(error));
  }
};

export const getAllChatsControllers = async (
  req: Request | any,
  res: Response
) => {
  try {
    const chats = await chatModel
      .find({
        $or: [{ users: { $in: [req.user._id] } }, { groupAdmin: req.user._id }],
      })
      .populate("users", "_id username email profilePicture");

    res.json(apiResponse.SUCCESS({ chats }, "Chats fetched successfully"));
  } catch (error) {
    return res.status(400).json(apiResponse.OTHER(error));
  }
};
