import { Request, Response } from "express";
import apiResponse from "../utils/api.response";
import messageModel from "../models/message.models";
import chatModel from "../models/chat.models";

export const sendMessageController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const sender = req.user._id;
    const { content, chat } = req.body;
    const validChat = await chatModel.findById(chat);
    if (!validChat) {
      return res
        .status(400)
        .json(apiResponse.ERROR("invalid_chat", "Invalid chat"));
    }
    const message = new messageModel({
      sender,
      content,
      chat,
    });

    await message.save();

    await message.populate("sender", "username email profilePicture _id");
    await message.populate("chat");

    return res.json(
      apiResponse.SUCCESS({ message }, "Message sent successfully")
    );
  } catch (error) {
    return res.status(400).json(apiResponse.OTHER(error));
  }
};

export const getAllmessagesController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const chatId = req.params.chatId;
    const messages = await messageModel
      .find({ chat: chatId })
      .populate("sender", "username profilePicture _id")
      .select("-__v -updatedAt")
      .sort({ createdAt: -1 });

    return res.json(
      apiResponse.SUCCESS(
        { count: messages.length, messages },
        "Messages retrieved successfully"
      )
    );
  } catch (error) {
    return res.status(400).json(apiResponse.OTHER(error));
  }
};

export const deleteMessageController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { messageId } = req.params;
    const message = await messageModel.findByIdAndDelete(messageId);

    if (!message) {
      return res
        .status(404)
        .json(apiResponse.ERROR("not_found", "Message not found"));
    }

    return res.json(
      apiResponse.SUCCESS({ message }, "Message deleted successfully")
    );
  } catch (error) {
    return res.status(400).json(apiResponse.OTHER(error));
  }
};

export const updateMessageController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { messageId } = req.params;
    const { content } = req.body;
    const message = await messageModel.findByIdAndUpdate(
      messageId,
      { content },
      { new: true }
    );

    if (!message) {
      return res
        .status(404)
        .json(apiResponse.ERROR("not_found", "Message not found"));
    }

    await message.populate("sender", "username profilePicture _id");
    await message.populate("chat");

    return res.json(
      apiResponse.SUCCESS({ message }, "Message updated successfully")
    );
  } catch (error) {
    return res.status(400).json(apiResponse.OTHER(error));
  }
};

export const getOneMessageController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { messageId } = req.params;
    const message = await messageModel
      .findById(messageId)
      .populate("sender", "username profilePicture _id")
      .populate("chat");

    if (!message) {
      return res
        .status(404)
        .json(apiResponse.ERROR("not_found", "Message not found"));
    }

    return res.json(
      apiResponse.SUCCESS({ message }, "Message retrieved successfully")
    );
  } catch (error) {
    return res.status(400).json(apiResponse.OTHER(error));
  }
};

export const searchMessagesController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const chatId = req.query.chatId as string;
    const searchText = req.query.searchText as string;
    const userId = req.user._id; // Logged-in user's ID

    let query: any;

    if (chatId) {
      // Search within a specific chat if chatId is provided
      query = { chat: chatId };
    } else {
      // Search across all chats related to the logged-in user and their contacts
      const userChats = await chatModel.find({ users: userId }).select("_id");
      const chatIds = userChats.map((c) => c._id);

      // Add chats where the user’s contacts have sent messages
      const contactsChats = await chatModel
        .find({ users: { $in: [userId] } })
        .select("_id");
      const allChatIds = [
        ...new Set([...chatIds, ...contactsChats.map((c) => c._id)]),
      ]; // Combine and deduplicate chat IDs

      query = { chat: { $in: allChatIds } };
    }

    // If searchText is provided, search for messages containing parts of the text
    if (searchText) {
      query.content = {
        $regex: searchText
          .split(" ")
          .map((word) => `.*${word}.*`)
          .join("|"),
        $options: "i",
      };
    }

    const messages = await messageModel
      .find(query)
      .populate("sender", "username profilePicture _id")
      .select("-__v -updatedAt")
      .sort({ createdAt: -1 });

    return res.json(
      apiResponse.SUCCESS(
        { count: messages.length, messages },
        "Messages retrieved successfully"
      )
    );
  } catch (error: any) {
    return res
      .status(500)
      .json(
        apiResponse.ERROR(
          "search_error",
          "An error occurred while searching for messages."
        )
      );
  }
};
