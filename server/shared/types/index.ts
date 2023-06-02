import { z } from "zod";
import {
  loginRequestValidator,
  menuRequestValidator,
  orderRequestValidator,
  registerRequestValidator,
  restaurantRequestValidator,
} from "../schemas";

export type RegisterRequest = z.infer<typeof registerRequestValidator>;

export type LoginRequest = z.infer<typeof loginRequestValidator>;

export type LoginResponse = {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
};

export type RestaurantRequest = z.infer<typeof restaurantRequestValidator>;

export type RestaurantResponse = RestaurantRequest & {
  id: string;
};

export type MenuRequest = z.infer<typeof menuRequestValidator>;

export type MenuResponse = MenuRequest & {
  id: string;
};

export type OrderRequest = z.infer<typeof orderRequestValidator>;

export type OrderResponse = OrderRequest & {
  id: string;
  user: string;
  restaurant: string;
  date: Date;
};
