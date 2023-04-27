import express from "express";
import cors from "cors";
import config from "./config";
import { indexRouter } from "./routes/v1";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/api/v1", indexRouter);

app.all("/", (req, res) => {
  res.send({
    message: "Server up and running",
  });
});

app.all("*", (req, res) => {
  res.send({ message: "Not Found" });
});

export { app };
