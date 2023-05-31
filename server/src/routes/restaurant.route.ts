import express from "express";
import multer from "multer";
import middleware from "../utils/middleware";
import { restaurantController } from "../controller";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", restaurantController.getRestaurants);
router.get("/trending", restaurantController.getTrendingRestaurants);

router.get("/:id", restaurantController.getRestaurant);

router.get("/:id/menu", restaurantController.getRestaurantMenu);

router.get("/:id/orders", restaurantController.getRestaurantOrders);
router.get("/:id/data-stream", restaurantController.getRestaurantOrdersStream);

router.post(
  "/",
  middleware.userExtractor,
  upload.single("logo"),
  restaurantController.createRestaurant
);

router.post(
  "/:id/menu",
  middleware.userExtractor,
  upload.single("image"),
  restaurantController.createMenuItem
);

router.post(
  "/:id/order",
  middleware.userExtractor,
  restaurantController.createOrder
);

router.put(
  "/:id",
  upload.single("logo"),
  middleware.userExtractor,
  restaurantController.updateRestaurant
);

router.put(
  "/:id/menu/:menuId",
  middleware.userExtractor,
  upload.single("image"),
  restaurantController.updateMenuItem
);

router.put(
  "/:id/order/:orderId",
  middleware.userExtractor,
  restaurantController.updateOrderStatus
);

router.delete(
  "/:id",
  middleware.userExtractor,
  restaurantController.deleteRestaurant
);

router.delete(
  "/:id/menu/:menuId",
  middleware.userExtractor,
  restaurantController.deleteMenuItem
);

router.delete(
  "/:id/order/:orderId",
  middleware.userExtractor,
  restaurantController.deleteOrder
);

export default router;
