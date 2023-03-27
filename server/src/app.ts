import express from "express";
import mongoose from "mongoose";
import config from "./utils/config";
import routes from "./controller";
import morgan from "morgan";
import logger from "./utils/logger";

const app = express();

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((err) => {
    logger.error("Could not connect to MongoDB", err);
  });

app.use(express.json());
app.use(morgan("tiny"));

app.use("/restaurants", routes.restaurants);
app.use("/users", routes.users);

app.use("/ping", (req, res) => {
  res.send("pong");
});
//console.log({ dir: path.join(__dirname, "../public") });
app.use("/", express.static("public"));

export default app;
