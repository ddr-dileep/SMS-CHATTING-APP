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
};
