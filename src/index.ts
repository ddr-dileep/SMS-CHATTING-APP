import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rootRouter from "./routers/router";
import databaseConfig from "./configs/db.config";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerConfig from "./configs/swaggerConfig";
import { Server } from "socket.io";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

const port = process.env.PORT! || 3000;

// Initialize swagger-jsdoc and swagger-ui
const swaggerDocs = swaggerJsDoc(swaggerConfig);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const socketServer = app.listen(port, () => {
  databaseConfig();
  console.log(`Server is running on http://localhost:${port}`);
});

const io = new Server(socketServer, {
  pingTimeout: 3000,
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  },
});

io.on("connection", (socket) => {
  console.log("connection established.................");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected to server for chatting");
  });
});
