import { Document } from "mongoose";
import { model, Schema } from "mongoose";
import { Iuser } from "./user.models";
import { IBlog } from "./blog.models";

const commentSchema: Schema = new Schema(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    createdAt: { type: Date, default: Date.now },
    replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const commentModel = model<IComment>("Comment", commentSchema);
export default commentModel;

export interface IComment extends Document {
  content: string;
  author: Iuser;
  blog: IBlog;
  createdAt: Date;
  replies: IComment[];
}
