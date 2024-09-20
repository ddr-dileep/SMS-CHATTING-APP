import { Request, Response } from "express";
import blogModel from "../models/blog.models";
import apiResponse from "../utils/api.response";

export const getAllBlogController = async (req: Request, res: Response) => {
  try {
    const blogs = await blogModel.find();
    res
      .status(200)
      .json(
        apiResponse.SUCCESS(
          { count: blogs.length, blogs },
          "Blogs fetched successfully"
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(apiResponse.ERROR("server_error", "something went wrong"));
  }
};

export const getLastestBlogController = async (req: Request, res: Response) => {
  try {
    const blogs = await blogModel.find().sort({ createdAt: -1 }).limit(1);
    res
      .status(200)
      .json(
        apiResponse.SUCCESS(
          { count: blogs.length, blogs },
          "Lastest blog fetched successfully"
        )
      );
  } catch (error) {
    res
      .status(500)
      .json(apiResponse.ERROR("server_error", "something went wrong"));
  }
};

export const createBlogController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const existingBlog = await blogModel.findOne({
      title: req.body.title,
      author: req.user._id,
    });

    if (existingBlog) {
      return res
        .status(400)
        .json(
          apiResponse.ERROR(
            "duplicate_post",
            "Blog with the same title of author already exists"
          )
        );
    }

    const newBlog = new blogModel({ ...req.body, author: req.user._id });
    await newBlog.save();
    await newBlog.populate("author", "_id profilePicture username");

    res
      .status(201)
      .json(
        apiResponse.SUCCESS({ blog: newBlog }, "Blog created successfully")
      );
  } catch (error) {
    res.status(400).json(apiResponse.OTHER(error));
  }
};

export const updateBlogController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { blogId } = req.params;

    const existingBlog: any = await blogModel.findOne({
      title: req.body.title,
      author: req.user._id,
    });

    if (existingBlog && existingBlog._id.toString() !== blogId) {
      return res
        .status(400)
        .json(
          apiResponse.ERROR(
            "duplicate_post",
            "Blog with the same title of author already exists"
          )
        );
    }

    const updatedBlog = await blogModel.findByIdAndUpdate(blogId, req.body, {
      new: true,
    });

    if (!updatedBlog) {
      return res
        .status(404)
        .json(apiResponse.ERROR("not_found", "Blog not found"));
    }

    await updatedBlog.populate("author", "_id profilePicture username");

    res
      .status(200)
      .json(
        apiResponse.SUCCESS({ blog: updatedBlog }, "Blog updated successfully")
      );
  } catch (error) {
    res.status(400).json(apiResponse.OTHER(error));
  }
};

export const getOneBlogByIdController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const { blogId } = req.params;
    const blog = await blogModel.findById(blogId);

    if (!blog) {
      return res
        .status(404)
        .json(apiResponse.ERROR("not_found", "Blog not found"));
    }

    await blog.populate("author", "_id profilePicture username");

    res
      .status(200)
      .json(apiResponse.SUCCESS({ blog }, "Blog fetched successfully"));
  } catch (error) {
    res.status(400).json(apiResponse.OTHER(error));
  }
};
