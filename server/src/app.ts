import express from "express";
import mongoose from "mongoose";
import config from "./utils/config";
import routes from "./controller";
import morgan from "morgan";
import logger from "./utils/logger";
import admin from "firebase-admin";
import { applicationDefault } from "firebase-admin/app";
import middleware from "./utils/middleware";
import cors from "cors";

const app = express();

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((err) => {
    logger.error("Could not connect to MongoDB", err);
  });

admin.initializeApp({
  credential: applicationDefault(),
  storageBucket: config.FIREBASE_BUCKET,
});

export const bucket = admin.storage().bucket();

app.use(cors())
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/restaurants", routes.restaurants);
app.use("/api/users", routes.users);

app.use("/api/ping", (req, res) => {
  res.send({ message: "pong" });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
