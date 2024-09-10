import { Options } from "swagger-jsdoc";

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
        url: "http://localhost:8000",
      },
    ],
  },
  apis: ["./src/routers/*.ts"],
};

export default swaggerOptions;
