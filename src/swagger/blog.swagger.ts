export const blogSwagger = {
  "/blog/get-all-blogs": {
    get: {
      tags: ["Blog"],
      summary: "Retrieve all blogs",
      responses: {
        "200": {
          description: "Blogs fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Blogs fetched successfully",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "650f776e9e1dbf001a639ed5",
                        },
                        title: { type: "string", example: "Blog Title" },
                        content: {
                          type: "string",
                          example: "Blog content goes here.",
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
        "400": {
          description: "Error fetching blogs",
        },
      },
    },
  },

  "/blog/get-blog-latest": {
    get: {
      tags: ["Blog"],
      summary: "Retrieve the latest blog",
      responses: {
        "200": {
          description: "Latest blog fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Latest blog fetched successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "650f776e9e1dbf001a639ed5",
                      },
                      title: { type: "string", example: "Latest Blog Title" },
                      content: {
                        type: "string",
                        example: "Content of the latest blog.",
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
        "400": {
          description: "Error fetching latest blog",
        },
      },
    },
  },

  "/blog/create-blog": {
    post: {
      tags: ["Blog"],
      summary: "Create a new blog",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: { type: "string", example: "New Blog Title" },
                content: {
                  type: "string",
                  example: "This is the content of the new blog.",
                },
              },
              required: ["title", "content"],
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Blog created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Blog created successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      blog: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "650f776e9e1dbf001a639ed5",
                          },
                          title: { type: "string", example: "New Blog Title" },
                          content: {
                            type: "string",
                            example: "This is the content of the new blog.",
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

  "/blog/update-blog/{blogId}": {
    patch: {
      tags: ["Blog"],
      summary: "Update an existing blog",
      parameters: [
        {
          name: "blogId",
          in: "path",
          required: true,
          description: "ID of the blog to update",
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
                title: { type: "string", example: "Updated Blog Title" },
                content: { type: "string", example: "Updated content." },
              },
              required: ["title"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Blog updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Blog updated successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      updatedBlog: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "650f776e9e1dbf001a639ed5",
                          },
                          title: {
                            type: "string",
                            example: "Updated Blog Title",
                          },
                          content: {
                            type: "string",
                            example: "Updated content.",
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
          description: "Blog not found",
        },
      },
    },
  },

  "/blog/get-one-blog/{blogId}": {
    get: {
      tags: ["Blog"],
      summary: "Get a blog by ID",
      parameters: [
        {
          name: "blogId",
          in: "path",
          required: true,
          description: "ID of the blog to retrieve",
          schema: {
            type: "string",
            example: "650f776e9e1dbf001a639ed5",
          },
        },
      ],
      responses: {
        "200": {
          description: "Blog fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Blog fetched successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      blog: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "650f776e9e1dbf001a639ed5",
                          },
                          title: { type: "string", example: "Blog Title" },
                          content: {
                            type: "string",
                            example: "Content of the blog.",
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
          description: "Blog not found",
        },
        "400": {
          description: "Error retrieving blog",
        },
      },
    },
  },

  "/blog/delete-blog/{blogId}": {
    delete: {
      tags: ["Blog"],
      summary: "Delete a blog",
      parameters: [
        {
          name: "blogId",
          in: "path",
          required: true,
          description: "ID of the blog to delete",
          schema: {
            type: "string",
            example: "650f776e9e1dbf001a639ed5",
          },
        },
      ],
      responses: {
        "200": {
          description: "Blog deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Blog deleted successfully",
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Blog not found",
        },
        "400": {
          description: "Error deleting blog",
        },
      },
    },
  },

  "/blog/get-my-blogs": {
    get: {
      tags: ["Blog"],
      summary: "Retrieve all blogs of the authenticated author",
      responses: {
        "200": {
          description: "Blogs of the author fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Blogs of the author fetched successfully",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "650f776e9e1dbf001a639ed5",
                        },
                        title: { type: "string", example: "Blog Title" },
                        content: {
                          type: "string",
                          example: "Content of the blog.",
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
        "400": {
          description: "Error fetching author's blogs",
        },
      },
    },
  },

  "/blog/search": {
    get: {
      tags: ["Blog"],
      summary: "Search for blog posts",
      parameters: [
        {
          name: "query",
          in: "query",
          required: true,
          description: "Search term",
          schema: {
            type: "string",
            example: "blog",
          },
        },
      ],
      responses: {
        "200": {
          description: "Blogs matching the search term",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Search results fetched successfully",
                  },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "650f776e9e1dbf001a639ed5",
                        },
                        title: { type: "string", example: "Blog Title" },
                        content: {
                          type: "string",
                          example: "Content of the blog.",
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
        "400": {
          description: "Error during search",
        },
      },
    },
  },
};
