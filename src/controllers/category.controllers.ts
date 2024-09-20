import { Request, Response } from "express";
import apiResponse from "../utils/api.response";
import categoryModel from "../models/category.models";

export const createCategoryController = async (
  req: Request | any,
  res: Response
) => {
  try {
    const category = new categoryModel({
      ...req.body,
      createdBy: req.user._id,
    });
    await category.save();
    await category.populate("createdBy", "username _id profilePicture email");

    res
      .status(201)
      .json(apiResponse.SUCCESS({ category }, "Category created successfully"));
  } catch (error) {
    res.status(400).json(apiResponse.OTHER(error));
  }
};

export const getAllCategoryController = async (req: Request, res: Response) => {
  try {
    const categories = await categoryModel.find();

    res.json(
      apiResponse.SUCCESS({ categories }, "Categories fetched successfully")
    );
  } catch (error) {
    res.status(400).json(apiResponse.OTHER(error));
  }
};
