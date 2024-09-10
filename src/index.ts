import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rootRouter from "./routers/router";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

const port = process.env.PORT! || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
