import { Document, model, Schema } from "mongoose";
import { Iuser } from "./user.models";

const chatSchema: Schema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    isGroupChat: { type: Boolean, default: false },
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
  name: string;
  isGroupChat: boolean;
  users: Iuser[];
  latestMessage: any;
  groupAdmin: Iuser;
}
