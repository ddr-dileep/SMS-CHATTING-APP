import { Options } from "swagger-jsdoc";
import { userSwagger } from "../swagger/user.swagger";
import { groupChatSwagger } from "../swagger/Group-chat.swagger";
import { messageSwagger } from "../swagger/message-chat.swagger";

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
        url: "http://localhost:8080",
      },
      {
        url: "https://sms-chatting-app.onrender.com",
      },
    ],
    paths: {
      ...userSwagger,
      ...groupChatSwagger,
      ...messageSwagger,
    },
    tags: [
      {
        name: "User",
        description:
          "APIs related to user operations (e.g., registration, login, get-user)",
      },
      {
        name: "Group-chat",
        description: "APIs related to Group-Chat",
      },
      {
        name: "Message-Service",
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
