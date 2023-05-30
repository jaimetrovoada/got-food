import express from "express";
import config from "./utils/config";
import routes from "./routes";
import morgan from "morgan";
import logger from "./utils/logger";
import admin from "firebase-admin";
import middleware from "./utils/middleware";
import cors, { CorsOptions } from "cors";
import { AppDataSource } from "./data-source";

const app = express();

AppDataSource.initialize()
  .then(() => {
    logger.info("Data Source has been initialized!");
  })
  .catch((error) => logger.error({ error }));

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

app.use("/api/restaurants", routes.restaurantRouter);
app.use("/api/users", routes.userRouter);

app.use("/api/ping", (req, res) => {
  res.send({ message: "pong" });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
