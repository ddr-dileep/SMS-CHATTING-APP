import mongoose from "mongoose";

const apiResponse = {
  SUCCESS: (data?: any, message?: string) => {
    const response = {
      success: true,
      message: message || "Success",
      data,
      error: null,
    };
    return response;
  },

  ERROR: (error?: any, message?: string) => {
    const response = {
      success: false,
      message: message || "Something went wrong",
      data: null,
      error,
    };
    return response;
  },

  OTHER: (error: any) => {
    if (error.code === 11000) {
      const duplicateKey = Object.keys(error.keyValue)[0];
      const duplicateValue = error.keyValue[duplicateKey];
      const errorMessage = `Duplicate value for key: ${duplicateKey} (${duplicateValue})`;

      return apiResponse.ERROR("duplicate_error", errorMessage);
    }

    if (
      error instanceof mongoose.Error.CastError &&
      error.kind === "ObjectId"
    ) {
      return apiResponse.ERROR(
        "invalid_id_error",
        "Invalid ID format provided."
      );
    }

    return apiResponse.ERROR(
      "something_went_wrong",
      error.message || "An unknown error occurred."
    );
  },
};

export default apiResponse;
