import mongoose from "mongoose";
import config from "./config";
import { app } from "./app";

const start = async () => {
  console.log("Starting up ......");
  const server = require("http").createServer(app);

  try {
    const mongodb = config.app.mongoUri;
    await mongoose.connect(config.app.mongoUri);
    console.log("Connected to MongoDb");
  } catch (error) {
    console.log("Error :", error);
  }

  server.listen(config.app.port, () => {
    console.log("Server Live at :", `http://localhost:${config.app.port}`);
  });
};

start();
