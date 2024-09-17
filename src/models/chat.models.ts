import { Document, model, Schema } from "mongoose";
import { Iuser } from "./user.models";

const chatSchema: Schema = new Schema(
  {
    isGroupChat: { type: Boolean, default: false },
    name: { type: String, trim: true, required: true },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const chatModel = model<IChat>("Chat", chatSchema);
export default chatModel;

export interface IChat extends Document {
  chatName: string;
  isGroupChat: boolean;
  users: Iuser[];
  latestMessage: any;
  groupAdmin: Iuser;
}
