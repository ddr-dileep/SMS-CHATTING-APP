import { Options } from "swagger-jsdoc";
import { userSwagger } from "../swagger/user.swagger";
import { groupChatSwagger } from "../swagger/Group-chat.swagger";
import { messageSwagger } from "../swagger/message-chat.swagger";
import { categorySwagger } from "../swagger/category.swagger";

const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "SMS API Documentation",
      version: "1.0.0",
      description:
        "API documentation for SMS stands for Short Message Service, and it's a messaging service that allows users to send short messages to other devices",
    },
    servers: [
      {
        url: "http://localhost:8080/api/v1",
        description: "Development server",
      },
      {
        url: "https://sms-chatting-app.onrender.com/api/v1",
        description: "Production server",
      },
    ],
    paths: {
      ...userSwagger,
      ...groupChatSwagger,
      ...messageSwagger,
      ...categorySwagger,
    },
    tags: [
      {
        name: "User",
        description:
          "APIs related to user operations (e.g., registration, login, get-user)",
      },
      {
        name: "Chat",
        description: "APIs related to Chat",
      },
      {
        name: "Message",
        description: "APIs related to Message",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: [],
};

export default swaggerOptions;
