import { Document } from "mongoose";
import { model, Schema } from "mongoose";
import { Iuser } from "./user.models";
import { IChat } from "./chat.models";

const messageSchema: Schema = new Schema(
  {
    content: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
  },
  { timestamps: true }
);

const messageModel = model<IMessage>("Message", messageSchema);

export default messageModel;

export interface IMessage extends Document {
  content: string;
  sender: Iuser;
  receiver: Iuser;
  chat: IChat;
}
