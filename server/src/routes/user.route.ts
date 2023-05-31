import express from "express";
import middleware from "../utils/middleware";
import { userController } from "../controller";

const router = express.Router();

router.get("/:id", userController.getUser);

router.get("/:id/restaurants", userController.getUserRestaurants);

router.get("/:id/orders", userController.getUserOrders);

router.post("/register", userController.createUser);

router.post("/login", userController.loginUser);

router.put("/:id", middleware.userExtractor, userController.updateUser);

router.delete("/:id", middleware.userExtractor, userController.deleteUser);

export default router;
