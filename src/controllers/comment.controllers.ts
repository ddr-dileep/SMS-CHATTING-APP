import { Request, Response } from "express";
import commentModel from "../models/comment.model";
import apiResponse from "../utils/api.response";
import blogModel from "../models/blog.models";
export const createCommentController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { content, blog } = req.body;
    const userId = req.user._id;

    const existingBlog: any = await blogModel.findById(blog);
    if (!existingBlog) {
      return res
        .status(400)
        .json(
          apiResponse.ERROR(
            "invalid_blog",
            "Invalid blog / blog does not exist"
          )
        );
    }

    const newComment = new commentModel({
      content,
      author: userId,
      blog,
    });

    await newComment.save();

    existingBlog.comments.push(newComment._id);
    await existingBlog.save();
    await newComment.populate("author", "username email profilePicture _id");
    await newComment.populate("blog", "title author");

    res
      .status(201)
      .json(
        apiResponse.SUCCESS(
          { comment: newComment },
          "Comment created successfully"
        )
      );
  } catch (error) {
    res.status(400).json(apiResponse.OTHER(error));
  }
};
