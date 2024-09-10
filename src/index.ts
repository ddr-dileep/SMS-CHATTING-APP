import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rootRouter from "./routers/router";
import databaseConfig from "./configs/db.config";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerConfig from "./configs/swaggerConfig";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

const port = process.env.PORT! || 3000;

// Initialize swagger-jsdoc and swagger-ui
const swaggerDocs = swaggerJsDoc(swaggerConfig);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
  databaseConfig();
  console.log(`Server is running on http://localhost:${port}`);
});
