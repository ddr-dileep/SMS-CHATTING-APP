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

export const updateCommentController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const existingComment = await commentModel.findById(commentId);
    if (!existingComment) {
      return res
        .status(400)
        .json(
          apiResponse.ERROR(
            "invalid_comment",
            "Invalid comment / comment does not exist"
          )
        );
    }

    if (existingComment.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json(
          apiResponse.ERROR(
            "forbidden",
            "You are not the author of this comment"
          )
        );
    }

    existingComment.content = content;
    await existingComment.save();

    await existingComment.populate(
      "author",
      "username email profilePicture _id"
    );
    await existingComment.populate("blog", "title author");
    res
      .status(200)
      .json(
        apiResponse.SUCCESS(
          { comment: existingComment },
          "comment updated successfully"
        )
      );
  } catch (error) {
    res.status(400).json(apiResponse.OTHER(error));
  }
};
