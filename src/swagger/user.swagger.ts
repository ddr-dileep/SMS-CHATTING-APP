export const userSwagger = {
  "/user/register": {
    tag: "User",
    post: {
      tags: ["User"],
      summary: "Register a new user",
      description: "API to register a new user with required details.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                username: {
                  type: "string",
                  example: "johndoe",
                },
                password: {
                  type: "string",
                  example: "Password123!",
                },
                email: {
                  type: "string",
                  example: "johndoe@example.com",
                },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "User registered successfully",
        },
        "400": {
          description: "Bad request (validation errors or missing data)",
        },
      },
    },
  },
  "/user/login": {
    post: {
      tags: ["User"],
      summary: "Login user",
      description: "API to login user with required details.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                username: {
                  type: "string",
                  example: "johndoe",
                },
                password: {
                  type: "string",
                  example: "Password123!",
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "User Login successfully",
        },
        "400": {
          description: "Bad request (validation errors or missing data)",
        },
      },
    },
  },
  "/user/user-info": {
    get: {
      tags: ["User"],
      summary: "Get user information",
      description: "API to get user information using a Bearer token.",
      security: [
        {
          BearerAuth: [],
        },
      ],
      responses: {
        "200": {
          description: "User information retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: {
                    type: "string",
                    example: "johndoe",
                  },
                  email: {
                    type: "string",
                    example: "johndoe@example.com",
                  },
                },
              },
            },
          },
        },
        "401": {
          description: "Unauthorized (Invalid or missing token)",
        },
        "500": {
          description: "Server error",
        },
      },
    },
  },
  "/user/update-info": {
    patch: {
      tags: ["User"],
      summary: "Update user information",
      description: "API to update user information using a Bearer token.",
      security: [
        {
          BearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                username: {
                  type: "string",
                  example: "newusername",
                },
                email: {
                  type: "string",
                  example: "newemail@example.com",
                },
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "User information updated successfully",
        },
        "400": {
          description: "Bad request (validation errors or missing data)",
        },
        "401": {
          description: "Unauthorized (Invalid or missing token)",
        },
        "404": {
          description: "Not found (User not found)",
        },
        "500": {
          description: "Server error",
        },
      },
    },
  },
  "/user/delete-info": {
    delete: {
      tags: ["User"],
      summary: "Delete user information",
      description: "API to delete user information using a Bearer token.",
      security: [
        {
          BearerAuth: [],
        },
      ],
      responses: {
        "200": {
          description: "User information deleted successfully",
        },
        "401": {
          description: "Unauthorized (Invalid or missing token)",
        },
        "404": {
          description: "Not found (User not found)",
        },
        "500": {
          description: "Server error",
        },
      },
    },
  },
  "/user/get-all": {
    get: {
      tags: ["User"],
      summary: "Get all users",
      description:
        "API to get a list of all users, excluding the current user, using a Bearer token.",
      security: [
        {
          BearerAuth: [],
        },
      ],
      responses: {
        "200": {
          description: "List of users retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  count: {
                    type: "integer",
                    example: 10,
                  },
                  users: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        username: {
                          type: "string",
                          example: "johndoe",
                        },
                        email: {
                          type: "string",
                          example: "johndoe@example.com",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "401": {
          description: "Unauthorized (Invalid or missing token)",
        },
        "500": {
          description: "Server error",
        },
      },
    },
  },
  "/user/all-user": {
    get: {
      tags: ["User"],
      summary: "Search users",
      description:
        "API to search for users by username or email using a Bearer token.",
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "search",
          in: "query",
          required: true,
          schema: {
            type: "string",
            example: "johndoe",
          },
        },
      ],
      responses: {
        "200": {
          description: "Search results retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  count: {
                    type: "integer",
                    example: 5,
                  },
                  users: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        username: {
                          type: "string",
                          example: "johndoe",
                        },
                        email: {
                          type: "string",
                          example: "johndoe@example.com",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "401": {
          description: "Unauthorized (Invalid or missing token)",
        },
        "500": {
          description: "Server error",
        },
      },
    },
  },
};
