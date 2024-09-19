import { model, Schema } from "mongoose";

const blogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String },
    content: { type: String, required: true },
    images: [{ type: String }],
    videos: [{ type: String }],
    tags: [{ type: String }],
    publishedAt: { type: Date, default: new Date() },
    isPublished: { type: Boolean, default: false },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        default: "public",
      },
    ],
    views: [{ type: Schema.Types.ObjectId, ref: "User" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    sharedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    sharedTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const blogModel = model<IBlog>("Blog", blogSchema);
export default blogModel;

export interface IBlog extends Document {}
