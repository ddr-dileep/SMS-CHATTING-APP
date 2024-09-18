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
};
