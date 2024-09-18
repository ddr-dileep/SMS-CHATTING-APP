export const messageSwagger = {
  "/api/v1/message/send-message": {
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
};
