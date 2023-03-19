import express from "express";
import mongoose from "mongoose";
import config from "./utils/config";
import routes from "./controller";
import path from "path";

const app = express();

mongoose.connect(config.MONGODB_URI);

app.use(express.json());

app.use("/restaurants", routes.restaurants);
app.use("/users", routes.users);
//console.log({ dir: path.join(__dirname, "../public") });
app.use("/", express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
