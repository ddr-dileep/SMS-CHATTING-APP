export const groupChatSwagger = {
  "/api/v1/chat/create-group": {
    post: {
      tags: ["Group-chat"],
      summary: "Create a new group chat",
      description:
        "API to create a new group chat with a name and other details. Only an authenticated user can create a group and becomes the group admin.",
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
                  description: "The name of the group chat",
                },
                users: {
                  type: "array",
                  items: {
                    type: "string",
                    example: "66e049ecea2be74fb465300f",
                  },
                  description: "An array of user IDs to add to the group",
                },
                groupChatProfilePicture: {
                  type: "string",
                  example:
                    "https://pics.craiyon.com/2023-11-24/nogjsbGmTRaAI8eYNclAQw.webp",
                  description: "URL of the group chat profile picture",
                },
                isGroupChat: {
                  type: "boolean",
                  example: true,
                  description:
                    "Flag indicating that this is a group chat. Default is true.",
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
                  success: {
                    type: "boolean",
                    example: true,
                  },
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
                          name: {
                            type: "string",
                            example: "Test GRP 03",
                          },
                          isGroupChat: {
                            type: "boolean",
                            example: true,
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
                            example:
                              "https://pics.craiyon.com/2023-11-24/nogjsbGmTRaAI8eYNclAQw.webp",
                          },
                          groupAdmin: {
                            type: "string",
                            example: "66dffa3fad37b8d8d6870028",
                          },
                          _id: {
                            type: "string",
                            example: "66ea82bd4f5b7fbb07a03e26",
                          },
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
                          __v: {
                            type: "integer",
                            example: 0,
                          },
                          "user-count": {
                            type: "integer",
                            example: 2,
                          },
                          id: {
                            type: "string",
                            example: "66ea82bd4f5b7fbb07a03e26",
                          },
                        },
                      },
                    },
                  },
                  error: {
                    type: "string",
                    nullable: true,
                    example: null,
                  },
                },
              },
            },
          },
        },
        "400": {
          description:
            "Bad request (validation errors or duplicate group name)",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  success: {
                    type: "boolean",
                    example: false,
                  },
                  message: {
                    type: "string",
                    example: "Group with this name already exists",
                  },
                  error: {
                    type: "string",
                    example: "duplicate",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
