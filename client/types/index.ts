import { z } from "zod";
import {
  loginRequestValidator,
  menuRequestValidator,
  orderRequestValidator,
  registerRequestValidator,
  restaurantRequestValidator,
} from "@/lib/shemas";

export type RegisterRequest = z.infer<typeof registerRequestValidator>;

export type LoginRequest = z.infer<typeof loginRequestValidator>;

export type LoginResponse = {
  id: string;
  name: string;
  email: string;
  role: z.infer<typeof registerRequestValidator.shape.role>;
  token: string;
  restaurants: {
    name: string;
    id: string;
  }[];
};

export type IUser = LoginResponse & {
  restaurants: IRestaurant[];
  orders: IOrder[];
};

export type RestaurantRequest = z.infer<typeof restaurantRequestValidator>;

export type IRestaurant = RestaurantRequest & {
  id: string;
  menu: IMenuItem[];
  orders: IOrder[];
  logo: string;
};

export type MenuRequest = z.infer<typeof menuRequestValidator>;

export type IMenuItem = MenuRequest & {
  id: string;
  image: string;
};

export type OrderRequest = z.infer<typeof orderRequestValidator>;

export type IOrder = OrderRequest & {
  id: string;
  user: string;
  restaurant: {
    name: string;
  };
  date: Date;
  orderedItems: {
    item: string;
    amount: number;
  }[];
  orderId: string;
};
