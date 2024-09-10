import { Options } from "swagger-jsdoc";
import { userSwagger } from "../swagger/user.swagger";

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
    },
    tags: [
      {
        name: "Auth",
        description:
          "APIs related to user operations (e.g., registration, login, get-user)",
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
