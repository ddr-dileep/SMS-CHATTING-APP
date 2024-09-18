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
      users: [...req.body.users, adminId],
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

export const deleteGroupController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { groupId } = req.params;
    const adminId = req.user._id;

    const group = await chatModel.findById(groupId);

    if (!group) {
      return res
        .status(404)
        .json(apiResponse.ERROR("not_found", "Group not found"));
    }

    if (group.groupAdmin.toString() !== adminId.toString()) {
      return res
        .status(403)
        .json(apiResponse.ERROR("forbidden", "You are not the group admin"));
    }

    await chatModel.findByIdAndDelete(groupId);

    res.json(apiResponse.SUCCESS({}, "Group deleted successfully"));
  } catch (error) {
    return res.status(400).json(apiResponse.OTHER(error));
  }
};

export const createChatController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const senderId = req.user._id;
    const { receiverId } = req.params;

    if (!receiverId) {
      return res
        .status(400)
        .json(apiResponse.ERROR("missing_params", "Receiver ID is required"));
    }

    // Check for an existing chat between the sender and receiver
    const existingChat = await chatModel
      .findOne({
        users: { $all: [senderId, receiverId] },
        $expr: { $eq: [{ $size: "$users" }, 2] },
      })
      .populate("users", "username email _id profilePicture");

    if (existingChat) {
      return res.json(
        apiResponse.SUCCESS({ chat: existingChat }, "Chat already exists")
      );
    }

    // Create a new chat if it doesn't exist
    const chat = new chatModel({
      name: "single-sender-receiver",
      users: [senderId, receiverId],
    });
    await chat.save();

    chat.populate("users", "username email _id profilePicture");

    res.json(apiResponse.SUCCESS({ chat }, "Chat created successfully"));
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

export const getOneChatController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const chatId = req.params.chatId;

    const chat = await chatModel
      .findById(chatId)
      .populate("users", "_id username email profilePicture")
      .populate("latestMessage");

    if (!chat) {
      return res
        .status(404)
        .json(apiResponse.ERROR("not found", "Chat not found"));
    }

    res.json(apiResponse.SUCCESS({ chat }, "Chat fetched successfully"));
  } catch (error) {
    return res.status(400).json(apiResponse.OTHER(error));
  }
};

export const updateChatInfoController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const chatId = req.params.chatId;
    const { name, groupChatProfilePicture } = req.body;

    const updatedChat = await chatModel
      .findByIdAndUpdate(
        chatId,
        { name, groupChatProfilePicture },
        { new: true }
      )
      .populate("users", "_id username email profilePicture");

    if (!updatedChat) {
      return res
        .status(404)
        .json(apiResponse.ERROR("not found", "Chat not found"));
    }

    res.json(
      apiResponse.SUCCESS(
        { chat: updatedChat },
        "Chat information updated successfully"
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
