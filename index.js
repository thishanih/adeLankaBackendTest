import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import statusCodes from "http-status-codes";
import Database from "./src/shared/database.js";
import HttpError from "./src/shared/htttp.error.js";
import apiRouter from "./src/routers/api.router.js";

const env = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "development";
dotenv.config({
  path: `env/${env}.env`,
});
console.log("Running environment : " + env);

const app = express();
const { BAD_REQUEST } = statusCodes;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", apiRouter);

app.use(function (err, req, res, next) {
  let status = BAD_REQUEST;
  if (err instanceof HttpError) {
    status = err.httpStatusCode;
  }
  return res.status(status).json({
    message: err.message,
  });
});

Database();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Sever Connected port " + port);
});
