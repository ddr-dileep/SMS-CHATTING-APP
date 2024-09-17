import { Request, Response } from "express";
import apiResponse from "../utils/api.response";
import messageModel from "../models/message.models";

export const sendMessageController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const sender = req.user._id;
    const { content, chat } = req.body;
    const message = new messageModel({
      sender,
      content,
      chat,
    });

    return res.json(
      apiResponse.SUCCESS({ message }, "Message sent successfully")
    );
  } catch (error) {
    return res.status(400).json(apiResponse.OTHER(error));
  }
};
