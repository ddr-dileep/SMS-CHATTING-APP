export const groupChatSwagger = {
  "/chat/create-group": {
    post: {
      tags: ["Group-chat"],
      summary: "Create a group chat",
      description:
        "Authenticated users can create a group chat and become the admin.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "My New Group",
                },
                users: {
                  type: "array",
                  items: {
                    type: "string",
                    example: "66e049ecea2be74fb465300f",
                  },
                },
                groupChatProfilePicture: {
                  type: "string",
                  example: "https://example.com/group-picture.webp",
                },
              },
              required: ["name", "users"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Group created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Group created successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      group: {
                        type: "object",
                        properties: {
                          name: { type: "string", example: "Test GRP 03" },
                          users: {
                            type: "array",
                            items: {
                              type: "string",
                              example: "66e049ecea2be74fb465300f",
                            },
                          },
                          groupChatProfilePicture: {
                            type: "string",
                            example: "https://example.com/group-picture.webp",
                          },
                          groupAdmin: {
                            type: "string",
                            example: "66dffa3fad37b8d8d6870028",
                          },
                          _id: {
                            type: "string",
                            example: "66ea82bd4f5b7fbb07a03e26",
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
          description: "Validation errors or duplicate group name",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: {
                    type: "string",
                    example: "Group with this name already exists",
                  },
                  error: { type: "string", example: "duplicate" },
                },
              },
            },
          },
        },
      },
    },
  },

  "/chat/delete-group/{groupId}": {
    delete: {
      tags: ["Group-chat"],
      summary: "Delete a group chat",
      description:
        "Deletes a group chat if the authenticated user is the group admin.",
      parameters: [
        {
          name: "groupId",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "66ea82bd4f5b7fbb07a03e26",
          },
          description: "ID of the group to be deleted",
        },
      ],
      responses: {
        "200": {
          description: "Group deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Group deleted successfully",
                  },
                  data: { type: "object" },
                },
              },
            },
          },
        },
        "403": {
          description: "User is not the group admin",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: {
                    type: "string",
                    example: "You are not the group admin",
                  },
                  error: { type: "string", example: "forbidden" },
                },
              },
            },
          },
        },
        "404": {
          description: "Group not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: {
                    type: "string",
                    example: "Group not found",
                  },
                  error: { type: "string", example: "not_found" },
                },
              },
            },
          },
        },
        "400": {
          description: "Bad request or other errors",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: {
                    type: "string",
                    example: "An error occurred",
                  },
                  error: { type: "string", example: "Error message" },
                },
              },
            },
          },
        },
      },
    },
  },

  "/chat/add-member": {
    post: {
      tags: ["Group-chat"],
      summary: "Add a member to a group chat",
      description:
        "Adds a user to a group chat. Only authenticated users can add members to a group.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userId: {
                  type: "string",
                  example: "66e049ecea2be74fb465300f",
                  description: "ID of the user to be added",
                },
                chatId: {
                  type: "string",
                  example: "66ea82bd4f5b7fbb07a03e26",
                  description: "ID of the group chat",
                },
              },
              required: ["userId", "chatId"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "User added to the group successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "User added to the group successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      group: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "66ea82bd4f5b7fbb07a03e26",
                          },
                          users: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                _id: {
                                  type: "string",
                                  example: "66e049ecea2be74fb465300f",
                                },
                                username: {
                                  type: "string",
                                  example: "john_doe",
                                },
                                email: {
                                  type: "string",
                                  example: "john.doe@example.com",
                                },
                                profilePicture: {
                                  type: "string",
                                  example: "https://example.com/john-pic.webp",
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
          },
        },
        "400": {
          description: "Bad request or validation error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: {
                    type: "string",
                    example: "User is already a member of the group",
                  },
                  error: { type: "string", example: "duplicate" },
                },
              },
            },
          },
        },
        "404": {
          description: "Group not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: {
                    type: "string",
                    example: "Chat not found",
                  },
                  error: { type: "string", example: "not found" },
                },
              },
            },
          },
        },
      },
    },
  },

  "/chat/remove-member": {
    post: {
      tags: ["Group-chat"],
      summary: "Remove a member from a group chat",
      description:
        "Removes a user from a group chat. Only authenticated users can remove members.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userId: {
                  type: "string",
                  example: "66e049ecea2be74fb465300f",
                  description: "ID of the user to be removed",
                },
                chatId: {
                  type: "string",
                  example: "66ea82bd4f5b7fbb07a03e26",
                  description: "ID of the group chat",
                },
              },
              required: ["userId", "chatId"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "User removed from the group successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "User removed from the group successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      group: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "66ea82bd4f5b7fbb07a03e26",
                          },
                          users: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                _id: {
                                  type: "string",
                                  example: "66e049ecea2be74fb465300f",
                                },
                                username: {
                                  type: "string",
                                  example: "john_doe",
                                },
                                email: {
                                  type: "string",
                                  example: "john.doe@example.com",
                                },
                                profilePicture: {
                                  type: "string",
                                  example: "https://example.com/john-pic.webp",
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
          },
        },
        "400": {
          description: "Bad request or validation error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: {
                    type: "string",
                    example: "User is not part of the group or already removed",
                  },
                  error: { type: "string", example: "not found" },
                },
              },
            },
          },
        },
        "404": {
          description: "Group not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: {
                    type: "string",
                    example: "Chat not found",
                  },
                  error: { type: "string", example: "not found" },
                },
              },
            },
          },
        },
      },
    },
  },

  "/chat/get-chat/{chatId}": {
    get: {
      tags: ["Group-chat"],
      summary: "Get details of a specific chat",
      description:
        "Fetches the details of a specific chat by its ID. Only authenticated users can fetch chat details.",
      parameters: [
        {
          name: "chatId",
          in: "path",
          required: true,
          schema: {
            type: "string",
            example: "66ea82bd4f5b7fbb07a03e26",
          },
          description: "ID of the chat to fetch",
        },
      ],
      responses: {
        "200": {
          description: "Chat fetched successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Chat fetched successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      chat: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "66ea82bd4f5b7fbb07a03e26",
                          },
                          users: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                _id: {
                                  type: "string",
                                  example: "66e049ecea2be74fb465300f",
                                },
                                username: {
                                  type: "string",
                                  example: "john_doe",
                                },
                                email: {
                                  type: "string",
                                  example: "john.doe@example.com",
                                },
                                profilePicture: {
                                  type: "string",
                                  example: "https://example.com/john-pic.webp",
                                },
                              },
                            },
                          },
                          latestMessage: {
                            type: "object",
                            properties: {
                              _id: {
                                type: "string",
                                example: "66f2d2fead7b7d102a50678d",
                              },
                              content: {
                                type: "string",
                                example: "Hello, how are you?",
                              },
                              sender: {
                                type: "string",
                                example: "66e049ecea2be74fb465300f",
                              },
                              createdAt: {
                                type: "string",
                                example: "2024-08-10T10:30:00Z",
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
        },
        "404": {
          description: "Chat not found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: {
                    type: "string",
                    example: "Chat not found",
                  },
                  error: { type: "string", example: "not found" },
                },
              },
            },
          },
        },
        "400": {
          description: "Bad request",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: false },
                  message: {
                    type: "string",
                    example: "Invalid request",
                  },
                  error: { type: "string", example: "error details" },
                },
              },
            },
          },
        },
      },
    },
  },
};
