import express from "express";
import mongoose from "mongoose";
import config from "./utils/config";
import routes from "./controller";
import morgan from "morgan";
import logger from "./utils/logger";
import admin from "firebase-admin";
import middleware from "./utils/middleware";
import cors, { CorsOptions } from "cors";

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
  credential: admin.credential.applicationDefault(),
  storageBucket: config.FIREBASE_BUCKET,
});

export const bucket = admin.storage().bucket();

const corsConfig: CorsOptions = {
  origin: ["http://localhost:3000", "https://got-food-five.vercel.app/"],
};

app.use(cors(corsConfig));
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
