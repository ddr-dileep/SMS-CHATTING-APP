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
};
