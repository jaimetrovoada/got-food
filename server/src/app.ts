import express from "express";
import mongoose from "mongoose";
import config from "./utils/config";
import routes from "./controller";

const app = express();

mongoose.connect(config.MONGODB_URI);

app.use(express.json());

app.use("/restaurants", routes.restaurants);
app.use("/users", routes.users);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
