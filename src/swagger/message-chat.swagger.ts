export const messageSwagger = {
  "/message/send-message": {
    post: {
      tags: ["Message"],
      summary: "Send a message in a chat",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                content: {
                  type: "string",
                  example: "Hello, this is a test message.",
                },
                chat: {
                  type: "string",
                  example: "650f776e9e1dbf001a639ed5",
                },
              },
              required: ["content", "chat"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Message sent successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Message sent successfully",
                  },
                },
              },
            },
          },
        },
        "400": {
          description: "Invalid chat or missing parameters",
        },
      },
    },
  },

  "/message/get-chat-messages/{chatId}": {
    get: {
      tags: ["Message"],
      summary: "Retrieve all messages for a specific chat",
      description: "Fetches all messages in a chat, including sender details.",
      parameters: [
        {
          name: "chatId",
          in: "path",
          required: true,
          description: "ID of the chat to retrieve messages from",
          schema: {
            type: "string",
            example: "650f776e9e1dbf001a639ed5",
          },
        },
      ],
      responses: {
        "200": {
          description: "Messages retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Messages retrieved successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      count: { type: "number", example: 2 },
                      messages: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            _id: {
                              type: "string",
                              example: "650f776e9e1dbf001a639ed5",
                            },
                            content: {
                              type: "string",
                              example: "Hello, this is a test message.",
                            },
                            sender: {
                              type: "object",
                              properties: {
                                _id: {
                                  type: "string",
                                  example: "650dabc1234567890abcdef",
                                },
                                username: {
                                  type: "string",
                                  example: "johndoe",
                                },
                                profilePicture: {
                                  type: "string",
                                  example:
                                    "https://pics.craiyon.com/2023-11-24/nogjsbGmTRaAI8eYNclAQw.webp",
                                },
                              },
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
          description: "Invalid chat ID or other errors",
        },
      },
    },
  },

  "/message/delete-message/{messageId}": {
    delete: {
      tags: ["Message"],
      summary: "Delete a specific message",
      description: "Deletes a message identified by its ID.",
      parameters: [
        {
          name: "messageId",
          in: "path",
          required: true,
          description: "ID of the message to delete",
          schema: {
            type: "string",
            example: "650f776e9e1dbf001a639ed5",
          },
        },
      ],
      responses: {
        "200": {
          description: "Message deleted successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Message deleted successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      message: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "650f776e9e1dbf001a639ed5",
                          },
                          content: {
                            type: "string",
                            example: "Hello, this is a test message.",
                          },
                          sender: {
                            type: "string",
                            example: "650dabc1234567890abcdef",
                          },
                          chat: {
                            type: "string",
                            example: "650f776e9e1dbf001a639ed5",
                          },
                          createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2024-09-18T07:35:25.421Z",
                          },
                          __v: { type: "number", example: 0 },
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
          description: "Message not found",
        },
        "400": {
          description: "Bad request or other errors",
        },
      },
    },
  },

  "/message/update-message/{messageId}": {
    put: {
      tags: ["Message"],
      summary: "Update a specific message",
      description: "Updates the content of a message identified by its ID.",
      parameters: [
        {
          name: "messageId",
          in: "path",
          required: true,
          description: "ID of the message to update",
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
                content: {
                  type: "string",
                  example: "Updated message content.",
                },
              },
              required: ["content"],
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Message updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: { type: "boolean", example: true },
                  message: {
                    type: "string",
                    example: "Message updated successfully",
                  },
                  data: {
                    type: "object",
                    properties: {
                      message: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "650f776e9e1dbf001a639ed5",
                          },
                          content: {
                            type: "string",
                            example: "Updated message content.",
                          },
                          sender: {
                            type: "object",
                            properties: {
                              username: { type: "string" },
                              profilePicture: { type: "string" },
                              _id: { type: "string" },
                            },
                          },
                          chat: { type: "object" }, // Populate chat details as needed
                          createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2024-09-18T07:35:25.421Z",
                          },
                          updatedAt: {
                            type: "string",
                            format: "date-time",
                            example: "2024-09-18T07:35:25.421Z",
                          },
                          __v: { type: "number", example: 0 },
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
          description: "Message not found",
        },
        "400": {
          description: "Bad request or other errors",
        },
      },
    },
  },
};
