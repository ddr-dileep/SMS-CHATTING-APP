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

export const deleteCommentController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { commentId } = req.params;

    // Check if the comment exists
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

    // Check if the user is the author of the comment
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

    // Delete the comment
    await existingComment.deleteOne();

    // Remove the comment ID from the blog post
    const blog: any = await blogModel.findById(existingComment.blog);
    if (blog) {
      blog.comments.pull(commentId);
      await blog.save();
    }

    res
      .status(200)
      .json(apiResponse.SUCCESS({}, "Comment deleted successfully"));
  } catch (error) {
    res.status(400).json(apiResponse.OTHER(error));
  }
};

export const getAllCommentOfBlogIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const blogId = req.params.blogId;

    const existingBlog: any = await blogModel.findById(blogId);
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

    const comments = await commentModel
      .find({ blog: blogId })
      .populate("author", "username email profilePicture");

    res
      .status(200)
      .json(
        apiResponse.SUCCESS(
          { count: comments.length, comments },
          "Comments fetched"
        )
      );
  } catch (error) {
    res.status(400).json(apiResponse.OTHER(error));
  }
};
