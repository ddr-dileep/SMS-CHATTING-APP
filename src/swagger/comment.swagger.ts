export const commentSwagger = {
  "/comment/create": {
    post: {
      tags: ["Comments"],
      summary: "Create a new comment",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                content: {
                  type: "string",
                  example: "This is a new comment.",
                },
                blogId: {
                  type: "string",
                  example: "650f776e9e1dbf001a639ed5",
                },
                parentId: {
                  type: "string",
                  example: "650f776e9e1dbf001a639ed6",
                },
              },
              required: ["content", "blogId"],
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Comment created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Comment created successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      comment: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "650f776e9e1dbf001a639ed7",
                          },
                          content: {
                            type: "string",
                            example: "This is a new comment.",
                          },
                          blogId: {
                            type: "string",
                            example: "650f776e9e1dbf001a639ed5",
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

  "/comment/update/{commentId}": {
    patch: {
      tags: ["Comments"],
      summary: "Update an existing comment",
      parameters: [
        {
          name: "commentId",
          in: "path",
          required: true,
          description: "ID of the comment to update",
          schema: {
            type: "string",
            example: "650f776e9e1dbf001a639ed7",
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
                content: {
                  type: "string",
                  example: "Updated comment content.",
                },
              },
              required: ["content"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Comment updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Comment updated successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      updatedComment: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "650f776e9e1dbf001a639ed7",
                          },
                          content: {
                            type: "string",
                            example: "Updated comment content.",
                          },
                          blogId: {
                            type: "string",
                            example: "650f776e9e1dbf001a639ed5",
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
          description: "Comment not found",
        },
      },
    },
  },

  "/comment/delete/{commentId}": {
    patch: {
      tags: ["Comments"],
      summary: "Delete a comment",
      parameters: [
        {
          name: "commentId",
          in: "path",
          required: true,
          description: "ID of the comment to delete",
          schema: {
            type: "string",
            example: "650f776e9e1dbf001a639ed7",
          },
        },
      ],
      responses: {
        "200": {
          description: "Comment deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Comment deleted successfully",
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Comment not found",
        },
        "400": {
          description: "Error deleting comment",
        },
      },
    },
  },

  "/comment/get-all-comments/{blogId}": {
    get: {
      tags: ["Comments"],
      summary: "Get all comments for a specific blog post",
      parameters: [
        {
          name: "blogId",
          in: "path",
          required: true,
          description: "ID of the blog post",
          schema: {
            type: "string",
            example: "650f776e9e1dbf001a639ed5",
          },
        },
      ],
      responses: {
        "200": {
          description: "Comments fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Comments fetched successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      comments: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            _id: {
                              type: "string",
                              example: "650f776e9e1dbf001a639ed7",
                            },
                            content: {
                              type: "string",
                              example: "This is a new comment.",
                            },
                            blogId: {
                              type: "string",
                              example: "650f776e9e1dbf001a639ed5",
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
          description: "Error fetching comments",
        },
      },
    },
  },

  "/comment/get-comment/{commentId}": {
    get: {
      tags: ["Comments"],
      summary: "Get a comment by ID",
      parameters: [
        {
          name: "commentId",
          in: "path",
          required: true,
          description: "ID of the comment to retrieve",
          schema: {
            type: "string",
            example: "650f776e9e1dbf001a639ed7",
          },
        },
      ],
      responses: {
        "200": {
          description: "Comment fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Comment fetched successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      comment: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "650f776e9e1dbf001a639ed7",
                          },
                          content: {
                            type: "string",
                            example: "This is a new comment.",
                          },
                          blogId: {
                            type: "string",
                            example: "650f776e9e1dbf001a639ed5",
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
          description: "Comment not found",
        },
        "400": {
          description: "Error retrieving comment",
        },
      },
    },
  },

  "/comment/like-comment/{commentId}": {
    patch: {
      tags: ["Comments"],
      summary: "Like or unlike a comment",
      parameters: [
        {
          name: "commentId",
          in: "path",
          required: true,
          description: "ID of the comment to like/unlike",
          schema: {
            type: "string",
            example: "650f776e9e1dbf001a639ed7",
          },
        },
      ],
      responses: {
        "200": {
          description: "Comment liked/unliked successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Comment liked successfully",
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Comment not found",
        },
        "400": {
          description: "Error liking/unliking comment",
        },
      },
    },
  },
};
