import { Document, model, Schema } from "mongoose";
import { Iuser } from "./user.models";

const chatSchema: Schema<IChat> = new Schema(
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

// Add a virtual field for usercount
chatSchema.virtual("user-count").get(function () {
  return this.users.length;
});

// Ensure virtuals are included when converting documents to JSON
chatSchema.set("toJSON", { virtuals: true });

const chatModel = model<IChat>("Chat", chatSchema);
export default chatModel;

export interface IChat extends Document {
  name: string;
  isGroupChat: boolean;
  users: Iuser[];
  usercount: number;
  latestMessage: any;
  groupAdmin: Iuser;
}
