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
