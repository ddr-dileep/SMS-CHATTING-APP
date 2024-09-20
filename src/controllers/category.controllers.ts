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

export const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      req.body,
      { new: true }
    );

    res
      .status(200)
      .json(
        apiResponse.SUCCESS(
          { updatedCategory },
          "Category updated successfully"
        )
      );
  } catch (error) {
    res.status(400).json(apiResponse.OTHER(error));
  }
};

export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    
    const exitingCategory = await categoryModel.findById(categoryId);
    if (!exitingCategory) {
      return res
        .status(404)
        .json(apiResponse.ERROR("not_found", "Category not found"));
    }

    await categoryModel.findByIdAndDelete(categoryId);

    res.json(apiResponse.SUCCESS({}, "Category deleted successfully"));
  } catch (error) {
    res.status(400).json(apiResponse.OTHER(error));
  }
};
