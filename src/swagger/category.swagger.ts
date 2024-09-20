export const categorySwagger = {
  "/category/create": {
    post: {
      tags: ["Category"],
      summary: "Create a new category",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "New Category",
                },
                description: {
                  type: "string",
                  example: "This is a new category.",
                },
              },
              required: ["name", "description"],
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Category created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Category created successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      category: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "650f776e9e1dbf001a639ed5",
                          },
                          name: { type: "string", example: "New Category" },
                          description: {
                            type: "string",
                            example: "This is a new category.",
                          },
                          createdBy: {
                            type: "string",
                            example: "650dabc1234567890abcdef",
                          },
                          createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2024-09-18T07:35:25.421Z",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "400": {
          description: "Invalid input data",
        },
      },
    },
  },

  "/category/get-all": {
    get: {
      tags: ["Category"],
      summary: "Retrieve all categories",
      responses: {
        "200": {
          description: "Categories fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Categories fetched successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      categories: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            _id: {
                              type: "string",
                              example: "650f776e9e1dbf001a639ed5",
                            },
                            name: { type: "string", example: "Category 1" },
                            description: {
                              type: "string",
                              example: "Description of Category 1",
                            },
                            createdBy: {
                              type: "string",
                              example: "650dabc1234567890abcdef",
                            },
                            createdAt: {
                              type: "string",
                              format: "date-time",
                              example: "2024-09-18T07:35:25.421Z",
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "400": {
          description: "Error fetching categories",
        },
      },
    },
  },

  "/category/update/{categoryId}": {
    patch: {
      tags: ["Category"],
      summary: "Update an existing category",
      parameters: [
        {
          name: "categoryId",
          in: "path",
          required: true,
          description: "ID of the category to update",
          schema: {
            type: "string",
            example: "650f776e9e1dbf001a639ed5",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string", example: "Updated Category Name" },
                description: {
                  type: "string",
                  example: "Updated description.",
                },
              },
              required: ["name"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Category updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Category updated successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      updatedCategory: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "650f776e9e1dbf001a639ed5",
                          },
                          name: {
                            type: "string",
                            example: "Updated Category Name",
                          },
                          description: {
                            type: "string",
                            example: "Updated description.",
                          },
                          createdBy: {
                            type: "string",
                            example: "650dabc1234567890abcdef",
                          },
                          createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2024-09-18T07:35:25.421Z",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "400": {
          description: "Invalid input data",
        },
        "404": {
          description: "Category not found",
        },
      },
    },
  },

  "/category/delete/{categoryId}": {
    delete: {
      tags: ["Category"],
      summary: "Delete a category",
      parameters: [
        {
          name: "categoryId",
          in: "path",
          required: true,
          description: "ID of the category to delete",
          schema: {
            type: "string",
            example: "650f776e9e1dbf001a639ed5",
          },
        },
      ],
      responses: {
        "200": {
          description: "Category deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Category deleted successfully",
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Category not found",
        },
        "400": {
          description: "Error deleting category",
        },
      },
    },
  },

  "/category/get-one/{categoryId}": {
    get: {
      tags: ["Category"],
      summary: "Get a category by ID",
      parameters: [
        {
          name: "categoryId",
          in: "path",
          required: true,
          description: "ID of the category to retrieve",
          schema: {
            type: "string",
            example: "650f776e9e1dbf001a639ed5",
          },
        },
      ],
      responses: {
        "200": {
          description: "Category fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Category fetched successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      category: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "650f776e9e1dbf001a639ed5",
                          },
                          name: { type: "string", example: "Category 1" },
                          description: {
                            type: "string",
                            example: "Description of Category 1",
                          },
                          createdBy: {
                            type: "string",
                            example: "650dabc1234567890abcdef",
                          },
                          createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2024-09-18T07:35:25.421Z",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Category not found",
        },
        "400": {
          description: "Error retrieving category",
        },
      },
    },
  },
};
