import express from "express";
import upload from "express-fileupload";
import sequelize from "./db/config.mjs";
import dotenv from "dotenv";
dotenv.config();

const app = express();
import { handleUploadedFile, displayData } from "./controller/handleUpload.js";

// Express middleware settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(upload());

// Connect to db and start server
try {
  await sequelize.authenticate();
  app.listen(4000, () => {
    console.log("Connection has been established successfully.");
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.post("/send", handleUploadedFile);
app.get("/view", displayData);
